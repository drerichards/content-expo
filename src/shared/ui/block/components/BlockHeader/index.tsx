import { Base } from "@/shared/ui/base";
import { BlockHeaderProps } from "@/shared/ui/block/types";
import { buildElementClasses } from "@/shared/styles/helpers/element";

export const BlockHeader = ({
  color,
  density,
  typography,
  className,
  children,
}: BlockHeaderProps) => {
  const base = buildElementClasses({ color, density, typography });
  const classes = [base, "focus-ring", className].filter(Boolean).join(" ");

  return (
    <Base as="header" className={classes} tabIndex={0}>
      {children}
    </Base>
  );
};
