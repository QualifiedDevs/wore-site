//@ts-nocheck

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Stack,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import theme from "@src/theme";

import manifest from "@src/manifest.json";

const coinbaseReferral = manifest["referral links"].coinbase;
const shakepayReferral = manifest["referral links"].shakepay;

const FAQItem = styled(({ summary, children, ...props }) => {
  return (
    <Accordion component="li" {...props}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="white" />}
        aria-controls="panel1a-content"
      >
        <Typography variant="h3" className="summary">
          {summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{children}</Typography>
      </AccordionDetails>
    </Accordion>
  );
})`
  background: #3b3b3b;

  svg {
    fill: white;
  }

  border-radius: 12px !important;

  margin-bottom: 0.8em;

  .summary {
    font-size: 1.125em;
    font-weight: bold;
    text-transform: uppercase;
  }
  p {
    font-size: 1rem;
    b {
      text-transform: uppercase;
    }
    span {
      margin: 0.5em 0 1em;
      display: inline-block;
    }
  }
`;

const FAQ = styled(({ ...props }: { id: string }) => {
  const [expanded, setExpanded] = useState<boolean | string>(false);
  const handleChange =
    (panel: string) =>
    (event: React.SyntheticEvent<Element, Event>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box {...props}>
      <Container maxWidth="md">
        <Typography variant="h3" className="heading">
          FAQ
        </Typography>
        <Box component="ul" className="faq-box">
          <FAQItem
            summary={"What is NFT?"}
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            NFT stands for “Non-fungible token” . These tokens are one-of-a-kind
            and unique. They use blockchain technology to establish a verified
            and public proof of ownership.
          </FAQItem>
          <FAQItem
            summary={"What is Metamask?"}
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            Metamask is a software-based cryptocurrency wallet. It stores your
            Ethereum and bridges interaction with Ethereum blockchain. You will
            need Metamask or a similar wallet to pre purchase or mint a WORE
            NFT. Visit metamask.io for more information.
          </FAQItem>
          <FAQItem
            summary={"What is the total NFT Count for Wolf Of Real Estate?"}
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            There will be 8,888 original Wolf OF Real Estate NFT's. Of that,
            there will be 1,888 Gen 0 and 7,000 Gen 1 to start. The total count
            will never increase.
          </FAQItem>
          <FAQItem
            summary={"What is the difference between Gen 0 & Gen 1?"}
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            Details will be released as the roadmap unveils. Gen 0 will have a
            greater initial utility reward.
          </FAQItem>
          <FAQItem
            summary={"What is a utility reward?"}
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            A utility reward is a specific system created by certain projects
            that give their NFT holders benefits whether in the real or digital
            world.
          </FAQItem>
          <FAQItem
            summary={"What is the specific utility reward?"}
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            Details will be released as the roadmap unveils. We are in real
            estate, so let your imagination run wild.
          </FAQItem>
          <FAQItem
            summary={"How do I get a WORE NFT?"}
            expanded={expanded === "panel7"}
            onChange={handleChange("panel7")}
          >
            There are a few ways, either presale, whitelist, or public sale.
            Follow on Twitter and Discord to learn more. How do I purchase?
          </FAQItem>
          <FAQItem
            summary={"How do I purchase?"}
            expanded={expanded === "panel8"}
            onChange={handleChange("panel8")}
          >
            <Stack spacing={2}>
              <Paper className="purchase-step">
                <Typography variant="h5">Buy ETH</Typography>
                <Typography className="subheader">
                  Buy ETH from your preferred exchange
                </Typography>
                <Typography>
                  <b>
                    Canada: <a href={shakepayReferral}>Shakepay</a>
                  </b>{" "}
                  Sign up Bonus:{" "}
                  <a href={shakepayReferral}>{shakepayReferral}</a>
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  <b>
                    USA: <a href={coinbaseReferral}>Coinbase</a>
                  </b>{" "}
                  Sign up Bonus:{" "}
                  <a href={coinbaseReferral}>{coinbaseReferral}</a>
                </Typography>
                <Typography>
                  <a href={shakepayReferral}>Shakepay</a> and{" "}
                  <a href={coinbaseReferral}>Coinbase</a> are two popular
                  exchanges that you can use. The sign-up process is easy and
                  you can fund your account and purchase ETH quickly. Be sure to
                  get slightly more ETH than the purchase price in order to
                  cover network/gas fees. 0.05 ETH will more than cover it.
                </Typography>
              </Paper>
              <Paper className="purchase-step">
                <Typography variant="h5">Transfer ETH to Wallet</Typography>
                <Typography className="subheader">
                  Buy ETH from your preferred exchange
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  Install a wallet on your phone via Google Chrome browser.
                  <br />
                  <strong>Metamask + Trust Wallet</strong> are popular choices.
                </Typography>
                <Typography>
                  <strong>Metamask:</strong>{" "}
                  <a href="https://metamask.io/">https://metamask.io/</a>
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  <strong>Trust Wallet:</strong>{" "}
                  <a href="https://trustwallet.com/">
                    https://trustwallet.com/
                  </a>
                </Typography>
                <Typography>
                  Open wallet, select <strong>RECEIVE</strong>. Choose{" "}
                  <strong>ETHEREUM</strong> and copy the address that appears.
                  Go back to your exchange app (i.e.{" "}
                  <a href={shakepayReferral}>Shakepay</a> or{" "}
                  <a href={coinbaseReferral}>Coinbase</a>) and select{" "}
                  <strong>ethereum</strong> from your portfolio. There you can{" "}
                  <strong>send/withdraw</strong> the desired amount of{" "}
                  <strong>ETH</strong> to the address you copied from your
                  wallet. Confirm that the amount of <strong>ETH</strong> to
                  send to the address. Confirm that the wallet address you paste
                  is the same as the <strong>receive</strong> address you
                  copied.
                </Typography>
              </Paper>
              <Paper className="purchase-step">
                <Typography variant="h5">
                  Connect Wallet to wolfofrealestate.com
                </Typography>
                <Typography>
                  <b>Desktop</b>
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  Go to WORE Presale link in Chrome. Click connect wallet an
                  follow wallet instructions.
                </Typography>
                <Typography>
                  <b>Smartphone</b>
                </Typography>
                <Typography>
                  Open wallet and sollect 'Browser' (in settings for Metamask,
                  in bottom nav bar for Trust Wallet). Go to WORE Presale link,
                  connect wallet and follow wallet instructions.
                </Typography>
              </Paper>
              <Paper className="purchase-step">
                <Typography variant="h5">
                  Click to Pre-Purchase 1, 2 or 3 WORE NFTs.
                </Typography>
                <Typography>Follow wallet instructions</Typography>
              </Paper>
              <Paper className="purchase-step">
                <Typography variant="h5">Hold!</Typography>
                <Typography>
                  Welcome to the <strong>Wolf of Real Estate</strong> family!
                  Get ready for launch 🚀
                </Typography>
              </Paper>
            </Stack>
          </FAQItem>
        </Box>
      </Container>
    </Box>
  );
})`
  padding: 4rem 0;
  width: 100%;

  counter-reset: step;

  .purchase-step {
    background: #6b6b6b;
    padding: 1em;
    text-align: center;
    counter-increment: step;
    h5 {
      color: ${({ theme }) => theme.palette.primary.light};
      font-weight: 600;
      ::before {
        content: "Step " counter(step) ": ";
      }
      text-transform: uppercase;
      margin-bottom: 1rem;
    }

    .subheader {
      color: #cfcfcf;
      text-transform: uppercase;
      font-size: 1.1em;
      margin-bottom: 1em;
      font-weight: 500;
    }

    a {
      color: ${({ theme }) => theme.palette.primary.light};
    }

    strong {
      text-transform: uppercase;
      font-weight: 600;
    }
  }

  .heading {
    text-align: center;
    margin-bottom: 0.5em;
  }
  .faq-box {
    list-style-type: none;
    padding: 0;
  }
`;

export default FAQ;
