import { Base } from "@/shared/ui/base";

type LayoutMainProps = {
  className?: string;
  children: React.ReactNode;
};

export const LayoutMain = ({ className, children }: LayoutMainProps) => {
  return (
    <Base as="main" className={className}>
      {children}
    </Base>
  );
};
