const mainTheme = {
  paddingSmall: "10px",
  paddingMedium: "20px",
  paddingLarge: "40px",
  borderRadius: "4px",
  colorPink: "hotpink",
  colorOrange: "coral",
  colorGreen: "mediumseagreen",
  colorBlue: "deepskyblue"
};

export const darkTheme = {
  ...mainTheme,
  colorBackground: "#172b3a",
  colorBoard: "#0f202d",
  colorPrimary: mainTheme.colorPink,
  colorSecondary: mainTheme.colorGreen,
  colorAccent: mainTheme.colorOrange,
  colorText: mainTheme.colorBlue
};

export const lightTheme = {
  ...mainTheme,
  colorBackground: "#fff",
  colorBoard: "#eee",
  colorPrimary: mainTheme.colorPink,
  colorSecondary: mainTheme.colorGreen,
  colorAccent: mainTheme.colorOrange,
  colorText: mainTheme.colorBlue
};
