import { InputText } from "@/components";
import {
  type Control,
  type RegisterOptions,
  type FieldValues,
  type Path,
  Controller,
} from "react-hook-form";
import type { SxProps } from "@mui/system";

interface FormInputTextProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
  label: string;
  placeholder?: string;
  required?: boolean;
  errorData?: string;
  type?: "text" | "password";
  sx?: SxProps;
}

export const FormInputText = <TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  label,
  placeholder,
  required,
  errorData,
  type,
  sx,
}: FormInputTextProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => (
        <InputText
          name={name}
          label={label}
          inputRef={ref}
          error={errorData ? errorData : error?.message}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          type={type}
          sx={sx}
        />
      )}
    />
  );
};
