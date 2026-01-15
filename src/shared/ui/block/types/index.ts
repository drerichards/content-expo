import type { ReactNode } from "react";
import type { Color } from "@/shared/styles/options/colors";
import type { Density } from "@/shared/styles/options/density";
import type { Typography } from "@/shared/styles/options/typography";

export type BlockBaseProps = {
  color?: Color;
  density?: Density;
  typography?: Typography;
  children?: ReactNode;
};

// BlockCard specific props
export type BlockCardProps = BlockBaseProps & {
  title?: string;
  isInteractive?: boolean;
};

// BlockList specific props
export type BlockListProps = {
  children?: ReactNode;
};

// BlockListItem specific props
export type BlockListItemProps = BlockBaseProps & {
  isSelected?: boolean;
  isInteractive?: boolean;
};

// BlockSection specific props
export type BlockSectionProps = {
  children?: ReactNode;
};

// BlockText specific props
export type BlockTextProps = BlockBaseProps & {
  title?: string;
  body?: string;
  meta?: string;
};

// BlockHeader specific props
export type BlockHeaderProps = BlockBaseProps;
