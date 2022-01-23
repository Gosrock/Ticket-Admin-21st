import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../actions/auth';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './AuthForm.css';

const textMap = {
  login: '관리자 로그인',
  register: '관리자 회원가입'
};

const AuthForm = ({ type }) => {
  const text = textMap[type];
  console.log([text]);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { authenticated, errorMessage, pending } = useSelector(
    state => state.auth
  );

  const onSubmitHandler = values => {
    // event.preventDefault();
    let body = {
      userId: values.email,
      password: values.password
    };
    console.log(body);

    // login 요청
    dispatch(login(body)).then(res => {
      console.log(authenticated, errorMessage, pending, res);

      if (!errorMessage) {
        navigate('/');
      } else {
        alert(errorMessage);
      }
    });
  };

  const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
      color: gray;
      text-decoration: underline;
      &:hover {
        color: gray;
      }
    }
  `;
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
        <h2>{text}</h2>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: '아이디를 입력해 주세요'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>

        <Form.Item
          name="password1"
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

        {type === 'register' && (
          <Form.Item
            name="password2"
            rules={[
              {
                required: true,
                message: '비밀번호를 한번 더 입력해주세요'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password check"
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            style={{ float: 'right' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {type}
            {'  '}
          </Button>
        </Form.Item>
      </Form>
      <Footer>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </div>
  );
};

export default AuthForm;
