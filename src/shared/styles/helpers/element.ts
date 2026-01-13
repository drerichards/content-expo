import type { Color } from "../options/colors";
import type { Density } from "../options/density";
import type { Typography } from "../options/typography";
import { DEFAULT_DENSITY, DEFAULT_TYPOGRAPHY } from "./defaults";

export type ElementStyleProps = {
  color?: Color;
  density?: Density;
  typography?: Typography;
};

export const buildElementClasses = ({
  color,
  density = DEFAULT_DENSITY,
  typography = DEFAULT_TYPOGRAPHY,
}: ElementStyleProps): string =>
  ["el", color && `el--${color}`, `col-${density}`, `text-${typography}`]
    .filter(Boolean)
    .join(" ");
