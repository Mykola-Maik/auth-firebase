"use client";

import { auth } from "@/app/firebase/config";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Button,
  useTheme,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { usePathname } from "next/navigation";

export const Header = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const isHidden = ["/sign-in", "/sign-up"].some((route) =>
    pathname.includes(route)
  );

  if (isHidden) return null;

  const handleSignOut = async () => {
    try {
      await signOut(auth);

      sessionStorage.removeItem("user");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              gap: 5,
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={handleSignOut}
              type="button"
              sx={{
                color: theme.palette.common.white,
              }}
            >
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
