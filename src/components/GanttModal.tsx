import React from "react";
import { Close } from "../icons";
import styled from "@emotion/styled";

type Props = {
  handleClose(): void;
  show: boolean;
  title: string;
};

const ModalBox = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalSection = styled.div`
  position: fixed;
  background: #fff;
  padding: 10px 10px 10px 10px;
  border: 2px solid #bbb;
  border-radius: 25px;
  width: auto;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalHeader = styled.div`
  display: flex;
  margin-top: 0px;
  margin-bottom: 10px;
  width: 100%;
`;

export const GanttModal: React.FC<Props> = ({
  handleClose,
  show,
  title,
  children,
}) =>
  show ? (
    <ModalBox>
      <ModalSection>
        <ModalHeader>
          <h4 style={{ float: "left", marginRight: "50px" }}>{title}</h4>
          <a
            style={{ marginLeft: "50px", cursor: "pointer", float: "right" }}
            onClick={handleClose}
          >
            <Close />
          </a>
        </ModalHeader>
        {children}
      </ModalSection>
    </ModalBox>
  ) : (
    <></>
  );
