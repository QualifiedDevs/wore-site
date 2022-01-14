import { styled } from "@mui/material/styles";
import { Box, Typography, Divider, Button } from "@mui/material";

import Image from "next/image";

import Link from "@components/Link";

import { LogoFull } from "@components/Branding";

//@ts-ignore
const Company = styled(({ link, ...props }) => {
  return (
    <Button component="a" href={link} {...props}>
      <LogoFull />
    </Button>
  );
})`
  display: block;
  border: 3px solid #1B2060;
  width: fit-content;
  height: fit-content;
  border-radius: 60px;
  text-transform: none;
  padding: 1.1375rem;
  color: white;
`;

//@ts-ignore
const Member = styled(({ member, ...props }) => {
  const { name, twitter, discord } = member;

  return (
    <Button {...props} component="a" href={`https://twitter.com/${twitter}`}>
      <Box component="li">
        <Box sx={{ mr: 1.8 }} className="avatar">
          <Image
            src={`/avatars/${name}.png`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </Box>
        <Typography component="span" sx={{ fontSize: "inherit" }}>
          {discord}
        </Typography>
      </Box>
    </Button>
  );
})`
  display: block;
  border: 3px solid #1B2060;
  width: fit-content;
  border-radius: 60px;
  text-transform: none;

  color: white;

  li {
    font-size: 1.2rem;

    padding: 0.2rem;
    padding-right: 0.8rem;

    display: flex;
    align-items: center;

    .avatar {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 100%;
      border: 3px solid #1B2060;
    }

    .avatar span {
      border-radius: 100%;
    }
  }
`;

//@ts-ignore
const MemberList = styled(({ team, ...props }) => {
  const members = Object.keys(team).map((memberName) => {
    const member = team[memberName];
    member.name = memberName;
    //@ts-ignore
    return <Member member={member} />;
  });

  return (
    <Box component="ul" {...props}>
      {members}
    </Box>
  );
})`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-row-gap: .5rem;
`;

//@ts-ignore
const Team = styled(({ manifest: { team, socials }, ...props }) => {
  return (
    <Box {...props}>
        <Typography variant="h3" sx={{mb: 2}}>
            Created By:
        </Typography>
        {/* @ts-ignore */}
      <Company link={socials.twitter} />
      <Divider flexItem light sx={{my: 2}} />
        {/* @ts-ignore */}
      <MemberList team={team} />
    </Box>
  );
})`

  h3 {
      font-size: 2rem;
  }

  hr {
      background: white;
      height: 2px;
  }
`;

export default Team;