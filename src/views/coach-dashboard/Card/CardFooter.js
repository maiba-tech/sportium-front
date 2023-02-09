import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {makeStyles} from "@mui/styles";

// core components
import styles from "assets/jss/nextjs-material-dashboard/components/cardFooterStyle.js";

export default function CardFooter(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { className, children, plain, profile, stats, chart, ...rest } = props;

  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart,
    [className]: className !== undefined,
  });

return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
}

CardFooter.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  stats: PropTypes.bool,
  chart: PropTypes.bool,
  children: PropTypes.node,
};
