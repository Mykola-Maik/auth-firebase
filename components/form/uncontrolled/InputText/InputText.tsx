"use client";

import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { WithSx } from "@/types";
import FormHelperText from "@mui/material/FormHelperText";

interface InputTextProps extends WithSx {
  name: string;
  label: string;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

export const InputText = ({
  name,
  label,
  error,
  onBlur,
  onChange,
  placeholder,
  required,
  value,
  sx = {},
  inputRef,
  ...rest
}: InputTextProps) => {
  const theme = useTheme();
  const [, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (onBlur) onBlur(event);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.5,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            display: "flex",
            color: theme.palette.common.black,
            fontWeight: 600,
          }}
        >
          {label}

          {required && (
            <Typography
              sx={{
                lineHeight: "18px",
                color: theme.palette.error.main,
              }}
            >
              *
            </Typography>
          )}
        </Typography>
      </Box>

      <TextField
        inputRef={inputRef}
        name={name}
        error={!!error}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        required={required}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            p: 0,
            "& fieldset": {
              borderColor: error ? theme.palette.error.main : null,
              borderWidth: "1px",
              borderRadius: "8px",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "24px",
            },
            "& .MuiInputBase-input": {
              padding: "11px 12px",
              fontSize: "16px",
              lineHeight: "normal",
              color: theme.palette.common.black,
              "&::placeholder": {
                color: theme.palette.grey[600],
              },
            },
            "&:hover fieldset": {
              borderColor: error
                ? theme.palette.error.main
                : theme.palette.primary.main,
              boxShadow: "0px 4px 10px 0px rgba(3, 9, 80, .15)",
            },
            "&.Mui-focused fieldset": {
              border: `1px solid ${theme.palette.primary.main}`,
              boxShadow: "none",
            },
            "&.Mui-focused .MuiInputBase-input::placeholder": {
              opacity: 0,
            },
          },
          margin: 0,
          ...sx,
        }}
        {...rest}
      />

      {error && (
        <FormHelperText component={Box}>
          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.error.main,
              mt: 0.5,
              fontWeight: theme.typography.fontWeightRegular,
              width: "100%",
            }}
          >
            {error}
          </Typography>
        </FormHelperText>
      )}
    </Box>
  );
};
