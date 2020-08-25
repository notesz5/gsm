import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AuthProvider, { withAuth } from "./context/auth";

import Login from "./components/login";
import PageLayout from "./components/pageLayout";
import Phones from "./views/phones";
import Partners from "./views/partners";
import PrivateRoute from "./privateRoute";

const App: React.FC = () => {
  const RouteWithAuth = withAuth(PrivateRoute);

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <PageLayout>
            <RouteWithAuth path="/phones" component={Phones} />
            <RouteWithAuth path="/partners" component={Partners} />
          </PageLayout>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
