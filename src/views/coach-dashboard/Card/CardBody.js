import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {makeStyles} from "@mui/styles";

import styles from "assets/jss/nextjs-material-dashboard/components/cardBodyStyle.js";

export default function CardBody(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { className, children, plain, profile, ...rest } = props;

  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyProfile]: profile,
    [className]: className !== undefined,
  });

  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

CardBody.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  children: PropTypes.node,
};
