import React from "react";

import classNames from "classnames";

import PropTypes from "prop-types";

import {makeStyles} from "@mui/styles";

import styles from "assets/jss/nextjs-material-dashboard/components/cardAvatarStyle.js";

export default function CardAvatar(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { children, className, plain, profile, ...rest } = props;

  const cardAvatarClasses = classNames({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
    [className]: className !== undefined,
  });

return (
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  );
}

CardAvatar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  profile: PropTypes.bool,
  plain: PropTypes.bool,
};
