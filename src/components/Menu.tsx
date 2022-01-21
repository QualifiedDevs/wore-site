// @ts-nocheck

import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import { useRouter } from "next/router";

import Link from "@components/Link";

// Use next/router. Parse for subdirectories, url is a subdirectory of the link add active className

//@ts-ignore
const Item = styled(({ name, link, ...props }) => {
  return link ? (
    <Link underline="none" color="white" href={link || ""} {...props}>
      <li>
        <span>{name}</span>
      </li>
    </Link>
  ) : (
    <li className="disabled">
      <span>{name}</span>
    </li>
  );
})``;

//@ts-ignore
const Menu = styled(({ items, ...props }) => {
  const { pathname } = useRouter();

  const getTopPath = (pathname: string) => {
    if (!pathname) return null;
    const subDirStart = pathname.indexOf("/", 1);
    return (subDirStart === -1)? pathname : pathname.slice(0, subDirStart);
  }

  const isActiveRoute = (link: string) => {
    // Not efficient to getTopPath for pathname for each menu item but... who cares?
    return getTopPath(link) === getTopPath(pathname);
  }


  // How do I handle "/"?
  // I guess I can just manuallly check.

  // If up the the second slash or end of the string matches, then we're golden

  const menuItems = Object.keys(items).map(
    (itemName: string, index: number) => (
      <Item name={itemName} link={items[itemName]} key={index} className={isActiveRoute(items[itemName]) && "active"} />
    )
  );

  return (
    <Box component="nav" {...props}>
      <ul>{menuItems}</ul>
    </Box>
  );
})`
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, auto);
    grid-column-gap: 1.5rem;
    display: flex;
    list-style-type: none;

    .disabled {
      opacity: 40%;
    }

    [disabled] {
      background: red;
    }

    li {
      transition: color 0.15s ease;
    }

    .active {
      font-weight: bold;
      color: #3a5ff5;
    }

    li:not(.disabled) {
      :hover {
        color: #3a5ff5;
      }
    }
  }
`;

export default Menu;