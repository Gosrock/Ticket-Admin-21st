import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state/storeSetting';
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter
} from 'react-router-dom';
import MainLandingPage from './components/MainLandingPage/MainLandingPage';
import LoginPage from './components/AuthPage/LoginPage';
import requireAuth from './hoc/requireAuth';
import history from './config/history';
import RegisterPage from './components/AuthPage/RegisterPage';
// antd css file
import 'antd/dist/antd.min.css';
import './config/axiosInstance';

// hoc로 감싸기 위해서는 한번이렇게 hoc에서 리턴받아서 돔에 집어넣어야함
const MainLandingPageWithLogin = requireAuth(MainLandingPage, 'authRequired');
const LoginPageWithAuthenticated = requireAuth(LoginPage, 'authenticated');
const RegisterPageWithAuthenticated = requireAuth(
  RegisterPage,
  'authenticated'
);
ReactDOM.render(
  <HistoryRouter history={history}>
    <Provider store={store}>
      <Routes>
        <Route
          exact
          path="/register"
          element={<RegisterPageWithAuthenticated />}
        />
        <Route exact path="/login" element={<LoginPageWithAuthenticated />} />
        <Route path="/*" element={<MainLandingPageWithLogin />} />
      </Routes>
    </Provider>
  </HistoryRouter>,
  document.getElementById('root')
);
