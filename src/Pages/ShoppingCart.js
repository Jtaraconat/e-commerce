import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ShoppingCartProductCard from "../Components/ShoppingCartProductCard";
import ValidButton from "../Components/ValidButton";
import InvalidButton from "../Components/InvalidButton";

export default function ShoppingCart() {
  const location = useLocation();
  const [quantity, setQuantity] = useState([]);
  const [deleted, setDeleted] = useState(false);
  let navigate = useNavigate();
  let totalPrice = 0;

  function calcTotalPrice() {
    if (quantity.length != 0) {
      quantity.map((product) => {
        totalPrice += product.price;
      });
    }
  }
  calcTotalPrice();

  useEffect(() => {}, [deleted]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function deleteProduct(product) {
    location.state.productsSelected.splice(
      location.state.productsSelected.indexOf(product.productId),
      1
    );
    setDeleted(!deleted);
  }

  return (
    <div className="p-2">
      {location.state.productsSelected.length === 0 ? (
        <div>
          <div className="mb-2 flex flex-row justify-between">
            <h1 className="text-teal-500 text-3xl">Votre panier</h1>
          </div>
          <div className="grid grid-cols-12 gap-2 my-10">
            <h2 className="col-span-12 text-center text-xl md:text-2xl">
              Votre panier est vide!
            </h2>
            <h2 className="col-span-12 text-center text-xl md:text-2xl">
              N'hésitez pas à retourner sur notre catalogue et ajouter à votre
              panier l'un de nos supers produits
            </h2>
          </div>
          <div className="col-span-6 flex justify-start mt-10">
            <InvalidButton
              text={"Vers le catalogue"}
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      ) : location.state.productsSelected.length !== 0 ? (
        <div>
          <div className="mb-2 flex flex-row justify-between">
            <h1 className="text-teal-500 text-3xl">Votre panier</h1>
            <InvalidButton
              text={"Vider le panier"}
              onClick={() => {
                location.state.productsSelected.splice(
                  0,
                  location.state.productsSelected.length
                );
                setDeleted(!deleted);
              }}
            />
          </div>
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
                  deleteProduct={() => deleteProduct(product)}
                />
              );
            })}

            <div className="col-span-12 my-10 flex flex-col justify-between">
              <div className="mb-5">
                <p className="text-xl text-center md:text-3xl">
                  Montant total de la commande: {totalPrice}€
                </p>
              </div>

              <div className="flex flex-row gap-5 md:justify-between">
                <div>
                  <Link to={"/"}>
                    <InvalidButton
                      text={"Continuer vos achats"}
                      onClick={() => navigate("/")}
                    />
                  </Link>
                </div>
                <div>
                  <ValidButton text={"Procéder au paiement"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
