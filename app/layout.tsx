import type { Metadata } from "next";
import { Box } from "@mui/material";
import { Footer, Header } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth Firebase",
  description: "Auth Firebase next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Box
        component="body"
        sx={{
          backgroundColor: "grey",
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </html>
  );
}
