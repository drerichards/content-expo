import { Base } from "@/shared/ui/base";
import { BlockProps } from "../types";
import { buildElementClasses } from "@/shared/styles/helpers/element";

export const Header = ({
  color,
  density,
  typography,
  children,
}: BlockProps) => {
  const base = buildElementClasses({ color, density, typography });
  const classes = `${base} focus-ring`;

  return (
    <Base as="header" role="banner" className={classes} tabIndex={0}>
      {children}
    </Base>
  );
};
