import { Base } from "@/shared/ui/base";
import { BlockTextProps } from "@/shared/ui/block/types";

export const BlockText = ({ title, body, meta }: BlockTextProps) => {
  return (
    <Base>
      {title && <Base className="text-title">{title}</Base>}
      {body && <Base className="text-body">{body}</Base>}
      {meta && <Base className="text-meta">{meta}</Base>}
    </Base>
  );
};
