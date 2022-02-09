import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../state/actions-creators';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './RegisterPage.css';
import { initializeForm } from '../../state/actions-creators/login';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { errorMessage, pending } = useSelector(state => state.auth);
  const [initialValue, setInitialvalue] = useState({});
  const [form] = Form.useForm();
  const onSubmitHandler = values => {
    // event.preventDefault();
    const { Id, name, gosrockCode, password, passwordConfirm } = values;
    console.log(password, passwordConfirm);
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      console.log(values);
      form.resetFields(['password', 'passwordConfirm']);
      console.log('비밀번호불일치 initialize');
      return;
    }
    let body = {
      userId: values.Id,
      password: values.password,
      name: values.name,
      gosrockCode: values.gosrockCode
    };
    console.log(body);

    // register 요청
    dispatch(register(body));
  };

  useEffect(() => {
    if (errorMessage) {
      console.log(errorMessage);
      if (errorMessage === '중복가입') {
        setError('중복가입입니다.');
        form.resetFields(['Id', 'name']);
        return;
      }
      if (errorMessage === '코드오류') {
        setError('고스락 인증 코드가 다릅니다.');
        form.resetFields(['gosrockCode']);
        return;
      }
    }
  }, [form, errorMessage]);

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
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={initialValue}
        onFinish={onSubmitHandler}
      >
        <h2> 관리자 회원가입</h2>
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
        <Form.Item
          name="passwordConfirm"
          rules={[
            {
              required: true,
              message: '비밀번호를 한번 더 입력해 주세요'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="passwordConfirm"
          />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: '이름을 입력해 주세요'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="name"
          />
        </Form.Item>

        <Form.Item
          name="gosrockCode"
          rules={[
            {
              required: true,
              message: '고스락코드를 입력해주세요'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="gosrockCode"
          />
        </Form.Item>
        {
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              color: 'red'
            }}
          >
            {error}
          </div>
        }
        <Form.Item>
          <Button
            style={{ float: 'right' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            회원가입{' '}
          </Button>
        </Form.Item>
      </Form>

      <Form
        style={{
          alignItems: 'center',
          color: 'gray'
        }}
      >
        <Link to="/login" className="Footer">
          로그인
        </Link>
      </Form>
    </div>
  );
}

export default RegisterPage;
