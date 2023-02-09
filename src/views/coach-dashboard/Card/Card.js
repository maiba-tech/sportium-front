import React from "react";

import classNames from "classnames";

import PropTypes from "prop-types";

//import { makeStyles } from "@mui/material/styles";

// core components
import styles from "assets/jss/nextjs-material-dashboard/components/cardStyle.js";
import {makeStyles} from "@mui/styles";

export default function Card(props) {
 const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { className, children, plain, profile, chart, ...rest } = props;

  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [className]: className !== undefined,
  });

return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  chart: PropTypes.bool,
  children: PropTypes.node,
};
