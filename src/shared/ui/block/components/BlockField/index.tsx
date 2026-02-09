import { Base } from "@/shared/ui/base";
import { buildElementClasses } from "@/shared/styles/helpers/element";
import type { BlockFieldProps } from "@/shared/ui/block/types";

export const BlockField = ({
  label,
  helper,
  direction = "column",
  color,
  density,
  typography,
  className,
  children,
}: BlockFieldProps) => {
  const base = buildElementClasses({ color, density, typography });
  const classes = [base, "block-field", className].filter(Boolean).join(" ");

  return (
    <Base as="label" className={classes} data-layout={direction}>
      <span className="block-field__label">{label}</span>
      <div className="block-field__control">{children}</div>
      {helper ? <span className="block-field__helper">{helper}</span> : null}
    </Base>
  );
};
