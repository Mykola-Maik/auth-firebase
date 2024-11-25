import * as yup from "yup";

export const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must contain more than 3 characters")
    .max(20, "Username must contain less than 20 characters")
    .required("Username is required"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});
