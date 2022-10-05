import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Styles from '../styles/pages/Login.module.css';

const NUMBER_SEVEN = 7;

function Login() {
  const [loginInfo, setLoginInfo] = React.useState({
    email: '',
    password: '',
    validationButton: true,
  });

  const validEmail = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

  const validateButton = () => {
    const checkEmail = validEmail(loginInfo.email);
    if (checkEmail === true && loginInfo.password.length >= NUMBER_SEVEN) {
      setLoginInfo((prevState) => ({
        ...prevState,
        validationButton: false,
      }));
    } else {
      setLoginInfo((prevState) => ({
        ...prevState,
        validationButton: true,
      }));
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    localStorage.getItem('user');
    validateButton();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginInfo.password]);

  const history = useHistory();
  const handleClick = async () => {
    localStorage.setItem('user', JSON.stringify({ email: loginInfo.email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
    history.push('/meals');
  };

  const checkDisable = loginInfo.validationButton === true;

  return (
    <div className={ Styles.containerLogin }>
      <p>Login</p>
      <input
        type="text"
        placeholder="Email"
        data-testid="email-input"
        className={ Styles.inputsEmailSenha }
        name="email"
        value={ loginInfo.email }
        onChange={ handleChange }
      />
      <input
        type="password"
        placeholder="Password"
        data-testid="password-input"
        className={ Styles.inputsEmailSenha }
        name="password"
        onChange={ handleChange }
        value={ loginInfo.password }
      />
      <section className={ Styles.containerSignup }>
        <span>Ainda não tem uma conta? </span>
        <Link to="/" className={ Styles.linkSignUp }>Cadastre-se</Link>
      </section>
      <button
        type="button"
        data-testid="login-submit-btn"
        className={ Styles.inputButtonLogin }
        onClick={ handleClick }
        disabled={ checkDisable }
      >
        Entrar

      </button>

    </div>
  );
}

export default Login;
