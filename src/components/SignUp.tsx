import React, { useState, useEffect, useCallback } from "react";

import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { emailExp } from "@utils/regex";

import formatRes from "@utils/formatRes";

import signup from "@utils/signup";

import Image from "next/image";
import teaserMockup from "@public/teaser.png";

//TODO: Extract validation and typing to utils

import { WoreLogoFull } from "@components/Branding";

import manifest from "@src/manifest.json";

import DiscordIcon from "@src/vector-graphics/socials/discord";

import useFeedback from "@hooks/useFeedback";

interface FormData {
  email: string;
}

function validateEmail(email: string) {
  return emailExp.test(email);
}

function validateForm(data: FormData) {
  return validateEmail(data.email);
}

enum FormState {
  Valid = 0,
  Invalid,
  Submitted,
}

const RegisterEmail = styled(({ ...props }) => {
  const { setSuccess, setError } = useFeedback();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({ email: "" });
  const [formState, setFormState] = useState<FormState>(FormState.Valid);

  useEffect(() => {
    const isValid = validateForm(formData);
    setFormState(isValid ? FormState.Valid : FormState.Invalid);
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      setIsLoading(true);
      //@ts-ignore
      const [data, err] = await formatRes(signup(formData));
      setIsLoading(false);
      if (err) {
        setError("Failed to register, please try again");
        console.error(err);
        return;
      }
      setFormState(FormState.Submitted);
      setSuccess("Sucessfully registered");
    },
    [formData]
  );

  const handleEmailInputChange = useCallback((e: any) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
  }, []);

  return (
    <Stack
      component="form"
      direction="row"
      alignItems="center"
      onSubmit={handleSubmit}
      spacing={2}
      {...props}
    >
      <TextField
        color="primary"
        required
        label="EMAIL"
        placeholder="wolfofrealestate.com"
        value={formData.email}
        onChange={handleEmailInputChange}
        error={formData.email !== "" && formState === FormState.Invalid}
        disabled={formState === FormState.Submitted || isLoading}
      />
      <LoadingButton
        type="submit"
        loading={isLoading}
        disabled={formState !== FormState.Valid}
        variant="contained"
        sx={{ py: 1.75, px: 3 }}
      >
        Subscribe
      </LoadingButton>
    </Stack>
  );
})`
  .MuiTextField-root {
    width: 100%;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #d4d4d4;
  }

  .MuiLoadingButton-root.Mui-disabled:not(.MuiLoadingButton-loading) {
    border: 2px solid #d4d4d4;
    color: #d4d4d4;
  }

  .MuiLoadingButton-loading {
    background: ${({ theme }) => theme.palette.primary.dark};
    svg {
      color: white;
    }
  }
`;

const TeaserMockup = styled((props) => {
  return (
    <Box {...props}>
      <Image src={teaserMockup} layout="responsive" />
    </Box>
  );
})`
  width: min(70%, 350px);
`;

const DiscordButton = styled((props) => {
  return (
    <Button
      {...props}
      component="a"
      href={manifest.socials.discord}
      endIcon={<DiscordIcon />}
    >
      Join our Discord
    </Button>
  );
})`
  font-size: 1.2em;
  padding: 1em 2.5em;
  border-radius: 1000px;
  border: 2px solid white;
`;

const SignUp = styled(({ ...props }: { id: string }) => {
  return (
    <Box {...props}>
      {/* @ts-ignore */}
      {/* <TeaserMockup sx={{ mb: 2 }} /> */}
      {/* <Typography className="info" sx={{ mb: 2 }}>
        By submitting your contact information, you are registering for an
        opportunity to receive a whitelist spot.
      </Typography> */}

      <Box>
        <Typography variant="h3" component="h4" sx={{mb: 3}} >Ready to get involved?</Typography>
        {/* @ts-ignore */}
        <DiscordButton variant="contained" className="discord-button" />
      </Box>
      <Stack className="newsletter" spacing={2} justifyContent="start">
        <Typography className="description">
          ...and <b>sign up</b> to our newsletter for exclusive updates!
        </Typography>
        <RegisterEmail />
      </Stack>
    </Box>
  );
})`
  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em 0;
  text-align: center;
  overflow: hidden;

  h4 {

  }

  .newsletter {
    position: absolute;
    bottom: max(15px, 8%);
    width: min(90%, 500px);
  }

  .description {
    font-size: 0.8em;

    b {
      color: ${({ theme }) => theme.palette.primary.light};
    }
  }
`;

export default SignUp;
