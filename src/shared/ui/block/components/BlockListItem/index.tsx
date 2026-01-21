import { Base } from "@/shared/ui/base";
import { BlockListItemProps } from "@/shared/ui/block/types";
import { buildElementClasses } from "@/shared/styles/helpers/element";

export const BlockListItem = ({
  color,
  density,
  typography,
  isInteractive = false,
  isSelected = false,
  onClick,
  className,
  children,
}: BlockListItemProps) => {
  const base = buildElementClasses({ color, density, typography });
  const classes = [
    base,
    "row",
    isSelected ? "is-selected" : "",
    isInteractive ? "action focus-ring" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Base
      as="li"
      className={classes}
      onClick={onClick}
      style={isInteractive ? { cursor: "pointer" } : undefined}
      aria-disabled={!isInteractive}
    >
      {children}
    </Base>
  );
};
