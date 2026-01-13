import { Base } from "@/shared/ui/base";
import { BlockProps } from "../types";
import { buildElementClasses } from "@/shared/styles/helpers/element";

type ListItemProps = BlockProps & {
  isSelected?: boolean;
  isInteractive?: boolean;
};

export const ListItem = ({
  color,
  density,
  typography,
  isInteractive = false,
  isSelected = false,
  children,
}: ListItemProps) => {
  const base = buildElementClasses({ color, density, typography });
  const classes = `${base} row${isSelected ? " is-selected" : ""}${isInteractive ? " action focus-ring" : ""}`;

  return (
    <Base as="li" className={classes} aria-disabled={!isInteractive}>
      {children}
    </Base>
  );
};
