import {NextResponse, type NextRequest} from "next/server";
import {themeInitScriptHash} from "./src/lib/theme-init";

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
  .split(" ")
  .map((value) => value.trim())
  .filter(Boolean);

let umamiOrigin = "";

if (umamiScriptSrc) {
  try {
    umamiOrigin = new URL(umamiScriptSrc).origin;
  } catch {
    umamiOrigin = "";
  }
}

function createCspHeader() {
  const scriptSrc = [
    "'self'",
    `'sha256-${themeInitScriptHash}'`,
    ...(umamiOrigin ? [umamiOrigin] : []),
  ];
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
  const accepts = request.headers.get("accept") ?? "";

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

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  if (isProduction) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
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
