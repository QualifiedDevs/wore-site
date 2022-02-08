import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Container, TextField, Button, Tooltip } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import signup from "@utils/signup";
const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const discordRegex = new RegExp(/^.{3,32}#[0-9]{4}$/);
const walletRegex = new RegExp(/^0x[a-fA-F0-9]{40}$/);

enum SubmitState {
  NONE = 0,
  SUBMITTED,
}

enum Validation {
  EMPTY = 0,
  VALID,
  INVALID,
}

// function useInput(validationExp: RegExp | undefined) {
//   return validationExp
//     ? (() => {
//         const [input, setRawInput] = useState({
//           input: "",
//           isValid: Validation.EMPTY,
//         });
//         function setUserInput(input: string) {  //TODO: Swap to useCallback
//           const validation =
//             input === ""
//               ? Validation.EMPTY
//               : validationExp!.test(input)
//               ? Validation.VALID
//               : Validation.INVALID;
//           setRawInput({ input, validation });
//         }
//         return [input, setUserInput];
//       })()
//     : useState("");
// }

// const DataField = styled(({userInput, setInput, title, ...props}) => {

//   function handleChange(e: any) {
//     const val = e.target.value;
//     // How do I pass up the state?
//   }

//   return (
//     <Tooltip title={props.title}>
//       <TextField {...props}></TextField>
//     </Tooltip>
//   );
// })``;

const DataForm = styled((props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitState, setSubmitState] = useState(SubmitState.NONE);

  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const [emailErr, setEmailErr] = useState(false);
  const [discordErr, setDiscordErr] = useState(false);
  const [walletErr, setWalletErr] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signup(
        email,
        discord,
        walletAddress !== "" ? walletAddress : undefined
      );
      console.log("RESPONSE RECEIVED:", res);
    } catch (err) {
      console.log("SUBMIT FAILED", err);
    }
    setIsLoading(false);
    setSubmitState(SubmitState.SUBMITTED);
  }

  return (
    <Container component="form" onSubmit={handleSubmit} maxWidth="sm" {...props}>
      <TextField
        error={emailErr}
        required
        label="EMAIL"
        placeholder="worewolf@wolfofrealestate.com"
        value={email}
        onChange={(e) => {
          const val = e.target.value;
          setEmailErr(!emailRegex.test(val));
          setEmail(e.target.value);
          setSubmitState(SubmitState.NONE);
        }}
      />

      <Tooltip title="ex) worewolf#1184" placement="left">
        <TextField
          error={discordErr}
          required
          label="DISCORD ID [USERNAME#ID]"
          placeholder="worewolf#1184"
          value={discord}
          onChange={(e) => {
            const val = e.target.value;
            setDiscordErr(!discordRegex.test(val));
            setDiscord(e.target.value);
            setSubmitState(SubmitState.NONE);
          }}
        />
      </Tooltip>
      <Tooltip
        title="Must use an independent wallet provider, NOT from an exchange (e.g. Metamask, Trust Wallet)"
        placement="bottom-start"
      >
        <TextField
          error={walletErr}
          label="ETHEREUM WALLET ADDRESS"
          placeholder="0x1cd7840181b4142C336F3E69d1E58d3f38330D9C"
          value={walletAddress}
          onChange={(e) => {
            const val = e.target.value;
            setWalletErr(!walletRegex.test(val));
            setWalletAddress(e.target.value);
            setSubmitState(SubmitState.NONE);
          }}
        />
      </Tooltip>
      <LoadingButton type="submit" loading={isLoading} disabled={emailErr || discordErr || walletErr} variant="contained">
        {submitState === SubmitState.SUBMITTED ? "Submitted" : "Submit"}
      </LoadingButton>
    </Container>
  );
})`
  display: grid;
  grid-template-rows: 1fr;
  grid-row-gap: 1em;

  .MuiButton-root,
  .MuiTextField-root {
    backround: black;
  }

  .MuiTextField-root {
    background: black;
  }

  .MuiButton-root {
    color: #ffffff;
    padding: 0.25em 0;
    font-size: 1.5rem;

    &.MuiLoadingButton-loading {
      background: #8b8b8b;
      color: transparent !important;
    }

    :disabled {
      border: 2px solid white;
    color: #858585;

    }
  }

  .MuiTextField-root {
  }
`;

export default DataForm;
