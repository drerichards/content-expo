import { Base } from "@/shared/ui/base";
import { BlockTextProps } from "@/shared/ui/block/types";
import { buildElementClasses } from "@/shared/styles/helpers/element";

export const BlockText = ({
  title,
  body,
  meta,
  variant,
  color,
  density,
  typography,
  className,
}: BlockTextProps) => {
  const shouldApplyBase = Boolean(color || density || typography);
  const base = shouldApplyBase
    ? buildElementClasses({ color, density, typography })
    : undefined;
  const classes =
    ["block-text", base, className].filter(Boolean).join(" ") || undefined;

  return (
    <Base className={classes} data-variant={variant}>
      {title && <Base data-variant="title">{title}</Base>}
      {body && <Base data-variant="body">{body}</Base>}
      {meta && <Base data-variant="meta">{meta}</Base>}
    </Base>
  );
};
