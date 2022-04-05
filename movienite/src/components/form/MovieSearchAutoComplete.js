import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Controller} from 'react-hook-form';
import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {CircularProgress} from '@mui/material';

export default function MovieSearchAutoComplete({control, name, label, items, placeholder, onChange, loading, readOnly}) {
  return (
      // defaultValue should be {label: 'name'}
      <Controller
          render={
            (props) => (
                <Autocomplete
                    loading={loading}
                    value={props.field.value}
                    isOptionEqualToValue={(option, value) => option.title === value.title}
                    defaultValue={props.field.value}
                    fullWidth
                    freeSolo
                    readOnly={readOnly}
                    renderInput={
                      params => (
                          <TextField
                              onChange={onChange}
                              fullWidth
                              {...params} label={label}
                                     placeholder={placeholder}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                      {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                              }}
                          />
                      )
                    } options={items}
                    getOptionLabel={option => option? option.title: ""}
                    onChange={(_, data) => props.field.onChange(data)}
                />
            )
          } name={name} control={control}
      />
  );
}
