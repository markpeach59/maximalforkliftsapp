import { createTheme } from "@mui/material/styles";

const myTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#C22424",
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

export default myTheme;
