import React, { useState, useEffect, useReducer, useContext } from "react";
import Input from "../UI/input/Input";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../STORE/auth-context";
const emailReducer = (state, action) => {
  if (action.type === "User_Input") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "Input_Blur") {
    console.log(state.value);
    return { value: state, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "User_Input") {
    const value = typeof action.value === "string" ? action.value : "";
    return { value: action.value, isValid: value.trim().length > 6 };
  }
  if (action.type === "Input_Blur") {
    const value = typeof state.value === "string" ? state.value : "";
    return { value: state, isValid: value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState("");
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState("");
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const authCtx = useContext(AuthContext);
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("check validate form");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log("clear");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "User_Input", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "User_Input", value: event.target.value });

    setFormIsValid(passwordState.isValid && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "Input_Blur" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "Input_Blur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}

        />
        <Input
        id="password"
        label="password"
        type="password"
        isValid={passwordIsValid}
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}

      />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
