import React from "react";
import { StylesProvider, ThemeProvider } from "@material-ui/core";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { defaultTheme } from "./theme";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/NavBar";
import { InitiativeGanttChart } from "./components/InitiativeGanttChart";

function App() {
  return (
    <>
      <StylesProvider injectFirst>
        <ThemeProvider theme={defaultTheme}>
          <SCThemeProvider theme={defaultTheme}>
            <NavBar />
            <InitiativeGanttChart />
          </SCThemeProvider>
        </ThemeProvider>
      </StylesProvider>
    </>
  );
}

export default App;
