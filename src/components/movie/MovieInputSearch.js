import React from "react";
import { Controller } from "react-hook-form";
import { TextFieldWrapper } from "../../Layout/SearchMovie/MovieDetail";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";

function MovieInputSearch({ name, label, control, placeholder }) {
  return (
    <Controller
      render={({
        field: { value, onChange },
        fieldState: { error },
        formState,
      }) => (
        <TextFieldCustom
          fullWidth
          hiddenLabel
          error={!!error}
          onChange={onChange}
          value={value}
          multiline
          placeholder={placeholder}
        />
      )}
      name={name}
      control={control}
    />
  );
}

export default MovieInputSearch;

const TextFieldCustom = styled(TextField)`
  fieldset {
    border-color: #919eab32;
    border-radius: 10px;
  }
`;
