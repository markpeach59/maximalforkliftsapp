import { createTheme } from "@mui/material/styles";

const restrictedTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#a39e9d",
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

export default restrictedTheme;
