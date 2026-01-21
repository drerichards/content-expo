import { Base } from "@/shared/ui/base";
import { buildElementClasses } from "@/shared/styles/helpers/element";
import type { BlockFormProps } from "@/shared/ui/block/types";

export const BlockForm = ({
  color,
  density,
  typography,
  className,
  children,
  ...formProps
}: BlockFormProps) => {
  const base = buildElementClasses({ color, density, typography });
  const classes = [base, "block-form", className].filter(Boolean).join(" ");

  return (
    <Base as="form" className={classes} {...formProps}>
      {children}
    </Base>
  );
};
