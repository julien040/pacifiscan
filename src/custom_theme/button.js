import { paddingBottom } from "styled-system";

const customButton = {
  // Can simply pass default props to change default behaviour of components.
  baseStyle: {
    rounded: "md",
  },
  defaultProps: {
    backgroundColor: "brand.primary",
    borderRadius: "10px",
    _text: {
      color: "black",
      fontSize: 15,
      fontFamily: "Inter_600SemiBold",
      letterSpacing: -0.65,
    },
    /*     padding:1, */
    paddingBottom: 3,
    paddingTop: 3,
  },
};
export default customButton;
