"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const userSession = sessionStorage.getItem("user");

    if (!user && !userSession) {
      return router.push("/sign-in");
    }
  }, [user, router]);

  return (
    <Box>
      <Typography variant="h1">You are logged in</Typography>
    </Box>
  );
}
