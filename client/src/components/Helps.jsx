import React from 'react'

import { Tooltip } from '@mui/material'
import { Button } from '@mui/material'

function Helps() {
  return (
    <>
      <Tooltip title={'longText'}>
        <Button sx={{ m: 1 }}>Default Width [300px]</Button>
      </Tooltip>
    </>
  )
}

export default Helps
