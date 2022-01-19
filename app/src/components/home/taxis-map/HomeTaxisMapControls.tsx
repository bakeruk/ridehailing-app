import { HTMLAttributes } from "react";
import {
  Typography, Slider, Select, MenuItem, SelectChangeEvent, Link
} from "@mui/material";
import styled from "styled-components";

import {
  SPLYT_OFFICES, SplytOfficeAttributes, MAX_ETA
} from "src/constants";
import { Card } from "src/components/common/card";
import { ConfinesWrapper } from "src/components/common/layout";

interface HomeTaxisMapControlsProps extends Pick<HTMLAttributes<HTMLDivElement>, "className"> {
  onOfficeSelect: (event: SelectChangeEvent<string>) => void;
  onOfficeReset: () => void;
  onEtaSelection: (event: Event, value: number | number[]) => void;
  nearestOffice?: SplytOfficeAttributes;
  selectedOffice?: SplytOfficeAttributes;
  selectedEta?: number;
  isLoading?: boolean;
}

/**
 * Home taxis map controls
 */
export const HomeTaxisMapControls: React.FC<HomeTaxisMapControlsProps> = ({
  isLoading,
  nearestOffice,
  selectedOffice,
  selectedEta,
  onOfficeSelect,
  onOfficeReset,
  onEtaSelection,
  ...rest
}) => (
  <StyledHomeTaxisMapControls {...rest}>
    <Card>
      <Typography
        variant="h4"
        component="h2"
      >
        Controls
      </Typography>

      <div className="control-wrapper eta">
        <Typography
          className="control-label"
          variant="body1"
          component="h3"
        >
          Taxi ETA
        </Typography>

        <Slider
          marks
          size="small"
          disabled={isLoading}
          defaultValue={MAX_ETA}
          value={selectedEta}
          step={1}
          min={1}
          max={MAX_ETA}
          valueLabelDisplay="auto"
          onChange={onEtaSelection}
        />
      </div>

      <div className="control-wrapper office">
        <Typography
          className="control-label"
          variant="body1"
          component="h3"
        >
          Closest Splyt office
        </Typography>

        <Select
          fullWidth
          className="office-select"
          value={selectedOffice?.name}
          disabled={isLoading}
          onChange={onOfficeSelect}
        >
          {SPLYT_OFFICES.map(office => (
            <MenuItem
              key={office.name}
              className={`select-option-${office.name}`}
              value={office.name}
            >
              {office.label}
            </MenuItem>
          ))}
        </Select>

        {nearestOffice?.name !== selectedOffice?.name && (
          <Link
            variant="body2"
            className="nearest-office-recenter"
            onClick={onOfficeReset}
          >
            {`Recenter to ${nearestOffice.label} office`}
          </Link>
        )}
      </div>
    </Card>
  </StyledHomeTaxisMapControls>
);

const StyledHomeTaxisMapControls = styled(ConfinesWrapper)`
  .control-wrapper {
    padding-top: 1.2rem;

    .control-label {
      padding-bottom: 0.4rem;
    }

    &.office a {
      display: block;
      padding-top: 0.4rem;
      text-align: right;
      cursor: pointer;
    }
  }
`;