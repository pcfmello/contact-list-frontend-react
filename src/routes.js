import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./Auth";
import { Register, Login } from "./components/authentication";
import { List, Add, Update, Remove } from "./components/contact";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        //   Prop state garante ao usuário que ele não perca seu histórico de rotas
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  /* BrowserRouter dá a habilidade de se trabalhar com o 
  navigation state do browser que é entender a URL e conseguir
  manipulá-la. */
  <BrowserRouter>
    {/* Switch do BrowserRouter faz com que duas rotas com o mesmo 
        nome abra apenas a primeira que encontrar.
        Switch padrão abriria os dois componentes. */}
    <Switch>
      {/* Exact faz com que a rota seja exatamente a passada para o path.
        "/app" seria apenas /app e não /app/dashboard etc. */}
      <Route exact path="/" component={() => <Login />} />
      <Route exact path="/register" component={() => <Register />} />
      <PrivateRoute exact path="/contacts" component={List} />
      <PrivateRoute exact path="/contacts/add" component={Add} />
      <PrivateRoute exact path="/contacts/update" component={Update} />
      <PrivateRoute exact path="/contacts/remove" component={Remove} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
