import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

//Incremenet QuantitySelected Context
const IncrementButton = styled((props) => {
  return (
    //  TODO: Integrate Context
    <IconButton color="button" {...props}>
      <Add />
    </IconButton>
  );
})``;

//Decrement QuantitySelected Context
const DecrementButton = styled((props) => {
  //  TODO: Integrate Context
  return (
    <IconButton color="button" {...props}>
      <Remove />
    </IconButton>
  );
})``;

//  Choose & Display Quantity to Mint, Update QuantitySelected Context
const ChooseQuantity = styled((props) => {
  //  TODO: Get Quantity from Context
  // TODO: Accept "maxquantity" prop
  return (
    <Box {...props}>
      <DecrementButton />
      <span>X</span>
      <IncrementButton />
    </Box>
  );
})`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-column-gap: .2rem;
place-items: center;
`;

export default ChooseQuantity;
