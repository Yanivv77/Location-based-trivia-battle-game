import React from 'react'
import { Grid, Button, Typography } from '@mui/material'
import NearByModal from '../Game/NearByModal'

const TriviaLocation = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          mt: 3,
          mb: 3,
          fontWeight: 'bold',
          color: '##eeeeee',
        }}
      >
        To start the game please choose trivia location
      </Typography>
      <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
        <Grid item xs={12}>
          <Button variant="contained" size="large" color="secondary" sx={{ borderRadius: 10, mt: 5 }} onClick={handleOpen}>
            Near by location
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" size="large" sx={{ borderRadius: 10, mt: 5 }}>
            Location on map
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" size="large" sx={{ borderRadius: 10, mt: 3 }}>
            Location from list
          </Button>
        </Grid>
      </Grid>
      <NearByModal open={open} handleClose={handleClose} />
    </>
  )
}

export default TriviaLocation
