import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ProductCard from "../Components/ProductCard";
import FilterSelect from "../Components/FilterSelect";
import { Link } from "react-router-dom";
import cartEmpty from "../Assets/Home/cart-empty.png";
import cartFull from "../Assets/Home/cart-full.png";
import HeroBanner from "../Components/HeroBanner";

export default function Home() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Toutes les catégories");
  const [productsSelected, setProductsSelected] = useState([]);
  const [productAddedArr, setProductAddedArr] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [searchedProductInput, setSearchedProductInput] = useState("");
  const [foundProduct, setFoundProduct] = useState("");
  const [searchedProductVisibility, setSearchedProductVisibility] =
    useState(false);

  const filtersByCategories = [
    "Toutes les catégories",
    "High-Tech",
    "Informatique",
    "Accessoire",
    "Cosmétique",
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

  function handleSearch(e) {
    setSearchedProductInput(e.target.value);
    if (e.target.value === "") {
      setSearchedProductVisibility(false);
      setFoundProduct("");
    } else {
      const filterBySearch = products.filter((product) => {
        if (
          product.name
            .toLowerCase()
            .includes(searchedProductInput.toLowerCase())
        ) {
          setSearchedProductVisibility(true);
          return product;
        }
      });
      setFoundProduct(filterBySearch);
    }
  }

  function addProduct(product) {
    const notfound = !productAddedArr.includes(product.id);
    if (notfound) {
      setProductAddedArr([...productAddedArr, product.id]);
      setProductsSelected([
        ...productsSelected,
        {
          productId: product.id,
          productName: product.name,
          productImage: product.image,
          productPrice: product.price,
        },
      ]);
      setIsEmpty(false);
    }
  }

  function deleteProduct(product) {
    const found = productAddedArr.includes(product.id);
    const newArr = [...productsSelected];
    if (found) {
      setProductAddedArr((oldArr) => {
        return oldArr.filter((el) => el !== product.id);
      });
      newArr.splice(productAddedArr.indexOf(product.id));
      setProductsSelected(newArr);
    }
  }

  return (
    <div>
      <HeroBanner />
      <div className="grid grid-cols-12 p-2">
        <div className="md:grid md:grid-cols-12 flex-col col-span-12 flex  justify-between items-center gap-3 mb-5">
          <FilterSelect
            id={"categoryFillter"}
            htmlFor={"categoryFillter"}
            optionsArray={filtersByCategories}
            name={"Filtrer par catégorie: "}
            onChange={handleCategoryChange}
          />

          <div className="w-full md:col-span-9">
            <input
              name="search-product"
              type="text"
              className="border border-solid border-black rounded-lg p-2 w-full"
              placeholder="Rechercher un produit"
              onChange={(e) => handleSearch(e)}
            ></input>
          </div>

          <div className=" border border-solid border-black rounded-lg hover:outline hover:outline-offset-2 hover:outline-teal-500 transition-all md:col-span-3 p-2 md:p-0">
            {isEmpty ? (
              <Link
                to={"/shopping-cart"}
                className="flex flex-row items-center gap-2 justify-center"
                state={{ productsSelected }}
              >
                <p>Voir mon panier</p>
                <img src={cartEmpty} alt="cart-empty" className="size-10" />
              </Link>
            ) : (
              <Link
                to={"/shopping-cart"}
                className="flex flex-row items-center gap-2 justify-center"
                state={{ productsSelected }}
              >
                <div>
                  <p>Voir mon panier</p>
                </div>

                <div className="flex flex-row items-end">
                  <img src={cartFull} alt="cart-full" className="size-10" />
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="col-span-12 grid grid-cols-12 my-10">
          {searchedProductVisibility === true ? (
            <div className="grid grid-cols-12 col-span-12 gap-1 md:gap-3">
              {foundProduct.map((foundProduct) => {
                return (
                  <ProductCard
                    key={foundProduct.id}
                    productId={foundProduct.id}
                    productName={foundProduct.name}
                    productDescription={foundProduct.description}
                    productPrice={foundProduct.price}
                    productImage={foundProduct.image}
                    productAdded={productAddedArr}
                    addProduct={() => {
                      addProduct(foundProduct);
                    }}
                    deleteProduct={() => {
                      deleteProduct(foundProduct);
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-12 col-span-12 gap-3">
              {products.map((product) => {
                if (category === "Toutes les catégories") {
                  return (
                    <ProductCard
                      key={product.id}
                      productId={product.id}
                      productName={product.name}
                      productDescription={product.description}
                      productPrice={product.price}
                      productImage={product.image}
                      productAdded={productAddedArr}
                      addProduct={() => {
                        addProduct(product);
                      }}
                      deleteProduct={() => {
                        deleteProduct(product);
                      }}
                    />
                  );
                } else if (category === product.category) {
                  return (
                    <ProductCard
                      key={product.id}
                      productId={product.id}
                      productName={product.name}
                      productDescription={product.description}
                      productPrice={product.price}
                      productImage={product.image}
                      productAdded={productAddedArr}
                      addProduct={() => {
                        addProduct(product);
                      }}
                      deleteProduct={() => {
                        deleteProduct(product);
                      }}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
