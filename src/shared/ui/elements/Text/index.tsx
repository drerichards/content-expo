// src/shared/ui/elements/Text/index.tsx
import type { ComponentPropsWithoutRef } from "react";
import { Base } from "@/shared/ui/base/components/Base";
import "./Text.module.css";

type TextTone = "default" | "muted" | "accent";

type ParagraphAs = "p" | "span";
type HeadingAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type ParagraphTextProps = {
  as?: ParagraphAs;
  tone?: TextTone;
} & Omit<ComponentPropsWithoutRef<"p">, "as">;

type HeadingTextProps = {
  as: HeadingAs;
  tone?: Exclude<TextTone, "muted">;
} & Omit<ComponentPropsWithoutRef<"h1">, "as">;

export type TextProps = ParagraphTextProps | HeadingTextProps;

/**
 * A flexible text component that renders semantic HTML text elements with customizable styling.
 *
 * @param props - The component props
 * @param props.as - The HTML element to render (default: "p")
 * @param props.tone - The visual tone/style variant to apply (default: "default")
 * @param props.rest - Additional props passed to the underlying Base component
 *
 * @returns A styled text element with the specified semantic tag and tone
 *
 * @example
 * ```tsx
 * <Text as="h1" tone="primary">Heading</Text>
 * <Text tone="muted">Paragraph text</Text>
 * ```
 */
export const Text = ({ as = "p", tone = "default", ...rest }: TextProps) => {
  return <Base as={as} data-tone={tone} {...rest} />;
};
