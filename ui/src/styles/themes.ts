import { createTheme } from "@mui/material";
import { blueGrey, orange } from "@mui/material/colors";

export const dark =  createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
    },
  });
  
  export const light = createTheme({
    palette: {
      primary: {
        main: blueGrey[200],
      },
    },
  });