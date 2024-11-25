"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const isHidden = ["/sign-in", "/sign-up"].some((route) =>
    pathname.includes(route)
  );

  if (isHidden) return null;

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.main,
        minHeight: "100px",
        color: theme.palette.common.white,
      }}
    >
      <Box>
        <Typography variant="body2">
          © {new Date().getFullYear()} Made by Mykola Maik
        </Typography>
      </Box>
    </Box>
  );
};
