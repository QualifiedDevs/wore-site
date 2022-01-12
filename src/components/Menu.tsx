import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Link from "@components/Link";

// Loop over

const Item = styled(({ name, link, ...props }) => {
  return (
    <Link underline="none" color="white" href={link} {...props}>
      <li>
        <span>{name}</span>
      </li>
    </Link>
  );
})``;

const Menu = styled(({ items, ...props }) => {
  const menuItems = Object.keys(items).map((itemName: string) => {
    return <Item name={itemName} link={items[itemName]} />;
  });

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
  }
`;

export default Menu;
