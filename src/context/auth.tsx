import React, { Component } from "react";
import jwt_decode from "jwt-decode";

export interface IAuthProvider {
  isAuthenticated: boolean;
  userName: string;
  login: (token: string, userName) => void;
  logout: () => void;
}

interface withAuthContextProps {
  context: IAuthProvider;
}

type AuthState = { isAuthenticated: boolean; userName: string };

export const AuthContext = React.createContext<IAuthProvider>({
  isAuthenticated: false,
  userName: "",
  login: (token: string, userName: string) => null,
  logout: () => null
});

/*=============== Auth Provider =====================*/
export default class AuthProvider extends Component<{}, AuthState> {
  constructor(props: {}) {
    super(props);
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    if (token && userName && this.checkTokenValidity(token))
      this.state = { isAuthenticated: true, userName };
    else {
      this.state = { isAuthenticated: false, userName: "" };
      if (localStorage.getItem("token")) localStorage.removeItem("token");
      if (localStorage.getItem("userName")) localStorage.removeItem("userName");
    }
  }

  checkTokenValidity(token: string) {
    const decoded: any = jwt_decode(token);
    const valid = decoded.exp > Date.now() / 1000;
    if (valid) return true;
    return false;
  }

  login = (token: string, userName: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    this.setState({ isAuthenticated: true, userName });
  };

  logout = () => {
    if (this.state.isAuthenticated)
      this.setState({ isAuthenticated: false, userName: "" });
    if (localStorage.getItem("token")) localStorage.removeItem("token");
    if (localStorage.getItem("userName")) localStorage.removeItem("userName");
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          userName: this.state.userName,
          isAuthenticated: this.state.isAuthenticated,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

/*================ Auth HOC =======================*/
export function withAuth<P extends withAuthContextProps>(
  Component: React.ComponentType<P>
) {
  return function WithAuthComponent(
    props: Pick<P, Exclude<keyof P, keyof withAuthContextProps>>
  ) {
    return (
      <AuthContext.Consumer>
        {context => <Component {...(props as P)} context={context} />}
      </AuthContext.Consumer>
    );
  };
}
