import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Divider, Typography, Button, Box } from '@mui/material'
import { Language, IosShare, Phone, Logout } from '@mui/icons-material'

import { useSelector, useDispatch } from 'react-redux'

const LeftSideMenu = (props) => {
  return (
    <>
      <Drawer anchor="left" open={props.isOpen} onClose={() => props.open(false)}>
        <Box
          sx={{
            maxWidth: '350px',

            background: '#006064',
            height: '100%',
          }}
        >
          <Typography variant="h5" sx={{ textAlign: 'center', mt: 3 }}>
            Settings
          </Typography>

          <List>
            <ListItem
              button
              sx={{
                width: '90%',
                ml: 1,
                background: '#0097a7',
                mt: 3,
                color: 'white',
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <Language />
              </ListItemIcon>
              <ListItemText primary="Language" />
            </ListItem>
            <ListItem
              button
              sx={{
                width: '90%',
                ml: 1,
                background: '#0097a7',
                mt: 3,
                color: 'white',
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <IosShare />
              </ListItemIcon>
              <ListItemText primary="Apply for expert" />
            </ListItem>
            <ListItem
              button
              sx={{
                width: '90%',
                ml: 1,
                background: '#0097a7',
                mt: 3,
                color: 'white',
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <Phone />
              </ListItemIcon>
              <ListItemText primary="Contact us" />
            </ListItem>
            <Divider />
            <ListItem
              button
              sx={{
                width: '90%',
                ml: 1,
                background: '#0097a7',
                mt: 10,
                color: 'white',
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default LeftSideMenu
