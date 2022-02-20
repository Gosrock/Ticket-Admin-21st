import React from 'react';
import PropTypes from 'prop-types';
import './ShowTicket.css';
import { ReactComponent as GosrockLogo } from './GosrockLogo.svg';
import { ReactComponent as TicketBackgroud } from './TicketBackground.svg';
import QRCode from 'qrcode.react';

export const ShowTicket = ({
  studentId,
  accountName,
  enterState,
  QRvalue,
  ...props
}) => {
  return (
    <>
      <div className="ticket-background-wrapper">
        <TicketBackgroud
          className="ticket-background"
          // preserveAspectRatio="xMinYMin slice"
          width="100%"
          height="100%"
          viewBox="0 0"
        ></TicketBackgroud>
        <div className="ticket-box-wrapper">
          <div className="ticket-box">
            {enterState === true ? (
              <div
                className={[
                  'ticket-container',
                  `ticket-container-true`,
                  `ticket-container-true-b`
                ].join(' ')}
              >
                <QRCode
                  value={QRvalue}
                  size={173}
                  bgColor={'#ffffff'}
                  fgColor={'#000000'}
                  level={'L'}
                  includeMargin={false}
                  renderAs={'svg'}
                  style={{ zIndex: 10 }}
                />
                <div></div>
              </div>
            ) : (
              <div
                className={['ticket-container', `ticket-container-true-b`].join(
                  ' '
                )}
              >
                <QRCode
                  value={QRvalue}
                  size={173}
                  bgColor={'#ffffff'}
                  fgColor={'#000000'}
                  level={'L'}
                  includeMargin={false}
                  renderAs={'svg'}
                  style={{ zIndex: 10 }}
                />
                <div></div>
              </div>
            )}
          </div>
        </div>
        <div className="ticket-info-wrapper">
          <div className="ticket-info">
            <span
              style={{
                color: 'white',
                fontSize: '26px',
                fontWeight: '700',
                lineHeight: '31.03px',
                display: 'block'
              }}
            >
              {studentId}
            </span>
            <span
              style={{
                color: '#B6B7B8',
                fontSize: '22px',
                fontWeight: '400',
                lineHeight: '28.64px'
              }}
            >
              {accountName}
            </span>
          </div>
          <GosrockLogo className="ticket-logo" />
        </div>
      </div>
    </>
  );
};

ShowTicket.propTypes = {
  studentId: PropTypes.string,

  accountName: PropTypes.string,

  QRvalue: PropTypes.string
};

ShowTicket.defaultProps = {
  studentId: 'B711058',
  accountName: '노재탁',
  QRvalue: 'https://github.com/Gosrock'
};
