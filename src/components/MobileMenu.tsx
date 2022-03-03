import React, { useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";

import Link from "@components/Link";
import MenuIcon from "@mui/icons-material/Menu";

const Item = styled(
  ({
    label,
    link,
    closeMenu,
    ...props
  }: {
    label: string;
    link: string | null;
    closeMenu: () => void;
  }) => {
    return (
      <ListItem disablePadding {...props}>
        {link && (
          <ListItemButton
            component={Link}
            onClick={closeMenu}
            href={link}
            underline="none"
            color="white"
          >
            <ListItemText primary={label} />
          </ListItemButton>
        )}
        {!link && <ListItemText primary={label} className="disabled" />}
      </ListItem>
    );
  }
)`
  text-transform: capitalize;

  .disabled {
    opacity: 30%;
  }

  a {
    display: box;
  }
`;

const DrawerMenu = styled(
  ({
    menuData,
    closeMenu,
    ...props
  }: {
    menuData: { [key: string]: string | null };
    open: boolean;
    closeMenu: () => void;
  }) => {
    const menuItems = useMemo(
      () =>
        Object.keys(menuData).map((label: string, index: number) => (
          <Item
            label={label}
            link={menuData[label]}
            closeMenu={closeMenu}
            key={index}
          />
        )),
      []
    );

    return (
      <Drawer anchor="top" onClose={closeMenu} {...props}>
        <List>{menuItems}</List>
      </Drawer>
    );
  }
)`
  .MuiDrawer-paper {
    background: #000000;
  }
`;

const MobileMenu = styled(
  ({ menuData, ...props }: { menuData: { [key: string]: string | null } }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <IconButton color="secondary" onClick={() => setOpen(true)} {...props}>
          <MenuIcon />
        </IconButton>
        <DrawerMenu
          open={open}
          closeMenu={() => setOpen(false)}
          menuData={menuData}
        />
      </>
    );
  }
)``;

export default MobileMenu;
