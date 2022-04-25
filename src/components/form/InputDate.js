import { DatePicker, LocalizationProvider } from "@mui/lab";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export const InputDate = ({ control, label, name }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        render={({ field, fieldState, formState }) => (
          <DatePicker
            label={label}
            value={field.value}
            onChange={field.onChange}
            renderInput={(params) => <TextField {...params} />}
            inputFormat={'MM/dd/yyyy'}
            maxDate={new Date()}
          />
        )}
        name={name}
        control={control}
      />
    </LocalizationProvider>
  );
};
