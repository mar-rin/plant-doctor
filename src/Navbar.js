import React from "react";
import { useNavigate} from "react-router-dom";

export default function Navbar(){

    const navigate = useNavigate();

    return(
        <div className="menu-bar">
            <button className="menu-button" onClick={()=>{navigate("/")}}>
                HOME
            </button>
            <button className="menu-button" onClick={()=>{navigate("/my-plants")}}>
                MY PLANTS
            </button>
            <button className="menu-button" onClick={()=>{navigate("/shop")}}>
                SHOP
            </button>
        </div>
    )
}
