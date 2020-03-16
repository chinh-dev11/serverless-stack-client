import React from "react";
import { Route, Redirect } from "react-router-dom";

function querystring(name, url = window.location.href) {
    // console.log('name',name); // redirect
    // console.log('url',url); // http://localhost:3000/login?redirect=/notes/da9388a0-6783-11ea-acff-633a5811b4d1
    name = name.replace(/[[]]/g, "\\$&");
    // console.log('name',name); // redirect

    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
    // console.log('regex',regex); // /[?&]redirect(=([^&#]*)|&|#|$)/i
    const results = regex.exec(url);
    // console.log('results',results);
    /*
    0: "?redirect=/notes/new"
    1: "=/notes/new"
    2: "/notes/new"
    */

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return "";
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Routes:
 *  - /login
 *  - /signup
 * 
 * Logging user in and redirect to home or else if redirect param exists
 */
export default function UnauthenticatedRoute({ component: C, appProps, ...rest }) {
    // console.log('appProps',appProps);
    /*
    isAuthenticated: true
    userHasAuthenticated: ƒ ()
    */
    // console.log('{...rest}',{...rest});
    /*
    path: "/login"
    exact: true
    location: {pathname: "/login", search: "?redirect=/notes/da9388a0-6783-11ea-acff-633a5811b4d1", hash: "", state: undefined, key: "lp67xm"}
    computedMatch: {path: "/login", url: "/login", isExact: true, params: {…}}
    */ 
   const redirect = querystring("redirect");
   // console.log('redirect',redirect);
   /*
        - '' (empty) or null or
        - '/notes/new'
   */
    return (
        <Route
        {...rest}
        render={props =>
            !appProps.isAuthenticated
            ? <C {...props} {...appProps} />
            : <Redirect
                to={redirect === "" || redirect === null ? "/" : redirect}
                />}
        />
    );
}
