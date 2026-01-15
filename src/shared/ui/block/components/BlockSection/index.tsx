import { Base } from "@/shared/ui/base";
import { BlockSectionProps } from "@/shared/ui/block/types";

export const BlockSection = ({ children }: BlockSectionProps) => {
  return <Base as="section">{children}</Base>;
};
