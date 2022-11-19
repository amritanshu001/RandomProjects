import classes from "./Auth.module.css";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import useInputValidator from "../hooks/useInputValidator";

const emailValidity = (email) => {
  return String(email).length > 0 && String(email).includes("@");
};

const passwordValidity = (password) => {
  return password.length >= 8;
};

const Auth = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loginDispatcher = useDispatch();

  const {
    value: enteredEmail,
    inputIsValid: emailIsValid,
    isError: emailIsError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
  } = useInputValidator(emailValidity);

  const {
    value: enteredPassword,
    inputIsValid: passwordIsValid,
    isError: passwordIsError,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
  } = useInputValidator(passwordValidity);

  let formIsValid = emailIsValid && passwordIsValid;

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    loginDispatcher(authActions.logIn());
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={formSubmissionHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onBlur={emailBlurHandler}
              onChange={emailChangeHandler}
              className={!emailIsError ? classes.error : ""}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onBlur={passwordBlurHandler}
              onChange={passwordChangeHandler}
              className={!passwordIsError ? classes.error : ""}
            />
          </div>
          <button type="submit" disabled={!formIsValid}>
            Login
          </button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
