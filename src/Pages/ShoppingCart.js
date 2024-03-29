import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShoppingCartProductCard from "../Components/ShoppingCartProductCard";
import ValidButton from "../Components/ValidButton";
import InvalidButton from "../Components/InvalidButton";

export default function ShoppingCart() {
  let navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState([]);

  let totalPrice = 0;
  console.log(location.state.productsSelected);

  function calcTotalPrice() {
    if (quantity.length != 0) {
      quantity.map((product) => {
        totalPrice += product.price;
        console.log(totalPrice);
      });
    }
  }
  calcTotalPrice();

  return (
    <div className="p-2">
      <div className="mb-2">
        <h1 className="text-teal-500 text-3xl">Votre panier</h1>
      </div>

      {location.state.productsSelected.length === 0 ? (
        <div>
          <div className="grid grid-cols-12 gap-2 my-10">
            <h2 className="col-span-12 text-center text-2xl">
              Votre panier est vide!
            </h2>
            <h2 className="col-span-12 text-center text-2xl">
              N'hésitez pas à retourner sur notre catalogue et ajouter à votre
              panier l'un de nos supers produits
            </h2>
          </div>
          <div className="col-span-6 flex justify-start mt-10">
            <InvalidButton
              text={"Vers le catalogue"}
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-12 gap-2">
            {location.state.productsSelected.map((product) => {
              totalPrice += product.productPrice;
              return (
                <ShoppingCartProductCard
                  product={product}
                  key={product.productId}
                  productPrice={product.productPrice}
                  productImage={product.productImage}
                  productName={product.productName}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              );
            })}
          </div>

          <div className="my-10 flex flex-row justify-between">
            <div className="col-span-6 flex justify-end">
              <InvalidButton
                text={"Continuer vos achats"}
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>

            <div className="col-span-6">
              <p className="text-3xl">
                Montant total de la commande: {totalPrice}€
              </p>
            </div>

            <div className="col-span-6 flex justify-end">
              <ValidButton text={"Procéder au paiement"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
