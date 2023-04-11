import React from "react";
import NavBar from "./navBar";
import CalendarMain from "./calendarMain";
import AddEvent from "./addEvent";

export default function Home(){
    return(
        <div>
            <CalendarMain />
            <AddEvent/>
        </div>
    )
}