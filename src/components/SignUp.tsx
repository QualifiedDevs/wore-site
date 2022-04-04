import React, { useState, useEffect, useCallback } from "react";

import { styled } from "@mui/material/styles";
import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { emailExp } from "@utils/regex";

import formatRes from "@utils/formatRes";

import signup from "@utils/signup";

import Image from "next/image";
import teaserMockup from "@public/teaser.png";

//TODO: Extract validation and typing to utils

import { WoreLogoFull } from "@components/Branding";

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
    <Stack component="form" onSubmit={handleSubmit} spacing={2} {...props}>
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
        sx={{ py: 2 }}
      >
        Submit
      </LoadingButton>
    </Stack>
  );
})`
  width: min(90%, 400px);

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

const SignUp = styled(({ ...props }: { id: string }) => {
  return (
    <Box {...props} >
      {/* @ts-ignore */}
      <WoreLogoFull className="logo" sx={{ mb: 3 }} />
      {/* <TeaserMockup sx={{ mb: 2 }} /> */}
      <Box className="video-wrapper" sx={{ mb: 4 }}>
        <video src="/teaser-trailer.mp4" autoPlay loop muted></video>
      </Box>
      <Typography className="info" sx={{ mb: 2 }}>
        By submitting your contact information, you are registering for an
        opportunity to receive a whitelist spot.
      </Typography>
      <RegisterEmail />
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

  .info {
    width: 80%;
    color: #d4d4d4;
  }

  .logo {
    width: min(70%, 400px);
  }

  .video-wrapper {
    z-index: -1;
    margin: auto;
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 30%;
    top: 0;
    overflow: hidden;
    display: grid;
    place-items: center;
    video {
      min-width: 100%;
      min-height: 100%;
    }
  }
`;

export default SignUp;
