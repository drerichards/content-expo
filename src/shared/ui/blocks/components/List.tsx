import { Base } from "@/shared/ui/base";

export const List = ({ children }: { children: React.ReactNode }) => {
  return (
    <Base as="ul" className="row-wrap">
      {children}
    </Base>
  );
};
