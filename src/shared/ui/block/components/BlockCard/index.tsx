import { Base } from "@/shared/ui/base";
import { buildElementClasses } from "@/shared/styles/helpers/element";
import { BlockCardProps } from "@/shared/ui/block/types";

export const BlockCard = ({
  color,
  density,
  title,
  typography,
  isInteractive = false,
  className,
  children,
}: BlockCardProps) => {
  const base = buildElementClasses({ color, density, typography });
  const classes = [base, "block-card", className].filter(Boolean).join(" ");

  return (
    <Base
      className={classes}
      data-interactive={isInteractive}
      aria-disabled={!isInteractive}
    >
      {title && (
        <Base as="h3" className="text-title">
          {title}
        </Base>
      )}
      <Base className="text-body">{children}</Base>
    </Base>
  );
};
