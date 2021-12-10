import React, { createContext, useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

export const QuantityContext = createContext({ quantity: 1 });

//Incremenet QuantitySelected Context
const IncrementButton = styled((props) => {
  const { quantity, setQuantity } = useContext(QuantityContext);
  return (
    //  TODO: Integrate Context
    <IconButton
      color="button"
      onClick={() => (quantity < 30) && setQuantity(quantity + 1)}
      {...props}
    >
      <Add />
    </IconButton>
  );
})``;

//Decrement QuantitySelected Context
const DecrementButton = styled((props) => {
  //  TODO: Integrate Context
  const { quantity, setQuantity } = useContext(QuantityContext);
  return (
    <IconButton
      color="button"
      onClick={() => (quantity > 1) && setQuantity(quantity - 1)}
      {...props}
    >
      <Remove />
    </IconButton>
  );
})``;

//  Choose & Display Quantity to Mint, Update QuantitySelected Context
const ChooseQuantity = styled((props) => {
  //  TODO: Get Quantity from Context
  // TODO: Accept "maxquantity" prop

  //! Buttons need access to count, how do I update QuantityProvider?

  const quantity = useContext(QuantityContext).quantity;

  return (
    <Box {...props}>
      <DecrementButton />
      <span>{quantity}</span>
      <IncrementButton />
    </Box>
  );
})`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 0.2rem;
  place-items: center;
`;

export default ChooseQuantity;

export const QuantityProvider = (props) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <QuantityContext.Provider value={{ quantity, setQuantity }} {...props} />
  );
};
