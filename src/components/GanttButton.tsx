import React from "react";
import Button from "react-bootstrap/Button";
import { MyThemedProps } from "../theme";
import styled from "styled-components";

const GButton = styled(Button)`
  && {
    background: ${(props: MyThemedProps<{}>) =>
      props.theme.palette.primary.main};
    border-color: #bbb;
    color: white;
  }
  &:hover {
    background: ${(props: MyThemedProps<{}>) =>
      props.theme.palette.primary.dark};
  }
`;

type Props = {
  onClick(): void;
  text: string;
  style?: React.CSSProperties;
};

export const GanttButton: React.FC<Props> = ({ onClick, text, style }) => (
  <GButton style={style} onClick={onClick}>
    {text}
  </GButton>
);
