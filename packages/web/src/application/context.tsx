import React from "react";

export const AppContext = React.createContext({
  user: {},
  toggleTheme: (theme: string) => {},
  theme: "",
  handleLogout: () => {}
});
