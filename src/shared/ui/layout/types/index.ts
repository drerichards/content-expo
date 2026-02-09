import type { Spacing } from "@/shared/styles/tokens";

export type LayoutComponentProps = {
  children: React.ReactNode;
  gap?: Spacing;
  className?: string;
};

export type LayoutRowProps = LayoutComponentProps & {
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
};

export type LayoutColumnProps = LayoutComponentProps & {
  align?: "start" | "center" | "end" | "stretch";
};
