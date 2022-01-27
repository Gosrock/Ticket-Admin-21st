import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AdminTemplate = ({ children }) => {
  return (
    <div className="admin Homepage">
      <Link to="/login">Login하기</Link>
      {children}
    </div>
  );
};
export default AdminTemplate;
