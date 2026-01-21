import { Base } from "@/shared/ui/base";
import { BlockTextProps } from "@/shared/ui/block/types";
import { buildElementClasses } from "@/shared/styles/helpers/element";

export const BlockText = ({
  title,
  body,
  meta,
  color,
  density,
  typography,
  className,
}: BlockTextProps) => {
  const shouldApplyBase = Boolean(color || density || typography);
  const base = shouldApplyBase
    ? buildElementClasses({ color, density, typography })
    : undefined;
  const classes = [base, className].filter(Boolean).join(" ") || undefined;

  return (
    <Base className={classes}>
      {title && <Base className="text-title">{title}</Base>}
      {body && <Base className="text-body">{body}</Base>}
      {meta && <Base className="text-meta">{meta}</Base>}
    </Base>
  );
};
