import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/components/typographyStyle.js";

export default function Warning(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { children } = props;

  return (
    <div className={classes.defaultFontStyle + " " + classes.warningText}>
      {children}
    </div>
  );
}

Warning.propTypes = {
  children: PropTypes.node,
};
