import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeForm, login } from '../../state/actions-creators';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './loginpage.css';

function LoginPage(props) {
  const dispatch = useDispatch();

  const { errorMessage, pending } = useSelector(state => state.auth);

  const onSubmitHandler = values => {
    // event.preventDefault();
    let body = {
      userId: values.Id,
      password: values.password
    };
    console.log(body);

    // login 요청
    dispatch(login(body));
  };

  useEffect(() => {
    console.log(errorMessage);
    /*if (errorMessage && !pending) {
      alert('로그인실패');
    }*/
  }, [errorMessage, pending]);

  useEffect(() => {
    dispatch(initializeForm());
  }, [dispatch]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        flexDirection: 'column'
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={onSubmitHandler}
      >
        <h2> 관리자 로그인</h2>
        <Form.Item
          name="Id"
          rules={[
            {
              required: true,
              message: '아이디를 입력해 주세요'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Id"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해주세요'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ float: 'right' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            로그인{' '}
          </Button>
        </Form.Item>
      </Form>

      <Form
        style={{
          alignItems: 'center',
          color: 'gray'
        }}
      >
        <Link to="/register" className="Footer">
          회원가입
        </Link>
      </Form>
    </div>
  );
}

export default LoginPage;
