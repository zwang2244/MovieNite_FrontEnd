import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/material/styles";
import { buttonUnstyledClasses } from "@mui/base";
const blue = {
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const CustomButtonRoot = styled(ButtonUnstyled)`
  display: inline-flex;
  justify-content: center;
  line-height: 1.7;
  align-items: center;
  //padding: 8px 22px;
  font-weight: 700;
  font-size: 0.92rem;
  background-color: #2065d1;
  border-radius: 8px;
  color: white;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;
  min-width: 64px;
  height: 48px;
  box-shadow: 0 8px 16px 0 rgb(32 101 209 / 24%);

  &:hover {
    background-color: #103996;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #103996;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function CustomButton(props) {
  return <CustomButtonRoot {...props} component="span" />;
}
