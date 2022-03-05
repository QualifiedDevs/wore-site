import React, { useState, useCallback } from "react";

import { styled } from "@mui/material/styles";
import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { emailExp } from "@utils/regex";

import formatRes from "@utils/formatRes";

import signup from "@utils/signup";

import Image from "next/image";
import teaserMockup from "@public/teaser.png";

//TODO: Extract validation and typing to utils

import { useMaxSupply } from "@global/presaleContract";

import { WoreLogoFull } from "@components/Branding";

interface FormData {
  email: string;
}

function validateEmail(email: string) {
  return emailExp.test(email);
}

function validateForm(data: FormData) {
  return validateEmail(data.email);
}

const RegisterEmail = styled(({ ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({ email: "" });

  const handleSubmit = useCallback(async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    //@ts-ignore
    const [data, err] = await formatRes(signup(formData));
    setIsLoading(false);
    if (err) console.error(err);
  }, []);

  const handleEmailInputChange = useCallback((e: any) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
  }, []);

  return (
    <Stack spacing={2} {...props}>
      <TextField
        required
        label="EMAIL"
        placeholder="wolfofrealestate.com"
        value={formData.email}
        onChange={handleEmailInputChange}
      />
      <LoadingButton type="submit" loading={isLoading} variant="contained">
        Submit
      </LoadingButton>
    </Stack>
  );
})``;

const TeaserMockup = styled((props) => {
  return (
    <Box {...props}>
      <Image src={teaserMockup} layout="responsive" />
      <hr />
    </Box>
  );
})`
  width: min(40%, 400px);
  hr {
    width: 90%;
  }
`;

const SignUp = styled(({ ...props }: { id: string }) => {
  return (
    <Container {...props}>
      {/* @ts-ignore */}
      <WoreLogoFull className="logo" sx={{ mb: 3 }} />
      <TeaserMockup sx={{ mb: 2 }} />
      <Typography className="info" sx={{ mb: 2 }}>
        By submitting your contact information, you are registering for an
        opportunity to receive a whitelist spot.
      </Typography>
      <RegisterEmail />
    </Container>
  );
})`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em 0;
  text-align: center;

  .info {
    width: 80%;
    opacity: 30%;
  }

  .logo {
    width: min(70%, 600px);
  }
`;

export default SignUp;
