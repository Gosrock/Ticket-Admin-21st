import React, { useEffect } from 'react';
import history from '../../config/history';
import { useDispatch } from 'react-redux';
import { logout } from '../../state/actions-creators';

function LogoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    history.push('/login');
    dispatch(logout());
  }, [dispatch]);

  return <div></div>;
}

export default LogoutPage;
