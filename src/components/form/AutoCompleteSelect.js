import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Controller} from 'react-hook-form';

export default function AutoCompleteSelect({control, name, label, items, placeholder}) {
  return (
      <Controller
          xs={{width: '300px'}}
          render={
            (props) => (
                <Autocomplete
                    renderInput={
                      params => (
                          <TextField sx={{width: '300px'}}
                                     {...params} label={label}
                                     placeholder={placeholder}/>
                      )
                    } options={items}
                    getOptionLabel={option => option.label}
                    onChange={(_, data) => props.field.onChange(data)}
                />
            )
          } name={name} control={control}
      />
  );
}
