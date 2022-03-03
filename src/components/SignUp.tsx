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
      <Typography variant="h1">W | O | R | E</Typography>
      <Typography variant="h2">Wolf of Real Estate</Typography>
      <TeaserMockup sx={{ mb: 2 }} />
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
`;

export default SignUp;
