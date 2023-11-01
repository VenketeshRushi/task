import {
  ADD_TO_CART_SUCCESS,
  GET_DATA_ERROR,
  GET_DATA_LOADING,
  GET_DATA_SUCCESS,
  REMOVE_FROM_CART,
  ORDER_SUCCESS,
  GET_SEARCH_DATA_SUCCESS,
  GET_SEARCH_DATA_REMOVED,
} from "./actionTypes";
import axios from "axios";
import { carttotal, handlecartduplicate } from "../../Utils/getcartsummary";

//Action Functions

export const getdata = (pageno) => async (dispatch) => {
  try {
    dispatch({ type: GET_DATA_LOADING });
    const res = await axios.get("/allproducts", {
      params: {
        page: pageno,
      },
    });

    let { products, page, totalpages } = res.data;
    dispatch({
      type: GET_DATA_SUCCESS,
      payload: { products, page, totalpages },
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_DATA_ERROR });
  }
};

export const addToCart = (operation, data, toast) => (dispatch) => {
  let cartData = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartData = handlecartduplicate(cartData, data, operation);
  console.log("cartData", cartData);

  localStorage.setItem("cartItems", JSON.stringify(cartData));

  let ordersummarydata = carttotal(cartData);
  localStorage.setItem("ordersummry", JSON.stringify(ordersummarydata));

  dispatch({
    type: ADD_TO_CART_SUCCESS,
    payload: { cartData, ordersummarydata },
  });

  if (operation === "add") {
    toast({
      title: "Item added to the cart",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  } else if (operation === "reduce") {
    toast({
      title: "Item quantity reduced",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  }
};

export const removeFromCart = (index, toast) => (dispatch) => {
  const cartData = JSON.parse(localStorage.getItem("cartItems"));
  cartData.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartData));

  let ordersummarydata = carttotal(cartData);
  localStorage.setItem("ordersummry", JSON.stringify(ordersummarydata));
  dispatch({ type: REMOVE_FROM_CART, payload: { index, ordersummarydata } });
  toast({
    title: "Item removed from the cart",
    status: "success",
    duration: 2000,
    isClosable: true,
    position: "top",
  });
};

export const orderSuccess = () => (dispatch) => {
  dispatch({
    type: ORDER_SUCCESS,
  });
};

export const getSearchedProductsAction = (data) => (dispatch) => {
  dispatch({
    type: GET_SEARCH_DATA_SUCCESS,
    payload: data,
  });
};

export const removeSearchedProductsAction = () => (dispatch) => {
  dispatch({
    type: GET_SEARCH_DATA_REMOVED,
  });
};
