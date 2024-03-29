import React, { useEffect } from "react";
import { useState } from "react";
import Button from "./ValidButton";

export default function ShoppingCartProductCard({
  product,
  productPrice,
  productName,
  productImage,
  quantity,
  setQuantity,
}) {
  const [count, setCount] = useState(1);

  function addCount() {
    setCount(count + 1);
    setQuantity([
      ...quantity,
      {
        id: product.productId,
        quantity: count + 1,
        price: product.productPrice,
      },
    ]);
  }

  function reduceCount() {
    if (count > 1) {
      setCount(count - 1);
      setQuantity([
        ...quantity,
        {
          id: product.productId,
          quantity: count + 1,
          price: -product.productPrice,
        },
      ]);
    } else {
      setCount(1);
    }
  }

  return (
    <div className="col-span-12 grid grid-cols-12 border border-solid border-black gap-2 p-2">
      <div className="col-span-6">
        <div className="">
          <img
            src={productImage}
            alt="product-image"
            className="size-40 rounded-lg"
          ></img>
        </div>

        <div>
          <p>Produit: {productName}</p>
          <p>
            Prix unitaire:{" "}
            <span className="text-xl font-semibold">{productPrice}</span>€
          </p>
        </div>
      </div>

      <div className="col-span-6">
        <div className="grid grid-cols-12 gap-2">
          <div>
            <p>Quantité</p>
          </div>
          <div className="col-span-12 grid grid-cols-12 items-center gap-2 mb-2">
            <Button text={"-"} className="col-span-2" onClick={reduceCount} />
            <div className="col-span-2 ">
              <p className="col-span-2 border border-solid border-black rounded-lg text-center p-2">
                {count}
              </p>
            </div>

            <Button text={"+"} className="col-span-2" onClick={addCount} />
          </div>
        </div>

        <div>
          Prix total pour ce produit:{" "}
          <span className="text-xl font-semibold">
            {count * product.productPrice}
          </span>
          €
        </div>
      </div>
    </div>
  );
}
