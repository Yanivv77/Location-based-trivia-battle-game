import React, { useState } from "react";

import { Button, Tooltip } from "@mui/material";
import copy from "clipboard-copy";

const Copy = ({ joinGameId }) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const copyGameId = () => {
    setShowToolTip(true);
    copy(joinGameId);
  };

  return (
    <Tooltip
      open={showToolTip}
      title={"GameId has been copied!!!"}
      leaveDelay={2000}
      onClose={() => setShowToolTip(false)}
    >
      <Button variant="contained" color="primary" onClick={copyGameId}>
        Copy Game Id
      </Button>
    </Tooltip>
  );
};

export default Copy;
