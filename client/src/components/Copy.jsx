import React, { useState } from 'react'

import { Button, Tooltip } from '@mui/material'
import copy from 'clipboard-copy'
import QRCode from 'react-qr-code'

const Copy = ({ joinGameId }) => {
  const [showToolTip, setShowToolTip] = useState(false)
  const copyGameId = () => {
    setShowToolTip(true)
    copy(joinGameId)
  }

  const [back, setBack] = useState('#FFFFFF')
  const [fore, setFore] = useState('#000000')
  const [size, setSize] = useState(256)

  return (
    <Tooltip open={showToolTip} title={'GameId has been copied!!!'} leaveDelay={2000} onClose={() => setShowToolTip(false)}>
      <Button variant="contained" color="primary" onClick={copyGameId}>
        Copy Game Id
      </Button>
      ReactDOM.render(
      <QRCode title="GeeksForGeeks" value={joinGameId} bgColor={back} fgColor={fore} size={size === '' ? 0 : size} />
    </Tooltip>
  )
}

export default Copy
