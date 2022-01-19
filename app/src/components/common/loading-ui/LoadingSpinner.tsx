import { ClipLoader } from "react-spinners";
import { LoaderSizeProps } from "react-spinners/interfaces";
import { theme } from "src/utils/theme";

export type LoadingSpinnerProps = LoaderSizeProps;

/**
 * Loading spinner component
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 48,
  color = theme.colors.blue[ 20 ],
  speedMultiplier = 1.5,
  ...rest
}) => (
  <ClipLoader
    size={size}
    color={color}
    speedMultiplier={speedMultiplier}
    {...rest}
  />
);