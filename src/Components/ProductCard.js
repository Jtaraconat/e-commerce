import React from "react";
import { useState } from "react";
import ValidButton from "./ValidButton";
import InvalidButton from "./InvalidButton";

export default function ProductCard({
  productName,
  productDescription,
  productPrice,
  productImage,
  onClick,
  onClickDetails,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="col-span-4 shadow shadow-slate-300 shadow-lg rounded-lg">
      <div className=" flex flex-col items-center ">
        <img
          src={productImage}
          alt="product-image"
          className="size-52 rounded-lg"
        ></img>
        <p className="text-center text-xl font-semibold mb-3">{productName}</p>
      </div>

      <div className="grid grid-cols-12 items-center my-5">
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
                <p className="line-clamp-3 transition-all">
                  {productDescription}{" "}
                </p>
                <ValidButton
                  text={"Voir les détails"}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 p-2">
        <div className="col-span-6">
          <p>
            <span className="text-2xl">{productPrice}</span>€
          </p>
        </div>

        <div className="col-span-6 flex justify-center">
          <ValidButton onClick={onClick} text={"Ajouter au panier"} />
        </div>
      </div>
    </div>
  );
}
