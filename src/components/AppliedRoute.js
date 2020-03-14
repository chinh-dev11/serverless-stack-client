import React from "react";
import { Route } from "react-router-dom";

/**
 * - A prop called component that represents the component that will be rendered when a matching route is found.
 * - A render method in place of the component. This allows us to control what is passed in to our component.
 * - Returns a Route that takes a component and appProps prop. This allows us to pass in the component we want rendered and the props that we want applied.
 */
export default function AppliedRoute({ component: C, appProps, ...rest }) {
  return (
    <Route {...rest} render={props => <C {...props} {...appProps} />} />
  );
}