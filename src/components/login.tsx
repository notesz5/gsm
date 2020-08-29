import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { withAuth, IAuthProvider } from "../context/auth";
import { TextField } from "formik-material-ui";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import CircularProgress from "@material-ui/core/CircularProgress";
import * as H from "history";

import "../styles/login.scss";

interface LogInProps {
  context: IAuthProvider;
  history: H.History;
  location: H.Location;
  match: {};
  staticContext: undefined;
}

interface State {
  isLoading: boolean;
  showPassword: boolean;
  authFailed: boolean;
  errorMsg: String;
}

const validationSchema = Yup.object().shape({
  user: Yup.string()
    .label("Username")
    .required("Please enter a registered username!"),
  password: Yup.string()
    .label("Password")
    .required("Password is required for authentication!")
});

function logInRequestBuilder(username: string, password: string) {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  return {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData.toString()
  };
}

function Login(props: LogInProps) {
  const [stateValues, setStateValues] = useState<State>({
    isLoading: false,
    showPassword: false,
    authFailed: false,
    errorMsg: ""
  });

  const handleClickShowPassword = () => {
    setStateValues({ ...stateValues, showPassword: !stateValues.showPassword });
  };

  const auth = (username: string, password: string) => {
    const url = process.env.REACT_APP_LOGIN_URL || "";

    setStateValues({ ...stateValues, isLoading: true });

    fetch(url, logInRequestBuilder(username, password))
      .then(resp => resp.json())
      .then(json => {
        if (json.token) {
          setTimeout(() => {
            setStateValues({
              ...stateValues,
              isLoading: false,
              authFailed: false,
              errorMsg: ""
            });
            props.history.push("/phones");
          }, 1500);

          props.context.login(json.token, json.userName);
        } else {
          setTimeout(() => {
            setStateValues({
              ...stateValues,
              authFailed: true,
              errorMsg: json.message,
              isLoading: false
            });
          }, 1500);
        }
      })
      .catch(() =>
        setStateValues({
          ...stateValues,
          isLoading: false,
          authFailed: true,
          errorMsg: "Can't connect to database."
        })
      );
  };

  return (
    <Formik
      initialValues={{ user: "", password: "" }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        auth(values.user, values.password);
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <>
          <Container className="container">
            <Paper className="paper">
              <Form className="form">
                <h1 className="signIn">Sign in</h1>
                {stateValues.authFailed && (
                  <h3 className="errorMessage">{stateValues.errorMsg}</h3>
                )}
                <Field
                  className="textfield"
                  variant="outlined"
                  margin="normal"
                  name="user"
                  label="Username"
                  component={TextField}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle className="icon" />
                      </InputAdornment>
                    )
                  }}
                />
                <Field
                  className="textfield"
                  variant="outlined"
                  margin="normal"
                  type={stateValues.showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  component={TextField}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock className="icon" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disableRipple
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {stateValues.showPassword ? (
                            <Visibility className="showPasswordIcon" />
                          ) : (
                            <VisibilityOff className="showPasswordIcon" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <IconButton
                  type="submit"
                  disabled={!isValid || isSubmitting || stateValues.isLoading || !dirty}
                  disableRipple
                  className="loginButton"
                >
                  {stateValues.isLoading ? (
                    <CircularProgress size={30} className="circularProgress" />
                  ) : (
                    <ArrowForwardIcon className="buttonIcon" />
                  )}
                </IconButton>
              </Form>
            </Paper>
          </Container>
        </>
      )}
    </Formik>
  );
}

export default withAuth(Login);
