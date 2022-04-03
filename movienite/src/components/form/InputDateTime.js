import {
  DateTimePicker,
  LocalizationProvider,
} from '@mui/lab';
import {Controller, useFormContext} from 'react-hook-form';
import {TextField} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export const InputDateTime = ({control, label, name}) => {
  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller render={
          ({field, fieldState, formState}) => (
              <DateTimePicker
                  label={label}
                  value={field.value}
                  onChange={field.onChange}
                  renderInput={(params) => <TextField fullWidth {...params} />}
              />
          )
        } name={name} control={control}>
        </Controller>
      </LocalizationProvider>
  );
};
