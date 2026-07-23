import {NextResponse, type NextRequest} from "next/server";

const umamiEnabled = process.env.NEXT_PUBLIC_UMAMI_ENABLED === "true";
const umamiScriptSrc = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_SRC;
const isProduction = process.env.NODE_ENV === "production";
const rawCspMode = process.env.CSP_MODE ?? (isProduction ? "enforce" : "off");
const cspMode =
  rawCspMode === "enforce" || rawCspMode === "report-only" || rawCspMode === "off"
    ? rawCspMode
    : isProduction
      ? "enforce"
      : "off";
const cspReportUri = process.env.CSP_REPORT_URI;
const cspConnectSrcExtra = (process.env.CSP_CONNECT_SRC_EXTRA ?? "")
  .split(/\s+/)
  .map((value) => value.trim())
  .filter(Boolean);

function getHttpOrigin(value: string | undefined) {
  if (!value) {
    return "";
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.origin : "";
  } catch {
    return "";
  }
}

const umamiOrigin = umamiEnabled ? getHttpOrigin(umamiScriptSrc) : "";

function createCspHeader() {
  const scriptSrc = ["'self'", "'unsafe-inline'", ...(umamiOrigin ? [umamiOrigin] : [])];
  const connectSrc = ["'self'", ...(umamiOrigin ? [umamiOrigin] : []), ...cspConnectSrcExtra];

  if (!isProduction) {
    scriptSrc.push("'unsafe-eval'");
  }

  const directives = [
    "default-src 'self'",
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    "object-src 'none'",
    `script-src ${scriptSrc.join(" ")}`,
    "script-src-attr 'none'",
    `connect-src ${connectSrc.join(" ")}`,
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    "frame-src 'none'",
    "worker-src 'self' blob:",
  ];

  if (cspReportUri) {
    directives.push(`report-uri ${cspReportUri}`);
    directives.push("report-to csp-endpoint");
  }

  if (isProduction) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

export function proxy(request: NextRequest) {
  const accepts = request.headers.get("accept")?.toLowerCase() ?? "";

  if (!accepts.includes("text/html")) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  if (cspMode === "enforce") {
    response.headers.set("Content-Security-Policy", createCspHeader());
  } else if (cspMode === "report-only") {
    response.headers.set("Content-Security-Policy-Report-Only", createCspHeader());
  }

  if (cspReportUri) {
    response.headers.set("Reporting-Endpoints", `csp-endpoint="${cspReportUri}"`);
  }

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
      missing: [
        {type: "header", key: "next-router-prefetch"},
        {type: "header", key: "purpose", value: "prefetch"},
      ],
    },
  ],
};
