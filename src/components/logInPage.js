import fullLogo from "../images/fullLogo.png";
import React from "react";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";

export default function LogInPage() {
    return (
        <div className='App'>
            <img src={fullLogo} alt="Logo" className="mainLogo"/>
            <SignIn />
            <h1 align="center" >
                <b> or </b>
            </h1>
            <SignUp />
        </div>
    );
}