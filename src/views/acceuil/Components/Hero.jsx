import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
import CustomButton from "./CustomButton";

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
      <Container>
        <Navbar />
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to sportium platform
            </Typography>
            {/* <Title variant="h1" sx={{ fontSize: "18px"}}>
              Discover a platform where you'll love to be a good athlete.
            </Title> */}
            <Typography
              variant="body2"
              sx={{ fontSize: "54px",
              color: "#000336",
              fontWeight: "bold" }}
            >
              Discover a platform where you'll love to be a good athlete. 
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              be among the first to register on our site 
            </Typography>
            <CustomButton
              backgroundColor="#4909de"
              color="#fff"
              buttonText="More About Us"
              heroBtn={true}
            />
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src='/media/M22.jpg'
              alt="/media/M22.jpg"
              style={{ maxWidth: "120%", marginBottom: "2rem" }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
