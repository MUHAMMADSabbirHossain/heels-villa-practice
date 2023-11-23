const getFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("shopping_cart"));
};

console.log(getFromLocalStorage());

const addToLocalStorage = (id) => {
    console.log("Added to local storage.");

    const exist = getFromLocalStorage();
    console.log(exist);
    let shoppingCart = {};

    if (!exist) {
        shoppingCart[id] = 1;
    } else {
        shoppingCart = exist;

        if (shoppingCart[id]) {
            const newCount = shoppingCart[id] + 1;
            shoppingCart[id] = newCount;
        } else {
            shoppingCart[id] = 1;
        }
    }


    localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
};
const clearLocalStorage = () => {
    localStorage.removeItem("shopping_cart");
}
export { addToLocalStorage, getFromLocalStorage, clearLocalStorage };