import { Box, Container, Typography } from "@mui/material";
import styled from "@emotion/styled";
import React from "react";
import House from "./House";
import { properties } from "../../../register-data/properties";

const Properties = () => {
  const PropertiesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const PropertiesTextBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  }));

  return (
    <Box sx={{ mt: 5, backgroundColor: "#F5FAFE", py: 10 }}>
      <Container>
        <PropertiesTextBox>
          <Typography
            sx={{ color: "#000339", fontSize: "35px", fontWeight: "bold" }}
          >
            Our Programmes
          </Typography>
          <Typography sx={{ color: "#5A6473", fontSize: "16px", mt: 1 }}>
            Everything you need to know our programmes and the coach in this programmes!
          </Typography>
        </PropertiesTextBox>

        <PropertiesBox>
          {properties.map((property) => (
            <House
              key={property.id}
              img={property.img}
              price={property.price}
              designation={property.designation}
              athlete={property.athlete}
              coach={property.coach}
              capacité={property.capacité}
            />
          ))}
        </PropertiesBox>
      </Container>
    </Box>
  );
};

export default Properties;
