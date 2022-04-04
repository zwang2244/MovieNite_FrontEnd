import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Controller} from 'react-hook-form';
import {css} from '@emotion/react';
import styled from '@emotion/styled';

export default function MovieSearchAutoComplete({control, name, label, items, placeholder}) {
  return (
      // defaultValue should be {label: 'name'}
      <Controller
          render={
            (props) => (
                <Autocomplete
                    value={props.field.value}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    defaultValue={props.field.value}
                    fullWidth
                    freeSolo
                    renderInput={
                      params => (
                          <TextField
                              fullWidth
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
