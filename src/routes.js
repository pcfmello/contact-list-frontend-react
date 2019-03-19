import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./Auth";
import { Signup, Signin } from "./components/authentication";
import { List, Details, Add, Update, Remove } from "./components/contact";
import Template from "../src/components/template";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Template>
          <Component {...props} />
        </Template>
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
      <Route exact path="/" component={() => <Signin />} />
      <Route exact path="/signup" component={() => <Signup />} />
      <PrivateRoute exact path="/contacts" component={List} />
      <PrivateRoute exact path="/contacts/add" component={Add} />
      <PrivateRoute exact path="/contacts/:id" component={Details} />
      <PrivateRoute exact path="/contacts/:id/update" component={Update} />
      <PrivateRoute exact path="/contacts/:id/delete" component={Remove} />
      <Route path="*" component={() => <h1>Page not found!</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
