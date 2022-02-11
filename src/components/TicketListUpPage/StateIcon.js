import React from 'react';
import PropTypes from 'prop-types';
import './StateIcon.css';

export const StateIcon = ({ label, background, word, ...props }) => {
  return (
    <>
      <div className={'StateIcon'}>
        <div
          className={[
            'StateIcon-circle',
            `StateIcon-background-${background}`
          ].join(' ')}
          {...props}
        ></div>

        <div className={`StateIcon-info-${word}`}>{label}</div>
      </div>
    </>
  );
};

StateIcon.propTypes = {
  label: PropTypes.string.isRequired,
  background: PropTypes.oneOf(['green', 'red', 'blue', 'yellow']),
  word: PropTypes.oneOf(['four', 'five'])
};

StateIcon.defaultProps = {
  label: '티켓 상태',
  background: 'red',
  word: 'four'
};
