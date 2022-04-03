import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Controller} from 'react-hook-form';
import {css} from '@emotion/react';
import styled from '@emotion/styled';

export default function MovieSearchAutoComplete({control, name, label, items, placeholder}) {
  return (
      <Controller
          render={
            (props) => (
                <Autocomplete
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
