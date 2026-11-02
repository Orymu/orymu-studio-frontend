"use client";

import React from "react";
import Link from "next/link";

export type ButtonVariant = "dark" | "light";
export type ButtonSize = "md" | "lg";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export default function Button({
  variant = "dark",
  size = "md",
  href,
  label,
  children,
  className = "",
  onClick,
  type = "button",
  ...rest
}: ButtonProps) {
  const contentText = children ?? label;
  const sizeClass = size === "lg" ? "btn--lg" : "";
  const variantClass = variant === "light" ? "btn--light" : "btn--dark";

  const combinedClasses = ["btn", variantClass, sizeClass, className]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span className="btn__label">{contentText}</span>
      <span className="btn__badge" aria-hidden="true">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 2.5L8 6l-3.5 3.5" />
        </svg>
      </span>
    </>
  );

  const anchorProps = rest as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>;

  if (href) {
    if (href.startsWith("mailto:") || href.startsWith("http")) {
      return (
        <a
          href={href}
          className={combinedClasses}
          onClick={onClick}
          {...anchorProps}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={combinedClasses}
        onClick={onClick}
        {...anchorProps}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      {...rest}
    >
      {inner}
    </button>
  );
}
