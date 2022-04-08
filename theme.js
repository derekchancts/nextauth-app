import { createTheme } from "@mui/material/styles"
import { red, blue } from "@mui/material/colors"


// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#ffcd38",
      // main: "#2196f3"
      // main: blue[500]
    },
    secondary: {
      // main: "#ff3d00",
      // main: "#3d5afe",
      main: "#bb86fc"
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
})

export default theme
