import { Center, Box, Input, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getSearchedProductsAction,
  getdata,
  removeSearchedProductsAction,
} from "../Redux/products/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

function Navbar() {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    let timeoutId;

    if (search === "") {
      dispatch(removeSearchedProductsAction());
      dispatch(getdata(1));
      return;
    }

    const debounceSearch = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(getSearchedProducts, 500);
    };

    debounceSearch();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  async function getSearchedProducts() {
    try {
      let response = await axios.post("/allproducts/search", {
        searchinput: search,
      });
      let data = response.data.products;
      if (data.length === 0) {
        setSearch("");
        toast({
          title: "Products Not Found!",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } else {
        dispatch(getSearchedProductsAction(data));
      }
    } catch (error) {
      setSearch("");
      console.log("error", error);
      dispatch(removeSearchedProductsAction());
      dispatch(getdata(1));
    }
  }
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-around"}
      mb={10}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Center
          cursor={"pointer"}
          paddingX={["2px", "5px", "10px", "15px"]}
          _hover={{
            borderBottom: `2px solid black`,
          }}
          border={"none"}
        >
          <Link to={"/"}>Products</Link>
        </Center>
        <Center
          cursor={"pointer"}
          paddingX={["2px", "5px", "10px", "15px"]}
          _hover={{
            borderBottom: `2px solid black`,
          }}
          border={"none"}
        >
          <Link to={"/cart"}>Cart</Link>
        </Center>
      </Box>
      {location.pathname === "/" && (
        <Box>
          <Input
            border={"1px solid black"}
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      )}
    </Box>
  );
}
export default Navbar;
