import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { addToLocalStorage, getFromLocalStorage, clearLocalStorage } from "../Utils/Utils";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // console.log(products);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    if (products.length) {

      const storedProductsIds = getFromLocalStorage();
      const previousCart = [];
      // console.log(storedProducts);
      for (const id in storedProductsIds) {
        console.log(id);
        const foundProduct = products.find((product) => product.id === id);
        // console.log(foundProduct);
        if (foundProduct) {
          const quantity = storedProductsIds[id];
          foundProduct.quantity = quantity;
          previousCart.push(foundProduct);
        }
      };
      setCart(previousCart);
    }
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    // console.log("Add to cart");
    let newCart = [];
    const exist = cart.find(product => product.id == selectedProduct.id);

    if (!exist) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(product => product.id !== selectedProduct.id);
      selectedProduct.quantity = selectedProduct.quantity + 1;
      newCart = [...rest, selectedProduct];
    }
    addToLocalStorage(selectedProduct.id);
    setCart(newCart);
  };

  const handleClearCart = () => {
    // console.log("Delete");
    setCart([]);
    clearLocalStorage();
  };


  /*
      const handleAdd = () => {
        localStorage.setItem("cart", JSON.stringify({ abc: 123 }));
      };
    
      const handleShow = () => {
        const item = JSON.parse(localStorage.getItem("cart"));
        console.log(item);
      };
    
      const handleRemove = () => {
        localStorage.removeItem("cart");
      };
      */

  return (
    <>
      <div className='shop'>
        <div className='products-container'>
          {products.map((product, index) => {
            return (
              <Product
                key={index}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
        <div className='cart-container'>
          <Cart
            cart={cart}
            products={products}
            handleClearCart={handleClearCart}
          />
        </div>
      </div>

      <div>
        {/*      <button onClick={handleAdd}>Add</button>
        <button onClick={handleShow}>Read/Show</button>
        <button onClick={handleRemove}>Remove</button> */}
      </div>
    </>
  );
};

export default Shop;
