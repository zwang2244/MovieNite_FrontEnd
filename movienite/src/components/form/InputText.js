import React from 'react';
import {Controller} from 'react-hook-form';
import {TextField} from '@mui/material';

function FormInputText({ name, label, control }) {
  //send the name and label, name for Controller, label for Text Label
  return (
      <Controller
          sx = {{
            height: 56
          }}
          control={control} name={name} render={
        ({
           field: {onChange, value},
           fieldState: {error},
           formState
         }) => (
            <TextField
                helperText={error ? error.message : null}
                size={"medium"}
                error={!!error}
                onChange={onChange}
                value={value}
                fullWidth
                label={label}
                variant={'outlined'}
            />
        )
      } >

      </Controller>
  );
}

export default FormInputText;
