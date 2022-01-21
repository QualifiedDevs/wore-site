// @ts-nocheck

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  SvgIcon,
  IconButton,
} from "@mui/material";

import { useRouter } from "next/router";

import Link from "@components/Link";

import MenuIcon from "@mui/icons-material/Menu";

import SocialsMenu from "@components/SocialsMenu";

const Item = styled(({ name, link, closemenu, ...props }) => {
  return (
    <ListItem disablePadding {...props}>
      {link ? (
        <Link href={link || ""} underline="none" color="white">
          <ListItemButton onClick={closemenu}>
            <ListItemText>{name}</ListItemText>
          </ListItemButton>
        </Link>
      ) : (
        <ListItemText className="disabled">{name}</ListItemText>
      )}
    </ListItem>
  );
})`
  a {
    width: 100%;
  }

  &.active .MuiTypography-root {
    font-weight: bold;
    color: #0077ff;
  }

  .disabled {
    opacity: 30%;
    padding: .5em 1em;
  }
`;

const DrawerMenu = styled(({items, socials, closemenu, ...props}) => {
  const { pathname } = useRouter();

  const getTopPath = (pathname: string) => {
    if (!pathname) return null;
    const subDirStart = pathname.indexOf("/", 1);
    return subDirStart === -1 ? pathname : pathname.slice(0, subDirStart);
  };

  const isActiveRoute = (link: string) => {
    //TODO: Cache results for efficiency
    return getTopPath(link) === getTopPath(pathname);
  };

  const menuItems = Object.keys(items).map(
    (itemName: string, index: number) => (
      <Item
        name={itemName}
        link={items[itemName]}
        key={index}
        className={isActiveRoute(items[itemName]) && "active"}
        closemenu={closemenu}
      />
    )
  );

  return (
    <Drawer anchor="top" onClose={closemenu} {...props}>
      {menuItems}
      <Divider />
      <SocialsMenu socials={socials} className="socials" />
    </Drawer>
  );
})`
  .MuiDrawer-paper {
    background: #0b1126;
  }

  hr {
    background: #1c243f;
  }

  .socials {
    padding: 0.5em 0.8em;
    svg {
      width: 1.8rem;
      heigth: 1.8rem;
    }
  }
`;

const MobileMenu = styled(({ items, socials, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton color="secondary" onClick={() => setOpen(true)} {...props}>
        <MenuIcon />
      </IconButton>
      <DrawerMenu
        open={open}
        closemenu={() => setOpen(false)}
        items={items}
        socials={socials}
      />
    </>
  );
})`
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export default MobileMenu;