import React, { FC, ReactElement } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import createPalette from "@material-ui/core/styles/createPalette";

import createSpacing from "@material-ui/core/styles/createSpacing";
import createTypography from "@material-ui/core/styles/createTypography";

// Declare default font weights variable
const fontWeights = {
  regular: 400,
  medium: 500,
  semiBold: 600
};

// Declare default font sizes variable
const fontSizes = {
  0: "12px",
  1: "14px",
  2: "16px",
  3: "20px",
  4: "22px",
  5: "32px",
  6: "36px"
};

// Create palette including our extra colors
const palette = createPalette({
  // newSpecialColor can hold only numbers
  newSpecialColor: {
    0: "#E5EAF6",
    100: "#BFCCE8",
    200: "#9AAEDB",
    300: "#7490CD",
    400: "#4F72BF",
    500: "#3A5BA2",
    600: "#2D467C",
    700: "#1F3156",
    800: "#182743",
    900: "#121B31"
    // Uncomment next line to see error
    // main: "#121B31"
  },
  // Rest of the default props
  primary: {
    light: "#7490CD",
    dark: "#1F3156",
    main: "#3A5BA2",
    0: "#E5EAF6",
    100: "#BFCCE8",
    200: "#9AAEDB",
    300: "#7490CD",
    400: "#4F72BF",
    500: "#3A5BA2",
    600: "#2D467C",
    700: "#1F3156",
    800: "#182743",
    900: "#121B31"
  },
  grey: {
    light: "#BAC2CC",
    dark: "#455569",
    main: "#7F8C9B",
    0: "#FFFFFF",
    100: "#F4F8FD",
    200: "#D7DDE4",
    300: "#BAC2CC",
    400: "#9CA7B3",
    500: "#7F8C9B",
    600: "#627082",
    700: "#455569",
    800: "#273A51",
    900: "#0A1F38"
  },
  success: {
    light: "#BBF1E5",
    dark: "#36AF94",
    main: "#44D7B6",
    0: "#E2F9F4",
    100: "#D9F7F1",
    200: "#CFF5ED",
    300: "#BBF1E5",
    400: "#93E8D5",
    500: "#44D7B6",
    600: "#3DC3A5",
    700: "#36AF94",
    800: "#288772",
    900: "#0C372D"
  },
  info: {
    light: "#B4D1FF",
    dark: "#1F51A1",
    main: "#3E88FF",
    0: "#DBE9FF",
    100: "#D2E3FF",
    200: "#C8DDFF",
    300: "#B4D1FF",
    400: "#8DB9FF",
    500: "#3E88FF",
    600: "#2F6DD0",
    700: "#1F51A1",
    800: "#103572",
    900: "#08275A"
  },
  warning: {
    light: "#FFEABA",
    dark: "#D0A240",
    main: "#FFC955",
    0: "#FFF4DB",
    100: "#FFF2D3",
    200: "#FFEFCB",
    300: "#FFEABA",
    400: "#FFDF98",
    500: "#FFC955",
    600: "#E8B64B",
    700: "#D0A240",
    800: "#A17B2B",
    900: "#A17B2B"
  },
  error: {
    light: "#FFCCD2",
    dark: "#CF4356",
    main: "#FD596F",
    0: "#FFDCE0",
    100: "#FFD4D9",
    200: "#FFCCD2",
    300: "#FFCCD2",
    400: "#FE9BA8",
    500: "#FD596F",
    600: "#E64E63",
    700: "#CF4356",
    800: "#A02D3C",
    900: "#420109"
  },
  background: {
    sidebar: "linear-gradient(0deg, #2F4981 0%, #1F3156 100%)"
  }
});

const spacing = createSpacing(8);

const typography = createTypography(palette, {
  // This is the unique font added in types.ts typography module augmentation
  uniqueFont: {
    fontSize: fontSizes[6],
    fontWeight: fontWeights.semiBold,
    lineHeight: "44px",
    fontFamily: "'Inter', sans-serif"
  },
  // Rest of the default props
  fontFamily: "'Inter', sans-serif",
  h1: {
    fontSize: fontSizes[5],
    fontWeight: fontWeights.semiBold,
    lineHeight: "39px",
    color: palette.primary.main
  },
  h2: {
    fontSize: fontSizes[4],
    fontWeight: fontWeights.semiBold,
    lineHeight: "26px"
  },
  h3: {
    fontSize: fontSizes[3],
    fontWeight: fontWeights.medium,
    lineHeight: "24px"
  },
  h4: {
    fontSize: fontSizes[2],
    fontWeight: fontWeights.semiBold,
    lineHeight: "20px"
  },
  h5: {
    fontSize: fontSizes[1],
    fontWeight: fontWeights.medium,
    lineHeight: "17px"
  },
  subtitle1: {
    fontSize: fontSizes[1],
    fontWeight: fontWeights.regular,
    lineHeight: "21px"
  },
  body1: {
    fontSize: fontSizes[2],
    fontWeight: fontWeights.regular,
    lineHeight: "24px"
  },
  body2: {
    fontSize: fontSizes[1],
    fontWeight: fontWeights.regular,
    lineHeight: "21px"
  }
});

const theme = createMuiTheme({
  typography,
  palette,
  spacing,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1440
    }
  },
  // We can override material-ui's default props (Actual props that we pass to the components) here
  props: {
    MuiButton: {
      color: "primary",
      variant: "contained",
      disableRipple: true
    },
    MuiTooltip: {
      arrow: true,
      placement: "top"
    }
  },
  // We can override material-ui's default styles (CSS default) here
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: palette.error.main,
        padding: spacing(1)
      }
    }
  }
});

interface Props {
  children: ReactElement;
}

const ThemeProvider = (props: Props) => {
  const { children } = props;
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
