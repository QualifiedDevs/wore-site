import {styled} from '@mui/material/styles';
import {Button} from '@mui/material';

import useFeedback from "@hooks/useFeedback";

const FeedbackButton = styled((props) => {

    const {setSuccess} = useFeedback()

    function handleClick() {
        setSuccess("YAY")
    }

    return (
        <Button onClick={handleClick} {...props}>
            TEST FEEDBACK
        </Button>
    );
})``;

export default FeedbackButton;
