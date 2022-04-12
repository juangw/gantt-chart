import React from "react";
import styled from "styled-components";
import { Box, makeStyles, Typography } from "@material-ui/core";
import MuiButton, { ButtonProps } from "@material-ui/core/Button";
import { MyThemedProps } from "../theme";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

const Button = <C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }>
) => {
  return <MuiButton {...props}>{props.children}</MuiButton>;
};

const NavBox = styled(Box)`
  && {
    display: flex;
    align-items: center;
    background: ${(props: MyThemedProps<any>) =>
      props.theme.palette.secondary.main};
  }
`;

const useStyles = makeStyles({
  button: {
    "&.active": {
      textDecoration: "underline",
    },
  },
});

export const NavBar: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <NavBox p={2}>
      <Typography variant="h3">Criteo</Typography>
      <Box marginLeft={2}>
        <Router>
          <Button
            className={classes.button}
            color={"default"}
            component={NavLink}
            to="/initiatives"
          >
            Initiatives View
          </Button>
          <Button
            className={classes.button}
            color={"default"}
            component={NavLink}
            to="/team"
          >
            Team View
          </Button>
        </Router>
      </Box>
    </NavBox>
  );
};
