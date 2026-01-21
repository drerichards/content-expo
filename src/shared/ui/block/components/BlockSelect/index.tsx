import { Base } from "@/shared/ui/base";
import { buildElementClasses } from "@/shared/styles/helpers/element";
import type { BlockSelectProps } from "@/shared/ui/block/types";

export const BlockSelect = ({
  color,
  density,
  typography,
  className,
  children,
  ...selectProps
}: BlockSelectProps) => {
  const base = buildElementClasses({ color, density, typography });
  const classes = [base, "block-select", className].filter(Boolean).join(" ");

  return (
    <Base as="select" className={classes} {...selectProps}>
      {children}
    </Base>
  );
};
