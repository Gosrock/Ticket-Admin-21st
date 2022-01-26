import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './AuthForm.css';

const textMap = {
  login: '관리자 로그인',
  register: '관리자 회원가입'
};

const AuthForm = ({ type, form, onChange, onSubmit }) => {
  console.log(type);
  const text = textMap[type];
  console.log([text]);

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
        onSubmit={onSubmit}
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
            name="username"
            placeholder="email"
            onChange={onChange}
            value={form.username}
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
            name="password"
            placeholder="Password"
            type="password"
            onChange={onChange}
            value={form.password}
          />
        </Form.Item>

        {type === 'register' && (
          <Form.Item
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: '비밀번호를 한번 더 입력해주세요'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              name="passwordConfirm"
              type="password"
              placeholder="Password check"
              onChange={onChange}
              value={form.passwordConfirm}
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
