import { Base } from "@/shared/ui/base";
import { buildElementClasses } from "@/shared/styles/helpers/element";
import type { BlockInputProps } from "@/shared/ui/block/types";

export const BlockInput = ({
  color,
  density,
  typography,
  className,
  ...inputProps
}: BlockInputProps) => {
  const base = buildElementClasses({ color, density, typography });
  const classes = [base, "block-input", className].filter(Boolean).join(" ");

  return <Base as="input" className={classes} {...inputProps} />;
};
