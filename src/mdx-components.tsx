import type {MDXComponents} from "mdx/types";
import type {ComponentProps} from "react";
import {geistSans} from "@/lib/fonts";

function ExternalLink({children, href, ...props}: ComponentProps<"a">) {
  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

  return (
    <a
      {...props}
      href={href}
      className="font-medium text-[var(--ui-fg)] underline decoration-[var(--header-item-color)]/40 underline-offset-4 transition-colors duration-300 hover:text-[var(--header-item-hover-color)] hover:decoration-[var(--header-item-hover-color)]"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({children, ...props}: ComponentProps<"h2">) => (
      <h2
        className={`${geistSans.className} text-[1.3rem] font-semibold tracking-[-0.02em] text-[var(--ui-fg)] sm:text-[1.5rem]`}
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({children, ...props}: ComponentProps<"h3">) => (
      <h3
        className={`${geistSans.className} mt-7 text-[1.04rem] font-semibold tracking-[-0.01em] text-[var(--ui-fg)] sm:text-[1.14rem]`}
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({children, ...props}: ComponentProps<"h4">) => (
      <h4
        className={`${geistSans.className} mt-5 text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--header-item-color)] uppercase`}
        {...props}
      >
        {children}
      </h4>
    ),
    p: ({children, ...props}: ComponentProps<"p">) => (
      <p
        className={`${geistSans.className} mt-3 max-w-3xl text-[0.98rem] leading-[1.42] font-normal text-[var(--mdx-body-color)] sm:text-[1.02rem] sm:leading-[1.48]`}
        {...props}
      >
        {children}
      </p>
    ),
    ul: ({children, ...props}: ComponentProps<"ul">) => (
      <ul
        className={`${geistSans.className} mt-4 list-disc space-y-2.5 pl-5 text-[0.98rem] font-normal text-[var(--mdx-body-color)] marker:text-[var(--header-item-color)] sm:text-[1.02rem]`}
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({children, ...props}: ComponentProps<"ol">) => (
      <ol
        className={`${geistSans.className} mt-4 list-decimal space-y-2.5 pl-5 text-[0.98rem] font-normal text-[var(--mdx-body-color)] marker:font-medium marker:text-[var(--header-item-color)] sm:text-[1.02rem]`}
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({children, ...props}: ComponentProps<"li">) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    blockquote: ({children, ...props}: ComponentProps<"blockquote">) => (
      <blockquote
        className="mt-3 [&>p]:mt-0 [&>p]:text-[0.94rem] [&>p]:text-[var(--mdx-body-color)] sm:[&>p]:text-[0.98rem]"
        {...props}
      >
        {children}
      </blockquote>
    ),
    strong: ({children, ...props}: ComponentProps<"strong">) => (
      <strong className="font-bold text-[var(--mdx-strong-color)]" {...props}>
        {children}
      </strong>
    ),
    em: ({children, ...props}: ComponentProps<"em">) => (
      <em className="text-[var(--mdx-body-color)] italic" {...props}>
        {children}
      </em>
    ),
    code: ({children, ...props}: ComponentProps<"code">) => (
      <code
        className="font-[inherit] text-[length:inherit] leading-[inherit] tracking-[inherit] text-[color-mix(in_srgb,var(--ui-fg)_78%,var(--ui-fg-muted))]"
        {...props}
      >
        {children}
      </code>
    ),
    a: ExternalLink,
    hr: (props: ComponentProps<"hr">) => (
      <hr className="mt-10 border-[var(--header-item-color)]/20" {...props} />
    ),
    ...components,
  };
}
