import { useTheme } from '@emotion/react'
import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'

const NoChatOpen = ({drawerWidth}) => {
    const theme=useTheme()
  return (
    <Grid container sx={{ml:{sm:`${drawerWidth}px`}}} height='100vh' justifyContent='center' alignItems='center'>
        <Paper  variant='elevation' sx={{p:5}}>
        <Typography color={theme.palette.text.secondary} variant="h4">
          Click on chat to start.
        </Typography>
        </Paper>
    </Grid>
  )
}

export default NoChatOpen
