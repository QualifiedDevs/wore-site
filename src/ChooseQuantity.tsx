import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

//Incremenet QuantitySelected Context
const IncrementButton = styled((props) => {
  return (
    //  TODO: Integrate Context
    <IconButton variant="contained" {...props}>
      <Add />
    </IconButton>
  );
})``;

//Decrement QuantitySelected Context
const DecrementButton = styled((props) => {
  //  TODO: Integrate Context
  return (
    <IconButton variant="contained" {...props}>
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
      <IncrementButton />
      <span>X</span>
      <DecrementButton />
    </Box>
  );
})``;

export default ChooseQuantity;
