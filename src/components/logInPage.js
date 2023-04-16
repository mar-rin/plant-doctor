// import React from "react";
// import SignUp from "./signUp";
// import SignIn from "./signIn";
//
// export default function LogInPage({ handleLogIn, handleSignUp }) {
//     return (
//         <div className='sign-container'>
//             <SignIn
//                 handleLogIn={handleLogIn}
//             />
//             <h1 align="center" >
//                 <b> or </b>
//             </h1>
//             <SignUp
//                 handleSignUp={handleSignUp}
//             />
//         </div>
//     );
// }
import React from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";

export default function LogInPage({ handleLogIn, handleSignUp }) {
    return (
        <div className='sign-container'>
            <div style={{
                backgroundColor: 'white',
                width: '500px',
                height: '930px',
                margin: 'auto',}}>
                <SignIn
                    handleLogIn={handleLogIn}
                />
                <h1 align="center">
                    <b> or </b>
                </h1>
                <SignUp
                    handleSignUp={handleSignUp}
                />
            </div>
        </div>
    );
}

