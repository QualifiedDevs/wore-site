import React, { useMemo } from "react";

import { styled } from "@mui/material/styles";
import { Box, Container, Typography, IconButton } from "@mui/material";

import type StaticImageData from "next/image";
import Image from "next/image";
import teamMap from "@public/team-map.jpg";
import podcast from "@public/podcast.png";

import avatars from "@src/teamAvatars";

import TwitterIcon from "@src/vector-graphics/socials/twitter";
import LinkedinIcon from "@src/vector-graphics/socials/linkedin";

const themes: { [key: string]: string } = {
  rocky: "#FAFF00",
  nathan: "#559BFF",
  david: "#9967FF",
  ezequiel: "#71C562",
  declan: "#00FFFF",
  ruan: "#FFA0FB",
  dodge: "#FF3838",
  noah: "#F99F38",
  ross: "#2f3dff",
  nina: "#ffffff",
  steve: "#00740f",
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
        <Box className="title">
          <Typography className="name">{name}</Typography>
          {socials.twitter && (
            <IconButton href={socials.twitter}>
              <TwitterIcon />
            </IconButton>
          )}
          {socials.linkedin && (
            <IconButton href={socials.linkedin}>
              <LinkedinIcon />
            </IconButton>
          )}
          {socials.podcast && (
            <IconButton href={socials.podcast}>
              <Box className="podcast-wrapper">
                <Image src={podcast} />
              </Box>
            </IconButton>
          )}
        </Box>
        {/* <Typography className="description">{description}</Typography> */}
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
    border: 3px solid ${({ memberData: { key } }) => themes[key]};
    border-radius: 50%;
    box-shadow: 0px 0px 40px 0px
      ${({ memberData: { key } }) => `${themes[key]}40`};
    * {
      border-radius: inherit;
    }
  }
  .role {
    font-size: 0.8em;
    color: ${({ memberData: { key } }) => themes[key]};
  }
  .title {
    display: flex;
    align-items: center;
    .name {
      text-transform: capitalize;
      font-size: 1em;
      font-weight: 500;
      margin-right: 0.2em;
      white-space: nowrap;
    }
    .MuiIconButton-root {
      svg {
        width: 1.1rem;
        height: 1.1rem;
      }
      color: #0099ff;
    }
  }
  .description {
    color: rgba(138, 138, 138, 1);
  }

  .podcast-wrapper {
    position: relative;
    display: grid;
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const Team = styled((props: { id: string }) => {
  const members = useMemo(() => {
    return Object.keys(teamData).map((key: string, index: number) => {
      //TODO: Type fixes
      if (key === "steve") return;
      const memberData = {
        key,
        avatar: avatars[key],
        ...teamData[key],
      };
      return <Member memberData={memberData} key={index} />;
    });
  }, []);

  return (
    <Box {...props}>
      <Typography variant="h3" sx={{ mb: 12 }}>
        The W.O.R.E. Team
      </Typography>
      <Container maxWidth="xl" className="members" sx={{ mb: 12 }}>
        {members}
      </Container>
      {/* <Container className="team-map">
        <Box className="image-wrapper">
          <Image src={teamMap} layout="responsive" />
        </Box>
      </Container> */}
    </Box>
  );
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100%;

  .members {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 4rem;
  }

  .team-map {
    width: 100%;
  }

  .image-wrapper {
    * {
      border-radius: 8px;
    }
  }

  ${({ theme }) => theme.breakpoints.down("lg")} {
    .members {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    .members {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    .members {
      grid-template-columns: 1fr;
    }
    .image-wrapper {
      width: 100%;
      * {
        border-radius: 0;
      }
    }
  }
`;

export default Team;
