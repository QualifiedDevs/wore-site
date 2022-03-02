import React, { useMemo } from "react";

import { styled } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";

import type StaticImageData from "next/image";
import Image from "next/image";

import avatars from "@src/teamAvatars";

const themes: { [key: string]: string } = {
  rocky: "#FAFF00",
  nathan: "#559BFF",
  david: "#9967FF",
  ezequiel: "#71C562",
  declan: "#00FFFF",
  ruan: "#FFA0FB",
  dodge: "#FF3838",
  noah: "#F99F38",
};

import manifest from "@src/manifest.json";
const teamData = manifest.team as { [key: string]: any };

const Member = styled(
  ({
    memberData: { avatar, role, name, description, socials },
    ...props
  }: {
    memberData: any;
  }) => {
    return (
      <Box {...props}>
        <Box className="avatar-wrapper" sx={{ mb: 1.5 }}>
          <Image src={avatar} layout="responsive" />
        </Box>
        <Typography className="role">{role}</Typography>
        <Typography className="name">{name}</Typography>
        <Typography className="description">{description}</Typography>
      </Box>
    );
  }
)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .avatar-wrapper {
    width: clamp(125px, 40%, 300px);
    border: 3px solid ${({ memberData: { name } }) => themes[name]};
    border-radius: 50%;
    box-shadow: 0px 0px 40px 0px
      ${({ memberData: { name } }) => `${themes[name]}40`};
    * {
      border-radius: inherit;
    }
  }
  .role {
    color: ${({ memberData: { name } }) => themes[name]};
  }
  .name {
    text-transform: capitalize;
    font-size: 2em;
    font-weight: 600;
  }
  .description {
    color: rgba(138, 138, 138, 1);
  }
`;

const TeamDesc = styled((props) => {
  const members = useMemo(() => {
    return Object.keys(teamData).map((memberName: string, index: number) => {
      //TODO: Type fixes
      const memberData = {
        name: memberName,
        avatar: avatars[memberName],
        ...teamData[memberName],
      };
      return <Member memberData={memberData} key={index} />;
    });
  }, []);

  return (
    <Container maxWidth="xl" {...props}>
      {members}
    </Container>
  );
})`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 4rem;
`;

export default TeamDesc;
