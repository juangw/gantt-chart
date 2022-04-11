import React from "react";
import { GanttChart } from "./components/GanttChart";
import { StylesProvider, ThemeProvider } from "@material-ui/core";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { defaultTheme } from "./theme";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <StylesProvider injectFirst>
        <ThemeProvider theme={defaultTheme}>
          <SCThemeProvider theme={defaultTheme}>
            <GanttChart />
          </SCThemeProvider>
        </ThemeProvider>
      </StylesProvider>
    </>
  );
}

export default App;
