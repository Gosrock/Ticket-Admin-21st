import './InformBox.css';
import styled from 'styled-components';
import Column from 'antd/lib/table/Column';

export const InformBox = ({ data, title, ...props }) => {
  return (
    <div
      className="InformBox"
      style={{
        marginRight: '20px',
        float: 'left',
        marginBottom: '20px'
      }}
    >
      <div>
        <div className="text1">{title}</div>

        <div className="text2"> {data}</div>
      </div>
    </div>
  );
};
