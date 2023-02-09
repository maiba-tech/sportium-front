import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {makeStyles} from "@mui/styles";
import styles from "assets/jss/nextjs-material-dashboard/components/cardIconStyle.js";

export default function CardIcon(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { className, children, color, ...rest } = props;

  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + "CardHeader"]]: color,
    [className]: className !== undefined,
  });

return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}

CardIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
    "dark",
  ]),
  children: PropTypes.node,
};
