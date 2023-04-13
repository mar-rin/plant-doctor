import React from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";

export default function LogInPage({ handleLogIn, handleSignUp }) {
    return (
        <div className='sign-container'>
            <SignIn
                handleLogIn={handleLogIn}
            />
            <h1 align="center" >
                <b> or </b>
            </h1>
            <SignUp
                handleSignUp={handleSignUp}
            />
        </div>
    );
}