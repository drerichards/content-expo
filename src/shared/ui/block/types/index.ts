import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Color } from "@/shared/styles/options/colors";
import type { Density } from "@/shared/styles/options/density";
import type { Typography } from "@/shared/styles/options/typography";

export type BlockBaseProps = {
  color?: Color;
  density?: Density;
  typography?: Typography;
  className?: string;
  children?: ReactNode;
};

// BlockCard specific props
export type BlockCardProps = BlockBaseProps & {
  title?: string;
  isInteractive?: boolean;
};

// BlockList specific props
export type BlockListProps = {
  className?: string;
  children?: ReactNode;
};

// BlockListItem specific props
export type BlockListItemProps = BlockBaseProps & {
  isSelected?: boolean;
  isInteractive?: boolean;
  onClick?: () => void;
};

// BlockSection specific props
export type BlockSectionProps = BlockBaseProps & {
  children?: ReactNode;
};

// BlockText specific props
export type BlockTextProps = BlockBaseProps & {
  title?: string;
  body?: string;
  meta?: string;
  variant?: "title" | "body" | "meta";
};

// BlockHeader specific props
export type BlockHeaderProps = BlockBaseProps;

// BlockButton specific props
export type BlockButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "color"
> &
  BlockBaseProps & {
    isFullWidth?: boolean;
    variant?: "primary" | "ghost";
  };

// BlockForm specific props
export type BlockFormProps = Omit<ComponentPropsWithoutRef<"form">, "color"> &
  BlockBaseProps;

// BlockField specific props
export type BlockFieldProps = BlockBaseProps & {
  label: string;
  helper?: string;
  direction?: "column" | "row";
};

// BlockInput specific props
export type BlockInputProps = Omit<ComponentPropsWithoutRef<"input">, "color"> &
  BlockBaseProps;

// BlockSelect specific props
export type BlockSelectProps = Omit<
  ComponentPropsWithoutRef<"select">,
  "color"
> &
  BlockBaseProps;
