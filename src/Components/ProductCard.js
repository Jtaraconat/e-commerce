import React from "react";
import { useState } from "react";
import ValidButton from "./ValidButton";
import InvalidButton from "./InvalidButton";

export default function ProductCard({
  productId,
  productName,
  productDescription,
  productPrice,
  productImage,
  addProduct,
  deleteProduct,
  productAdded,
}) {
  const [isOpen, setIsOpen] = useState(false);
  let displayedButton;

  const addProductButton = (
    <ValidButton text={"Ajouter"} onClick={addProduct} />
  );

  const deleteProductButton = (
    <InvalidButton text={"Retirer"} onClick={deleteProduct} />
  );

  if (productAdded === undefined) {
    return null;
  } else if (productAdded.includes(productId)) {
    displayedButton = deleteProductButton;
  } else {
    displayedButton = addProductButton;
  }

  return (
    <div className="col-span-6 md:col-span-4 shadow shadow-slate-300 shadow-lg rounded-lg flex flex-col justify-between">
      <div className=" flex flex-col items-center mt-3 p-2">
        <img
          src={productImage}
          alt="product-image"
          className="size-40 md:size-52 rounded-lg"
        ></img>
        <p className="text-center text-lg md:text-xl font-semibold mb-3 p-2">
          {productName}
        </p>
      </div>

      <div className="grid grid-cols-12 items-center mb-3 md:my-5">
        <div className="text-center col-span-12 p-2">
          <div>
            {isOpen ? (
              <div>
                <p>{productDescription} </p>
                <InvalidButton
                  text={"Fermer les détails"}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
            ) : (
              <div>
                <p className="line-clamp-3 transition-all md:text-base text-sm">
                  {productDescription}{" "}
                </p>
                <ValidButton
                  text={"Voir plus"}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 p-2 items-center">
        <div className="col-span-6">
          <p>
            <span className="text-2xl">{productPrice}</span>€
          </p>
        </div>

        <div className="col-span-6 flex justify-center">{displayedButton}</div>
      </div>
    </div>
  );
}
