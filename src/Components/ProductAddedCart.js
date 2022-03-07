import React, { useReducer, useState, useEffect } from "react";
import "../Assets/ProductAddedCart.css";
import { ReactComponent as More } from "../Assets/icons/more.svg";
import { ReactComponent as Eye } from "../Assets/icons/eye.svg";
import { ReactComponent as Pencil } from "../Assets/icons/pencil.svg";
import { useCart } from "../Components/Context/CartContext";
// import TableRow from "@mui/material/TableRow";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return state.count <= 1 ? { count: 1 } : { count: state.count - 1 };
    default:
      return state;
  }
};

export function ProductAddedCart({ cartProduct }) {
  const [state, dispatch] = useReducer(cartReducer, { count: cartProduct.qty });
  const [obs, setObs] = useState(false);
  // const [size, setSize] = useState("");
  const { cart, setCart } = useCart();

  // console.log("A VER PRUEBA PORTONS, ", cartProduct.size.split(" ")[0]);
  // console.log("A VER PRUEBA OBSERVACION, ", obs);
  // if (cartProduct.size) {
  // if (!cartProduct.size.some((option) => option === null)) {
  // setSize(cartProduct.size);
  // }

  const increment = () => {
    dispatch({ type: "increment" });
    // debugger;
    setCart(
      cart.map((x) =>
        x.idChanges === cartProduct.idChanges
          ? {
              ...x,
              qty: state.count + 1,
              totalCost: cartProduct.unitCost * state.count,
              // totalCost: cartProduct.unitCost * (state.count + 1),
            }
          : x
      )
    );
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
    setCart(
      cart.map((x) =>
        x.idChanges === cartProduct.idChanges
          ? {
              ...x,
              qty: state.count - 1,
              totalCost: cartProduct.unitCost * state.count,
            }
          : x
      )
    );
  };

  const HandleRemoveFromCart = () => {
    const exist = cart.find((x) => x.idChanges);
    if (exist) {
      setCart(cart.filter((x) => x.idChanges !== cartProduct.idChanges));
    }
  };

  return (
    <div className="productAdded-card">
      <div className="productAdded-card--photoContainer">
        <img
          src={cartProduct.product_photo[0]}
          className="productAdded-image"
          alt="productAdded.name"
        />
      </div>
      <div className="productAdded-card--textContainer">
        <div className="productAdded-card--text">
          <div className="productAdded-card--title">
            <h2 className="productAdded-card--productName">
              {cartProduct.product_name}
            </h2>
            <h3 className="productAdded-card--options">
              {/* {size && `${cartProduct.size.split(" ")[0]} pts`} */}
              {cartProduct.size && `${cartProduct.size.split(" ")[0]} pts`}
              {/* {cartProduct.size && cartProduct.size.split(" ")[0]} pts */}
            </h3>
          </div>
          <p className="productAdded-card--descr">
            {cartProduct.product_description}
          </p>
          <div className="productAdded-card--pinkContainer">
            <h3 className="productAdded-card--cost-dinamic">
              $ {cartProduct.unitCost * state.count}
            </h3>
            {cartProduct.observation && (
              <Eye
                fill="#fff"
                width={30}
                className="product-card--eye"
                // onMouseEnter={setObs(true)}
                // onMouseLeave={setObs(false)}
                onClick={() => setObs(!obs)}
              />
            )}

            {obs && (
              <div className="productAdded-card--obsContainer">
                <p className="productAdded-card--obsText">
                  {cartProduct.observation}
                </p>
              </div>
              // <div className="productAdded-card--obsContainer">
              //   <textarea
              //     className="productAdded-card--obsText"
              //     value={cartProduct.observation}
              //   ></textarea>
              // </div>
            )}
            {/* <div className="productAdded-card--obsContainer">
              <textarea
                className="productAdded-card--obsText"
                value={cartProduct.observation}
              ></textarea>
            </div> */}
          </div>
        </div>
        <div className="productAdded-card--buttonContainer">
          <div className="productAdded-card--buttonContainer">
            <div className="productAdded-card--button-counter">
              <button
                className="productAdded-card--buttonCounter"
                onClick={increment}
              >
                +
              </button>
              <p>{state.count}</p>
              <button
                className="productAdded-card--buttonCounter"
                onClick={decrement}
              >
                -
              </button>
            </div>
          </div>

          <div className="productAdded-card--buttonsRightContainer">
            <div className="productAdded-card--pencilContainer">
              <Pencil
                className="productAdded-card--pencil"
                width={30}
                height={30}
              />
            </div>
            <div
              className="productAdded-card--button"
              onClick={HandleRemoveFromCart}
            >
              {<More width={15} height={15} className="productAdded--x-icon" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAddedCart;
