import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CustomSelect({ value, setValue, labels, name }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-helper-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label={name}
          onChange={handleChange}
        >
          {labels.map((label) => (
            <MenuItem key={label.value} value={label.value}>
              {label.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
