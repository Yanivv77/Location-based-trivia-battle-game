import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleUsersSelect(props) {
    const {usersList}= props;

    const [selectedUser, setSelectedUser] = React.useState([]);
    const theme = useTheme();
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedUser(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };

  return (
    <div>
             <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Select user</InputLabel>
            <Select
              multiple
              value={selectedUser}
              onChange={handleChange}
              input={<OutlinedInput label="Select user" />}
              MenuProps={MenuProps}
            >
              {usersList.map((user) => (
                <MenuItem
                  key={user.userName}
                  value={user.userName}
                  style={getStyles(user.userName, selectedUser, theme)}
                >
                  {user.userName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
    </div>
  );
}
