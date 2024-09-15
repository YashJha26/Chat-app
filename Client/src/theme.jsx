import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette:{
        mode:'dark',
        text:{
            primary:"#000",
            secondary:"#fff",
        },
        primary:{
            main:"#007aff",
        }
    }
})

export const lightTheme = createTheme({
    palette:{
        mode:'light',
        text:{
            primary:"#fff",
            secondary:"#000"
        },
        primary:{
            main:"#007aff",
        }
    }
})