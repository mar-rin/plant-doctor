import fullLogo from "../images/fullLogo.png";
import React from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";

export default function LogInPage() {
    return (
        <div className='App'>
                       <SignIn />
            <h1 align="center" >
                <b> or </b>
            </h1>
            <SignUp />
        </div>
    );
}