"use client";

import { FormInputText } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { validationSchema } from "./validationSchema";
import { SignInFormValues } from "@/types";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormValues>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const theme = useTheme();
  const router = useRouter();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    const toastId = toast.loading("Waiting...");

    try {
      const res = await signInWithEmailAndPassword(data.email, data.password);

      if (res) {
        reset();
        sessionStorage.setItem("user", JSON.stringify(res.user));
        toast.update(toastId, {
          render: "You are logged in!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        router.push("/");
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
        Sign In
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
          Sign In
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
          Don&apos;t have an account?
        </Typography>
        <Box
          component={Link}
          href="/sign-up"
          sx={{
            display: "inline",
            color: theme.palette.primary.main,
          }}
        >
          Sign Up
        </Box>
      </Box>
    </Box>
  );
}
