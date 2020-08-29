import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IAuthProvider } from "./context/auth";

interface PrivateRouteProps {
  component: React.ComponentType;
  context: IAuthProvider;
  path: string;
}

function PrivateRoute(props: PrivateRouteProps) {
  const { component: Component, context } = props;

  return (
    <Route
      path={props.path}
      exact={true}
      render={(rest: any) =>
        context.isAuthenticated ? (
          <Component {...rest} context={context} />
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
}

export default PrivateRoute;
