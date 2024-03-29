import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ProductCard from "../Components/ProductCard";
import FilterSelect from "../Components/FilterSelect";
import { useNavigate, Link } from "react-router-dom";
import cartEmpty from "../Assets/Home/cart-empty.png";
import cartFull from "../Assets/Home/cart-full.png";

export default function Home() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Toutes les catégories");
  const [productsSelected, setProductsSelected] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const filtersByCategories = [
    "Toutes les catégories",
    "High-Tech",
    "Informatique",
  ];

  async function getProducts() {
    const productsRef = await getDocs(collection(db, "products"));
    const res = [];
    const resPrice = [];
    productsRef.forEach((product) => {
      res.push({
        id: product.id,
        ...product.data(),
      });
      resPrice.push(product.data().price);
    });
    return [res, resPrice];
  }

  async function fetchData() {
    setIsLoading(true);
    const res = await getProducts();
    setProducts([...res[0]]);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  function addProduct(product) {
    setProductsSelected([
      ...productsSelected,
      {
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
      },
    ]);
    setIsEmpty(false);
  }

  return (
    <div className="grid grid-cols-12 p-2">
      <div className="col-span-12 flex flex-row justify-between items-center gap-3 mb-5">
        <FilterSelect
          id={"categoryFillter"}
          htmlFor={"categoryFillter"}
          optionsArray={filtersByCategories}
          name={"Filtrer par catégorie: "}
          onChange={handleCategoryChange}
        />

        <div className="col-span-4 border border-solid border-black rounded-lg p-2 hover:outline hover:outline-offset-2 hover:outline-teal-500 transition-all">
          {isEmpty ? (
            <Link
              to={"/shopping-cart"}
              className="flex flex-row items-center gap-2 "
              state={{ productsSelected }}
            >
              <p>Voir mon panier</p>
              <img src={cartEmpty} alt="cart-empty" className="size-10" />
            </Link>
          ) : (
            <Link
              to={"/shopping-cart"}
              className="flex flex-row items-center gap-2 "
              state={{ productsSelected }}
            >
              <div>
                <p>Voir mon panier</p>
              </div>

              <div className="flex flex-row items-end">
                <img src={cartFull} alt="cart-full" className="size-10" />
                <p className="text-sm">x{productsSelected.length}</p>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="col-span-12 grid grid-cols-12 gap-3 mt-10">
        {products.map((product) => {
          if (category === "Toutes les catégories") {
            return (
              <ProductCard
                key={product.id}
                productName={product.name}
                productDescription={product.description}
                productPrice={product.price}
                productImage={product.image}
                onClick={() => {
                  addProduct(product);
                }}
              />
            );
          } else if (category === product.category) {
            return (
              <ProductCard
                key={product.id}
                productName={product.name}
                productDescription={product.description}
                productPrice={product.price}
                productImage={product.image}
                onClick={() => {
                  addProduct(product);
                }}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
