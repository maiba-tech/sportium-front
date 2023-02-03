import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import React from "react";

const House = ({ img, price, designation, athlete, coach, capacité }) => {
  const HouseBox = styled(Box)(({ theme }) => ({
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    maxWidth: 350,
    backgroundColor: "#fff",
    margin: theme.spacing(0, 2, 0, 2),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  const InfoBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }));

  const ImgContainer = styled(Box)(() => ({
    width: "100%",
  }));

  return (
    <HouseBox>
      <ImgContainer>
        <img src={img} alt="housePhoto" style={{ maxWidth: "100%" }} />
      </ImgContainer>

      <Box sx={{ padding: "1rem" }}>
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          ${price}
        </Typography>
        <Typography variant="body2" sx={{ my: 2 }}>
          {designation}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <InfoBox>
            <img src='/media/bd.png' alt="bd" />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {athlete}
            </Typography>
          </InfoBox>

          <InfoBox>
            <img src='/media/be.png' alt="bathroomssIcon" />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {coach}
            </Typography>
          </InfoBox>

          <InfoBox>
            <img src='/media/sp.png' alt="sp" />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {capacité}
            </Typography>
          </InfoBox>
        </Box>
      </Box>
    </HouseBox>
  );
};

export default House;
