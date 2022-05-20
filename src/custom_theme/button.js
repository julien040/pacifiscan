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
      fontWeight: "700",
      fontSize: 15,
      fontFamily: "Inter_400Regular",
    },
    /*     padding:1, */
    paddingBottom: 3,
    paddingTop: 3,
  },
};
export default customButton;
