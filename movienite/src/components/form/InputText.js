import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {TextField} from '@mui/material';

function FormInputText({ name, label }) {
  //send the name and label, name for Controller, label for Text Label
  const {control} = useFormContext();
  return (
      <Controller control={control} name={name} render={
        ({
           field: {onChange, value},
           fieldState: {error},
           formState
         }) => (
            <TextField
                helperText={error ? error.message : null}
                size={"small"}
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
