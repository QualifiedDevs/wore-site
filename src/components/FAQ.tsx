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
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import theme from "@src/theme";

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

const FAQ = styled((props) => {
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
          ></FAQItem>
        </Box>
      </Container>
    </Box>
  );
})`
  padding: 4rem 0;
  width: 100%;

  .heading {
    text-align: center;
    margin-bottom: 1em;
  }
  .faq-box {
    list-style-type: none;
    padding: 0;
  }
`;

export default FAQ;
