import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Controller} from 'react-hook-form';

export default function AutoCompleteWithMulti({control, name, label, items, placeholder, readOnly}) {
  return (
      <Controller
          render={
        (props) => (
            <Autocomplete
                readOnly={readOnly}
                value={props.field.value}
                isOptionEqualToValue={(option, value) => option.FirstName + option.lastName === value.FirstName + value.lastName}
                fullWidth
                multiple
                filterSelectedOptions
                renderInput={
                  params => (
                      <TextField
                          fullWidth
                          {...params} label={label}
                          placeholder={placeholder}/>
                  )
                } options={items}
                getOptionLabel={option => option ? option.firstName + " " + option.lastName : ""}
                onChange={(_, data) => props.field.onChange(data)}
            />
        )
      } name={name} control={control}
      />
  );
}

