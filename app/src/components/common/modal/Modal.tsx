import { HTMLAttributes } from "react";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";

import { Card } from "../card";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  onClose?: () => void;
}

/**
 * Modal component
 */
export const Modal: React.FC<ModalProps> = ({
  title, onClose, children, ...rest
}) => (
  <StyledModal {...rest}>
    <Card className="card">
      {title && (
        <Typography
          className="modal-title"
          variant="h4"
          component="h1"
          align="center"
        >
          {title}
        </Typography>
      )}

      {children}

      {onClose && (
        <div className="modal-btn-wrapper">
          <Button
            variant="contained"
            onClick={onClose}
          >
            OK
          </Button>
        </div>
      )}
    </Card>
  </StyledModal>
);

const StyledModal = styled.aside`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 60rem;

  .card {
    .modal-title {
      padding-bottom: 1.8rem;
    }

    .modal-btn-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 1.8rem;
    }
  }
`;