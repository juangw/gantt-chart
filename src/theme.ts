import { createTheme, Theme } from "@mui/material/styles";
import { ThemedStyledProps } from "styled-components";

export type MyThemedProps<P> = ThemedStyledProps<P, Theme>;

export const defaultTheme: Theme = createTheme({
  palette: {
    primary: { main: "#c52020" },
    secondary: { main: "#E78400" },
  },
});
