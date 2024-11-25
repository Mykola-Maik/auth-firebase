"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { validationSchema } from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormValues } from "@/types";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { FormInputText } from "@/components";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormValues>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const theme = useTheme();
  const router = useRouter();
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    const toastId = toast.loading("Waiting...");

    try {
      const res = await createUserWithEmailAndPassword(
        data.email,
        data.password
      );

      if (res) {
        await updateProfile(res.user, {
          displayName: data.username,
        });

        reset();

        toast.update(toastId, {
          render: "You are signed up!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        sessionStorage.setItem("user", JSON.stringify(res.user));

        router.push("/sign-in");
      } else {
        toast.update(toastId, {
          render: "Invalid email or password",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: error as string,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });

      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" textAlign="center" mb={3}>
        Sign Up
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <FormInputText
            name="username"
            control={control}
            label="Username"
            placeholder="Enter username"
            errorData={errors.username?.message}
            required
          />
        </Box>
        <Box mb={2}>
          <FormInputText
            name="email"
            control={control}
            label="Email"
            placeholder="example@email.com"
            errorData={errors.email?.message}
            required
          />
        </Box>
        <Box mb={2}>
          <FormInputText
            name="password"
            control={control}
            label="Password"
            placeholder="Enter password"
            errorData={errors.password?.message}
            type="password"
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ my: 2 }}
        >
          Sign Up
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ display: "inline", mr: 1 }}
        >
          I already have an account!
        </Typography>
        <Box
          component={Link}
          href="/sign-in"
          sx={{
            display: "inline",
            color: theme.palette.primary.main,
          }}
        >
          Sign In
        </Box>
      </Box>
    </Box>
  );
}
