import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * Routes:
 *  - /notes/new
 *  - /notes/:id
 *  - settings
 * 
 * Direct access to authenticated routes without authenticated
 *  - redirect to login; 
 *  - pass in the current path, which will be used later to redirect back after the user logs in
 */
export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
    // console.log('appProps',appProps);
    /*
    isAuthenticated: true
    userHasAuthenticated: ƒ ()
    */
    // console.log('{...rest}',{...rest});
    /**
    path: "/login"
    exact: true
    location: {pathname: "/login", search: "?redirect=/notes/da9388a0-6783-11ea-acff-633a5811b4d1", hash: "", state: undefined, key: "lp67xm"}
    computedMatch: {path: "/login", url: "/login", isExact: true, params: {…}}
    */    
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated
          ? <C {...props} {...appProps} />
          : <Redirect
              to={`/login?redirect=${props.location.pathname}${props.location
                .search}`}
            />}
    />
  );
}