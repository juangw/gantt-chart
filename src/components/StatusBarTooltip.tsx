import React from "react";
import { Tooltip } from "react-tippy";
import styled from "@emotion/styled";

type Props = {
  content: React.ReactNode;
};

const TooltipMessageBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

export const StatusBarTooltip: React.FC<Props> = ({ content, children }) => (
  <Tooltip
    position="top-end"
    animation="none"
    animateFill={false}
    html={<TooltipMessageBox>{content}</TooltipMessageBox>}
    theme="dark"
  >
    {children}
  </Tooltip>
);
