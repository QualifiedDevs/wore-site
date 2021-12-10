import {styled} from '@mui/material/styles';
import {Box, Button} from '@mui/material';

// TODO: Everything :)

/*
    ? STATES:
    *   Mint Coming Soon
    *   Countdown to Mint
    *   Connect Wallet
    *   Mint
    *   Mint Loading
    *   Sold Out
    * 
    *   Make a Countdown, 
*/


const MultiButton = styled((props) => {
    return (
        <Button variant="contained" color="button" {...props}>
           Connect Wallet
        </Button>
    );
})``;

export default MultiButton;