import React from "react";
import Water from "./water";
import Fertilize from "./fertilize";
import Repot from "./repot";

export default function AddEvent(){
    return(
        <div className="menu-bar" id="addEvent">
            <Water/>
            <Fertilize/>
            <Repot/>
        </div>
    )
}