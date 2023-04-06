import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CartItem({ cName, cPrice, deleteItem, id }) {
    return (
        <div className="cart-item" id={id}>
            <div className="prod-price">
                <div className="prod"> {cName} </div>
                <div className="price">
                    € {cPrice} <br />
                    <div id={id} onClick={deleteItem}>
                        <object>
                            <FontAwesomeIcon icon={faTrash} size="1x" className="trash-bin" />
                        </object>
                    </div>
                </div>
            </div>
            <div className="delete"></div>
        </div>
    );
}

export default CartItem;
