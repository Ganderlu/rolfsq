"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { IconButton } from "@mui/material";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <IconButton
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      sx={{ color: "inherit" }}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </IconButton>
  );
}
