export const tokens = {
  grey: {
    100: "#e6e6e6",
    200: "#cccccc",
    300: "#b3b3b3",
    400: "#999999",
    500: "#808080",
    600: "#666666",
    700: "#4d4d4d",
    800: "#1a1a1a",
    900: "#1a1a1a",
  },
  black: {
    100: "#e6e6e6",
    200: "#cccccc",
    300: "#b3b3b3",
    400: "#999999",
    500: "#808080",
    600: "#666666",
    700: "#4d4d4d",
    800: "#333333",
    900: "#1a1a1a",
  },
  gold: {
    100: "#fff9e6",
    200: "#fff2cc",
    300: "#ffecb3",
    400: "#ffe599",
    500: "#ffdf80",
    600: "#ffd966",
    700: "#ffd700",
    800: "#ffcc33",
    900: "#ffc61a",
  },
  primary: {
    // light green
    100: "#5D2E8C",
    200: "#5D2E8C",
    300: "#5D2E8C",
    400: "#5D2E8C",
    500: "#5D2E8C",
    600: "#5D2E8C",
    700: "#5D2E8C",
    800: "#5D2E8C",
    900: "#5D2E8C",
  },
  secondary: {
    // yellow
    100: "#ffdf80",
    200: "#ffdf80",
    300: "#ffdf80",
    400: "#ffdf80",
    500: "#ffdf80",
    600: "#ffdf80",
    700: "#ffdf80",
    800: "#ffdf80",
    900: "#ffdf80",
  },
  tertiary: {
    // purple
    500: "#FF6666",
  },
  background: {
    light: "#E8D7FF",
    main: "#E8D7FF",
  },
};

// mui theme settings
export const themeSettings = {
  palette: {
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    black: {
      ...tokens.black,
      main: tokens.black[500],
    },
    gold: {
      ...tokens.gold,
      main: tokens.gold[700],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: tokens.black[800],
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      color: tokens.black[800],
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 400,
      color: tokens.black[800],
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 10,
      color: tokens.black[800],
    },
  },
};
