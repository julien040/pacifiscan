import customButton from "./button";
const pacifiScanTheme = {
  fontConfig: {
    Urbanist: {
      600: {
        normal: "Urbanist_semi",
      },
      700: {
        normal: "Urbanist_bold",
      },
    Inter: {
        400: {
          normal: "Inter_400Regular",
        },
        500: {
          normal: "Inter_500Medium",
        },
        600: {
          normal: "Inter_600SemiBold",
        },
        700: {
          normal: "Inter_600SemiBold",
        }
      },
    },
  },

  fonts: {
    heading: "Urbanist",
    body: "Inter",
  },
  colors: {
    test: {
      50: "#e8e4ff",
      100: "#b8b3ff",
      200: "#9180fd",
      300: "#714efc",
      400: "#5c1dfb",
      500: "#5D5FEF",
      600: "#4d03b0",
      700: "#3e017e",
      800: "#29004d",
      900: "#11001d",
    },
    brand: {
      primary: "#B9B4FF",
      tertiary: "#EAE9FF",
      iris100: "#5D5FEF",
      iris80: "#7879F1",
      iris50: "#A5A6F6",
      danger: "#FF8881",
      warn: "#F6F794",
      confirm: "#8ACF91",
      logo: "#3935FF",
      pbackground: "#e9e7fe",
      p45: "#dddafe",
      pdark: "#cfcafd",
      paccentuation: "#dbebfe",
      appColor:"#EFF0FF"
    },
  },
  components: {
    Button: customButton,
  },
};

export default pacifiScanTheme;
