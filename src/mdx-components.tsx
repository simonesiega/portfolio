import type {MDXComponents} from "mdx/types";
import type {ComponentProps} from "react";
import {geistSans} from "@/lib/fonts";

function mergeClassNames(baseClassName: string, className?: string) {
  return className ? `${baseClassName} ${className}` : baseClassName;
}

function ExternalLink({children, href, className, ...props}: ComponentProps<"a">) {
  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

  return (
    <a
      {...props}
      href={href}
      className={mergeClassNames(
        "font-medium text-[var(--ui-fg)] underline decoration-[var(--header-item-color)]/40 underline-offset-4 transition-colors duration-300 hover:text-[var(--header-item-hover-color)] hover:decoration-[var(--header-item-hover-color)]",
        className
      )}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({children, className, ...props}: ComponentProps<"h2">) => (
      <h2
        {...props}
        className={mergeClassNames(
          `${geistSans.className} text-[1.3rem] font-semibold tracking-[-0.02em] text-[var(--ui-fg)] sm:text-[1.5rem]`,
          className
        )}
      >
        {children}
      </h2>
    ),
    h3: ({children, className, ...props}: ComponentProps<"h3">) => (
      <h3
        {...props}
        className={mergeClassNames(
          `${geistSans.className} mt-7 text-[1.04rem] font-semibold tracking-[-0.01em] text-[var(--ui-fg)] sm:text-[1.14rem]`,
          className
        )}
      >
        {children}
      </h3>
    ),
    h4: ({children, className, ...props}: ComponentProps<"h4">) => (
      <h4
        {...props}
        className={mergeClassNames(
          `${geistSans.className} mt-5 text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--header-item-color)] uppercase`,
          className
        )}
      >
        {children}
      </h4>
    ),
    p: ({children, className, ...props}: ComponentProps<"p">) => (
      <p
        {...props}
        className={mergeClassNames(
          `${geistSans.className} mt-3 max-w-3xl text-[0.98rem] leading-[1.42] font-normal text-[var(--mdx-body-color)] sm:text-[1.02rem] sm:leading-[1.48]`,
          className
        )}
      >
        {children}
      </p>
    ),
    ul: ({children, className, ...props}: ComponentProps<"ul">) => (
      <ul
        {...props}
        className={mergeClassNames(
          `${geistSans.className} mt-4 list-disc space-y-2.5 pl-5 text-[0.98rem] font-normal text-[var(--mdx-body-color)] marker:text-[var(--header-item-color)] sm:text-[1.02rem]`,
          className
        )}
      >
        {children}
      </ul>
    ),
    ol: ({children, className, ...props}: ComponentProps<"ol">) => (
      <ol
        {...props}
        className={mergeClassNames(
          `${geistSans.className} mt-4 list-decimal space-y-2.5 pl-5 text-[0.98rem] font-normal text-[var(--mdx-body-color)] marker:font-medium marker:text-[var(--header-item-color)] sm:text-[1.02rem]`,
          className
        )}
      >
        {children}
      </ol>
    ),
    li: ({children, className, ...props}: ComponentProps<"li">) => (
      <li {...props} className={mergeClassNames("leading-relaxed", className)}>
        {children}
      </li>
    ),
    blockquote: ({children, className, ...props}: ComponentProps<"blockquote">) => (
      <blockquote
        {...props}
        className={mergeClassNames(
          "mt-3 [&>p]:mt-0 [&>p]:text-[0.94rem] [&>p]:text-[var(--mdx-body-color)] sm:[&>p]:text-[0.98rem]",
          className
        )}
      >
        {children}
      </blockquote>
    ),
    strong: ({children, className, ...props}: ComponentProps<"strong">) => (
      <strong
        {...props}
        className={mergeClassNames("font-bold text-[var(--mdx-strong-color)]", className)}
      >
        {children}
      </strong>
    ),
    em: ({children, className, ...props}: ComponentProps<"em">) => (
      <em {...props} className={mergeClassNames("text-[var(--mdx-body-color)] italic", className)}>
        {children}
      </em>
    ),
    code: ({children, className, ...props}: ComponentProps<"code">) => (
      <code
        {...props}
        className={mergeClassNames(
          "font-[inherit] leading-[inherit] tracking-[inherit] text-[color-mix(in_srgb,var(--ui-fg)_78%,var(--ui-fg-muted))]",
          className
        )}
      >
        {children}
      </code>
    ),
    a: ExternalLink,
    hr: ({className, ...props}: ComponentProps<"hr">) => (
      <hr
        {...props}
        className={mergeClassNames("mt-10 border-[var(--header-item-color)]/20", className)}
      />
    ),
    ...components,
  };
}
