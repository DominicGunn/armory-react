// @flow

import React from 'react';
import cx from 'classnames';
import styles from './styles.less';

type Props = {
  className?: string,
};

const ArmoryBadge = ({ className }: Props) => (
  <div className={cx(styles.root, className)}>
    <a href="https://gw2armory.com">Powered by gw2armory.com &#9829;</a>
  </div>
);

export default ArmoryBadge;
