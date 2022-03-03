import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Stack } from "@mui/material";

import Link from "@components/Link";

const Item = styled(
  ({ label, link, ...props }: { label: string; link: string | null }) => {
    return link ? (
      <Typography
        component={Link}
        href={link}
        color="white"
        underline="none"
        {...props}
      >
        {label}
      </Typography>
    ) : (
      <Typography {...props}>{label}</Typography>
    );
  }
)`
  display: block;
  text-transform: capitalize;
`;

const NavMenu = styled(
  ({ menuData, ...props }: { menuData: { [key: string]: string | null } }) => {
    const menuItems = useMemo(
      () =>
        Object.keys(menuData).map((label: string, index: number) => (
          <Item label={label} link={menuData[label]} key={index} />
        )),
      []
    );

    return (
      <Stack component="nav" direction="row" spacing={4} {...props}>
        {menuItems}
      </Stack>
    );
  }
)``;

export default NavMenu;
