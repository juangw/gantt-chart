import { Tooltip } from "react-tippy";
import React from "react";
import { Divider } from "@mui/material";
import styled from "@emotion/styled";

type Props = {
  message: string;
};

const TooltipMessageBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

export const StatusBarTooltip: React.FC<Props> = ({ message, children }) => (
  <Tooltip
    animation="none"
    animateFill={false}
    html={
      <TooltipMessageBox>
        <strong>{message}</strong>
      </TooltipMessageBox>
    }
    theme="dark"
  >
    {children}
  </Tooltip>
);
