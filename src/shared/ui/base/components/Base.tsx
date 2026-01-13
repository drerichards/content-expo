import type { ComponentPropsWithoutRef, ElementType } from "react";

type BaseProps<T extends ElementType = "div"> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export const Base = <T extends ElementType = "div">({
  as,
  ...props
}: BaseProps<T>) => {
  const Component = as || "div";

  return <Component {...props} />;
};
