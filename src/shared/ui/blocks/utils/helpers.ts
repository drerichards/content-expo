import { ElementColor, ElementDensity, ElementSize } from "../../options";

type BlockStyleOptions = {
  color?: ElementColor;
  density?: ElementDensity;
  size?: ElementSize;
};

// TODO: map contrast → text color rules
export const buildElementStyles = ({
  color,
  density,
  size,
}: BlockStyleOptions) => {
  return [
    "el",
    color && `el--${color}`,
    density && `col-${density}`,
    size && `el-pad-${size}`,
  ]
    .filter(Boolean)
    .join(" ");
};
