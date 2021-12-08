import {styled} from '@mui/material/styles';
import {Container, Typography} from '@mui/material';

const index = styled((props) => {
    return (
        <Container {...props}>
            <Typography variant="h1">Hello World!</Typography>
        </Container>
    );
})``;

export default index;
