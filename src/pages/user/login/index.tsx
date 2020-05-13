import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link, connect, Dispatch } from 'umi';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import LoginForm from './components/Login';

import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;
interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="Inicio de session">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="账户或密码错误（admin/ant.design）" />
          )}

          <UserName
            name="userName"
            placeholder="User3433"
            rules={[
              {
                required: true,
                message: 'ingreso de forma Exitoza.!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="*******"
            rules={[
              {
                required: true,
                message: 'password correcto！',
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="Crear Cuenta">
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content="NumeroTelefono" />
          )}
          <Mobile
            name="mobile"
            placeholder="Numero de el mobil"
            rules={[
              {
                required: true,
                message: 'Valor correcto！',
              },
              {
                pattern: /^1\d{10}$/,
                message: 'incorrecto！',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="no eres un robot"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="Vali"
            rules={[
              {
                required: true,
                message: 'Gracias！',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            Guardar clave.
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            Recuperar clave.
          </a>
        </div>
        <Submit loading={submitting}>Ingresar</Submit>
        <div className={styles.other}>
          Nombre usuario
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
            Enviar
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
