import {
  Box,
  Flex,
  Image,
  Text,
  Grid,
  Button,
  useToast,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import Summary from "../Components/Summary";
import {
  addToCart,
  orderSuccess,
  removeFromCart,
} from "../Redux/products/actions";
import { useNavigate } from "react-router-dom";
function Cart() {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.productReducer.cartItems);
  const ordersummry = useSelector((state) => state.productReducer.ordersummry);

  // This Function Is For Removing Product From Cart;
  const handleRemoveItem = (index) => {
    dispatch(removeFromCart(index, toast));
  };

  function handlecart() {
    dispatch(orderSuccess());
    navigate("/");
    toast({
      title: "Order Placed Successfully",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  }
  return (
    <Box
      display={"grid"}
      gap={["40px", "40px", "40px", "5%", "5%"]}
      my={["0px", "3px", "5px", "30px", "30px", "30px"]}
      mx={"auto"}
      p={"20px"}
      gridTemplateColumns={["100%", "100%", "100%", "65% 30%", "65% 30%"]}
    >
      <Grid
        gap={[2, 4]}
        p={["10px", "10px", "20px", "20px", "20px"]}
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
        ]}
      >
        {cartItems.length > 0 && cartItems ? (
          <>
            {cartItems?.map((product, index) => (
              <Flex
                flexDirection={"column"}
                cursor="pointer"
                mb={"10px"}
                key={product._id}
              >
                <Box
                  width={"100%"}
                  height={"150px"}
                  overflow={"hidden"}
                  borderRadius="8px"
                >
                  {product.ImageSrc && product.ImageSrc !== "" ? (
                    <Image
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      src={product.ImageSrc}
                      alt={product.Title}
                      transition="transform 0.2s ease-in-out"
                      _hover={{
                        transform: "scale(0.75)",
                      }}
                    />
                  ) : (
                    <Image
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      src="http://cdn.shopify.com/s/files/1/0028/4062/products/DB212_Fishnet_Hand_Glove2PS.jpg?1257429506"
                      alt="Dummy Image"
                      transition="transform 0.2s ease-out-in"
                      _hover={{
                        transform: "scale(0.75)",
                      }}
                    />
                  )}
                </Box>

                <Box mt={2}>
                  <Text
                    fontSize={["13px", "15px", "17px", "17px", "18px"]}
                    fontWeight={600}
                  >
                    {product.Title === "" ? "NA" : product.Title.slice(0, 20)}
                  </Text>
                  <Text
                    fontSize={["12px", "12px", "13px", "16px", "17px"]}
                    color={"gray"}
                  >
                    {product.Body === "" ? "NA" : product.Body.slice(0, 20)}
                  </Text>
                  <Text
                    fontSize={["15px", "20px", "17px", "20px", "20px"]}
                    fontWeight={600}
                    my={"6px"}
                  >
                    ₹
                    {product.VariantPrice === "" || product.VariantPrice === 0
                      ? 0
                      : product.VariantPrice}
                    .00
                  </Text>
                </Box>
                <VStack>
                  <Button
                    bgColor={"transparent"}
                    color={"black"}
                    variant={"outline"}
                    border="2px solid black"
                    borderRadius={"25px"}
                    _hover={{
                      bgColor: "blue",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => handleRemoveItem(index)}
                    width="100%"
                  >
                    Remove
                  </Button>
                </VStack>
              </Flex>
            ))}
          </>
        ) : (
          <Box>
            <Text fontSize={"20px"} fontWeight={500} textAlign={"center"}>
              Cart Is Empty!
            </Text>
          </Box>
        )}
      </Grid>
      <Summary {...ordersummry} name={"Checkout"} onClick={handlecart} />
    </Box>
  );
}
export default Cart;
