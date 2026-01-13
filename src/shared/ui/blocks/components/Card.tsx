import { Base } from "@/shared/ui/base";
import { BlockProps } from "../types";
import { buildElementClasses } from "@/shared/styles/helpers/element";

type CardProps = BlockProps & {
  title?: string;
  isInteractive?: boolean;
};

export const Card = ({
  color,
  density,
  title,
  typography,
  isInteractive = false,
  children,
}: CardProps) => {
  const base = buildElementClasses({ color, density, typography });
  const classes = `${base}${isInteractive ? " action focus-ring" : ""}`;

  return (
    <Base className={classes} aria-disabled={!isInteractive}>
      {title && (
        <Base as="h3" className="text-title">
          {title}
        </Base>
      )}
      <Base className="text-body">{children}</Base>
    </Base>
  );
};
