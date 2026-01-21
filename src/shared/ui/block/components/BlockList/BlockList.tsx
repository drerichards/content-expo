import { Base } from "@/shared/ui/base";
import { BlockListProps } from "@/shared/ui/block/types";

export const BlockList = ({ className, children }: BlockListProps) => {
  const classes = ["row-wrap", className].filter(Boolean).join(" ");

  return (
    <Base as="ul" className={classes}>
      {children}
    </Base>
  );
};
