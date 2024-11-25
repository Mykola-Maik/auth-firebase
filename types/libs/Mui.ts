import type { Theme } from "@mui/material/styles";
import type { SxProps } from "@mui/system";

export type WithSx<P = {}> = P & {
  sx?: SxProps<Theme>;
};
