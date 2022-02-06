import {styled} from '@mui/material/styles';
import {Snackbar} from '@mui/material';

const Alert = styled((props) => {
    return (
        <Snackbar {...props} open={true} autoHideDuration={6000} message="hello"/>
    );
})``;

export default Alert;