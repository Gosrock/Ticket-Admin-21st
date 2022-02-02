import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const requireAuth =
  (Component, role) =>
  ({ ...props }) => {
    const { authenticated } = useSelector(state => state.auth);
    let navigate = useNavigate();

    console.log('엔터', authenticated, !authenticated);

    useEffect(() => {
      if (role === 'authRequired') {
        if (authenticated == null) {
          console.log('로그인이 필요한 창인경우 로그인 창으로 ', authenticated);
          navigate('/login');
        }
      }

      if (role === 'authenticated') {
        if (authenticated) {
          console.log(
            '로그인 되있는 경우 로그인 회원가입에 못들어가게끔.',
            authenticated
          );
          navigate('/');
        }
      }
    }, [navigate, authenticated]);

    return <Component {...props} />;
  };

export default requireAuth;
