import { Base } from "@/shared/ui/base";
import { buildElementClasses } from "@/shared/styles/helpers/element";
import type { BlockButtonProps } from "@/shared/ui/block/types";

export const BlockButton = ({
  color,
  density,
  typography,
  variant = "primary",
  isFullWidth = false,
  className,
  children,
  type = "button",
  ...buttonProps
}: BlockButtonProps) => {
  const base = buildElementClasses({ color, density, typography });
  const classes = [
    base,
    "action",
    "focus-ring",
    "block-button",
    `block-button--${variant}`,
    isFullWidth ? "block-button--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Base as="button" type={type} className={classes} {...buttonProps}>
      {children}
    </Base>
  );
};
