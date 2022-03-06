import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import "../../Assets/DetailProduct.css";
import DetailProductsIcons from "../../Assets/DetailsProductsIcons";
import ButtonFilter from "../../Components/ButtonFilter";
import { NavBarChef } from "../../Components/NavBarWaiter";
import ActionButton from "../../Components/ActionButton";
import { useCart } from "../../Components/Context/CartContext";
import { useNavigate } from "react-router-dom";

const DetailProduct = () => {
  const { cart, setCart, idDetail, setIdDetail } = useCart();
  let navigate = useNavigate();
  const [size, setSize] = useState("12 portions");
  const [cost, setCost] = useState(0);
  const [observation, setObservation] = useState("");
  const [count, setCount] = useState(1);
  let location = useLocation();
  const { state } = location;
  const [prueba2, setPrueba2] = useState(state.product_cost[cost]);
  console.log(size);
  console.log(cost);
  console.log(location.state);

  const exist = cart.find((x) => x.idChanges);

  const updateProduct = () => {
    console.log(exist);
    if (exist) {
      console.log("claro que existe este producto por su id");
      setCart(
        cart.map((x) =>
          x.id === state.id
            ? {
                ...exist,
                qty: count,
                size: size,
                observation: observation,
                idChanges: uuidv4(),
              }
            : x
        )
      );
    }
  };

  const handleCart = () => {
    console.log("entre a handlecart");

    setIdDetail(idDetail + 1);
    setCart((cart) => [
      ...cart,
      {
        ...state,
        // unitCost: prueba2,
        unitCost: state.product_cost[cost],
        totalCost: state.product_cost[cost] * count,
        qty: count,
        size: size,
        observation: observation,
        idChanges: uuidv4(),
      },
    ]);

    setIdDetail(idDetail + 1);
    navigate("order-cart");
  };

  const CounterHorizontal = () => {
    return (
      <>
        <div className="counter-content">
          <button
            className="counter-button"
            onClick={() => (count <= 1 ? setCount(1) : setCount(count - 1))}
          >
            -
          </button>
          <p>{count}</p>
          <button
            className="counter-button"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className="image-content"
        style={{ backgroundImage: `url(${state.product_photo[1]})` }}
      >
        <NavBarChef />

        <div className="info-product-container">
          <div className="info-product-subcontainer">
            <h1 className="product--name">{state.product_name}</h1>
            <h2 className="product--description">
              {state.product_description}
            </h2>
            <h2 className="product--cost">
              Unit Price: $ {state.product_cost[cost]}
            </h2>
          </div>
        </div>
        {/* white container */}
        <div className="white-container">
          <div>
            <p className="size-title">Choice Size</p>
            <div className="products-detail-container">
              {state.product_options.map((op, i) => {
                return (
                  <ButtonFilter
                    item={op}
                    icon={DetailProductsIcons[i]}
                    key={op}
                    onClick={() => {
                      setSize(op);
                      setCost(i);
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="observation-content">
            <p className="observation-title">Observations</p>
            <textarea
              className="text-area-observations"
              type="text"
              onChange={(ev) => setObservation(ev.target.value)}
            ></textarea>
          </div>
          <div className="price-content">
            <h3>Total Cost</h3>
            <h3 className="price-total-cost">
              $ {state.product_cost[cost] * count}
            </h3>
          </div>

          {/* section buttons */}
          <div className="buttons-container">
            <CounterHorizontal />
            <div className="large-button--content" onClick={handleCart}>
              <ActionButton title="Add to Cart" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
