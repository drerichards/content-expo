import type { ReactNode } from "react";
import type { Color } from "@/shared/styles/options/colors";
import type { Density } from "@/shared/styles/options/density";
import type { Typography } from "@/shared/styles/options/typography";

export type BlockProps = {
  color?: Color;
  density?: Density;
  typography?: Typography;
  children?: ReactNode;
};
