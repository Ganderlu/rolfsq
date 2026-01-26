"use client";

import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ onMenu }: any) {
  return (
    <IconButton
      sx={{ display: { md: "none" } }}
      onClick={onMenu}
    >
      <MenuIcon />
    </IconButton>
  );
}

