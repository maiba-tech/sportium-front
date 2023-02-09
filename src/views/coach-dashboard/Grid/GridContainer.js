import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";

const styles = {
  grid: {
    margin: "0 -15px !important",
    width: "unset",
  },
};

export default function GridContainer(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { children, ...rest } = props;

  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node,
};
