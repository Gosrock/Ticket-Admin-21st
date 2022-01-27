import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from './AuthForm';
import { check } from '../../modules/user';
import { withNavigation } from '../../hoc/withRouterForClass';
import { useNavigate } from 'react-router-dom';
import history from '../../history';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user
  }));
  const navigate = useNavigate();

  //인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value
      })
    );
  };

  //폼 등록 이벤트 핸들러

  const onSubmit = e => {
    //e.preventDefault();
    const { username, password, passwordConfirm } = form;

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' })
      );
      return;
    }
    dispatch(register({ username, password }));
  };

  //컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정입니다.');
        return;
      }
      setError('회원가입 실패');
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      console.log('check API 성공');
      console.log(user);
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStarage is not working');
      }
    }
  }, [navigate, user]);

  return (
    <div>
      <AuthForm
        type="register"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </div>
  );
};

export default withNavigation(RegisterForm);
