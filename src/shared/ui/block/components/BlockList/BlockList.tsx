import { Base } from "@/shared/ui/base";
import { BlockListProps } from "@/shared/ui/block/types";

export const BlockList = ({ children }: BlockListProps) => {
  return (
    <Base as="ul" className="row-wrap">
      {children}
    </Base>
  );
};
