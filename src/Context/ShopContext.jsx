import React, {useEffect,useReducer,useState,useCallback,useMemo} from "react";
import axios from "axios";
import CartReducer from "./CartReducer";

export const ShopContext = React.createContext(null);

function ShopContextProvider({ children }) {
  const [all_product, setAllProduct] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [cart, dispatch] = useReducer(
    CartReducer,
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  useEffect(() => {
    axios
      .get("http://localhost:3001/all_products")
      .then((res) => setAllProduct(res.data))
      .catch((err) => console.error("Fetch products failed:", err));
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setWishlist([]);
      setOrderProducts([]);
      return;
    }

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/users/${currentUser.id}`
        );
        setWishlist(data.wishlist || []);
        setOrderProducts(data.order_products || []);
      } catch (err) {
        console.error("Fetch user data failed:", err);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const toggleWishlist = useCallback(
    async (product) => {
      if (!currentUser) return;
      const exists = wishlist.some((item) => item.id === product.id);
      const updated = exists
        ? wishlist.filter((item) => item.id !== product.id)
        : [...wishlist, product];
      setWishlist(updated);
      await axios.patch(`http://localhost:3001/users/${currentUser.id}`, {
        wishlist: updated,
      });
    },
    [wishlist, currentUser]
  );

  const removeFromWishlist = useCallback(
    async (id) => {
      const updated = wishlist.filter((item) => item.id !== id);
      setWishlist(updated);
      if (currentUser) {
        await axios.patch(`http://localhost:3001/users/${currentUser.id}`, {
          wishlist: updated,
        });
      }
    },
    [wishlist, currentUser]
  );

  const saveOrderToDB = useCallback(
    async (newItems) => {
      if (!currentUser || newItems.length === 0) return;
      try {
        const { data } = await axios.get(
          `http://localhost:3001/users/${currentUser.id}`
        );
        const updatedOrders = [...(data.order_products || []), ...newItems];
        await axios.patch(`http://localhost:3001/users/${currentUser.id}`, {
          order_products: updatedOrders,
        });
        setOrderProducts(updatedOrders);
      } catch (err) {
        console.error("Save order failed:", err);
      }
    },
    [currentUser]
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const wishlistItems = useMemo(() => wishlist.map((p) => p.id), [wishlist]);

  const contextValue = useMemo(
    () => ({
      all_product,
      cart,
      dispatch,
      wishlist,
      wishlistItems,
      setWishlist,
      toggleWishlist,
      removeFromWishlist,
      orderProducts,
      setOrderProducts,
      saveOrderToDB,
      currentUser,
      setCurrentUser,
    }),
    [
      all_product,
      cart,
      wishlist,
      wishlistItems,
      orderProducts,
      currentUser,
      toggleWishlist,
      removeFromWishlist,
      saveOrderToDB,
    ]
  );

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
