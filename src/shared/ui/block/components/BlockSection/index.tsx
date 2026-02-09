import { Base } from "@/shared/ui/base";
import { BlockSectionProps } from "@/shared/ui/block/types";
import { buildElementClasses } from "@/shared/styles/helpers/element";

export const BlockSection = ({
  color,
  density,
  typography,
  className,
  children,
}: BlockSectionProps) => {
  const shouldApplyBase = Boolean(color || density || typography);
  const base = shouldApplyBase
    ? buildElementClasses({ color, density, typography })
    : undefined;
  const classes =
    [base, "block-section", className].filter(Boolean).join(" ") || undefined;

  return (
    <Base as="section" className={classes}>
      {children}
    </Base>
  );
};
