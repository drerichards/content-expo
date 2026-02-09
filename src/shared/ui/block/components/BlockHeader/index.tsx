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
  const classes = [base, "block-header", className].filter(Boolean).join(" ");

  return (
    <Base as="header" className={classes}>
      {children}
    </Base>
  );
};
