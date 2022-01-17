import { HTMLAttributes, useMemo } from "react";
import styled, { css } from "styled-components";

import { FaBuilding, FaMapMarker } from "react-icons/fa";
import { colors } from "src/utils/theme/constants";
import { theme } from "src/utils/theme";

interface BuildingMapMarkerProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  sizeRem?: number;
  color?: typeof colors;
}

type StyledBuildingMapMarkerProps = Pick<BuildingMapMarkerProps, "sizeRem">;

/**
 * Building map marker component
 */
export const BuildingMapMarker: React.FC<BuildingMapMarkerProps> = ({
  sizeRem = 6.8, color = theme.colors.blue[ 60 ], ...rest
}) => {
  const size = useMemo(() => `${sizeRem}rem`, [ sizeRem ]);

  return (
    <StyledBuildingMapMarker
      sizeRem={sizeRem}
      {...rest}
    >
      <FaMapMarker
        className="pin"
        size={size}
        color={color.toString()}
      />

      <div className="icon">
        <FaBuilding color={color.toString()} />
      </div>
    </StyledBuildingMapMarker>
  );
};

const StyledBuildingMapMarker = styled.i<StyledBuildingMapMarkerProps>`
  ${({ sizeRem }) => css`
    position: relative;
    transform: translate(-50%, -100%);
    width: ${numberToRem(sizeRem)};
    height: ${numberToRem(sizeRem)};

    .pin {
      position: absolute;
      top: 0;
      left: 0;
    }

    .icon {
      position: absolute;
      z-index: 2;
      top: 8%;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 60%;
      background: white;
      border-radius: 100rem;

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 68%;
        height: 68%;
      }
    }
  `};
`;

const numberToRem = (unit: number): string => {
  return `${unit}rem`;
};
