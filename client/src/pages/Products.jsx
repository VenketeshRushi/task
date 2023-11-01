import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Grid,
  Button,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { addToCart, getdata } from "../Redux/products/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Components/Loding";
import { Error } from "../Components/Error";

function Products() {
  const dispatch = useDispatch();
  const toast = useToast();

  const { products, isLoading, isError, page, totalpages, searchedProducts } =
    useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(getdata(page));
  }, []);

  function handleAddToCart(product) {
    let data = {
      _id: product._id,
      Handle: product.Handle,
      Title: product.Title,
      Body: product.Body,
      Vendor: product.Vendor,
      Type: product.Type,
      Tags: product.Tags,
      Option1Name: product.Option1Name,
      Option1Value: product.Option1Value,
      VariantSKU: product.VariantSKU,
      VariantGrams: product.VariantGrams,
      VariantInventoryTracker: product.VariantInventoryTracker,
      VariantInventoryQty: product.VariantInventoryQty,
      VariantInventoryPolicy: product.VariantInventoryPolicy,
      VariantFulfillmentService: product.VariantFulfillmentService,
      VariantPrice: product.VariantPrice,
      ImageSrc: product.ImageSrc,
      quantity: 1,
    };
    dispatch(addToCart("add", data, toast));
  }

  return (
    <Box>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        <>
          {searchedProducts.length > 0 ? (
            <>
              <Grid
                gap={[2, 4]}
                p={["10px", "10px", "20px", "20px", "20px"]}
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(3, 1fr)",
                  "repeat(4, 1fr)",
                ]}
              >
                {searchedProducts?.map((product, index) => (
                  <Flex
                    flexDirection={"column"}
                    cursor="pointer"
                    mb={"10px"}
                    key={product.Handle + index}
                    boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
                    p={5}
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
                        {product.Title === ""
                          ? "NA"
                          : product.Title.slice(0, 20)}
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
                        {product.VariantPrice === "" ||
                        product.VariantPrice === 0
                          ? 0
                          : product.VariantPrice}
                        .00
                      </Text>
                    </Box>
                    <Button
                      bgColor={"black"}
                      color={"white"}
                      _hover={{
                        bgColor: "blue",
                      }}
                      borderColor={"transparent"}
                      onClick={() => handleAddToCart(product)}
                      height={"50px"}
                      width={"100%"}
                      borderRadius="8px"
                    >
                      Add to Cart
                    </Button>
                  </Flex>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Grid
                gap={[2, 4]}
                p={["10px", "10px", "20px", "20px", "20px"]}
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(3, 1fr)",
                  "repeat(4, 1fr)",
                ]}
              >
                {products?.map((product, index) => (
                  <Flex
                    flexDirection={"column"}
                    cursor="pointer"
                    mb={"10px"}
                    key={product.Handle + index}
                    boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
                    p={5}
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
                        {product.Title === ""
                          ? "NA"
                          : product.Title.slice(0, 20)}
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
                        {product.VariantPrice === "" ||
                        product.VariantPrice === 0
                          ? 0
                          : product.VariantPrice}
                        .00
                      </Text>
                    </Box>
                    <Button
                      bgColor={"black"}
                      color={"white"}
                      _hover={{
                        bgColor: "blue",
                      }}
                      borderColor={"transparent"}
                      onClick={() => handleAddToCart(product)}
                      height={"50px"}
                      width={"100%"}
                      borderRadius="8px"
                    >
                      Add to Cart
                    </Button>
                  </Flex>
                ))}
              </Grid>
              <Stack pt={4} pb={2}>
                <Stack maxWidth={"max-content"} m={"auto"} direction={"row"}>
                  {" "}
                  <Button
                    variant="outline"
                    fontWeight={"bold"}
                    _hover={{
                      border: "2px solid",
                    }}
                    isDisabled={+page === 1}
                    onClick={() => dispatch(getdata(page - 1))}
                  >
                    Prev
                  </Button>
                  <Button
                    variant="outline"
                    fontWeight={"bold"}
                    _hover={{
                      border: "2px solid",
                    }}
                  >
                    {page}
                  </Button>
                  <Button
                    variant="outline"
                    fontWeight={"bold"}
                    _hover={{
                      border: "2px solid",
                    }}
                    isDisabled={+page == +totalpages}
                    onClick={() => dispatch(getdata(page + 1))}
                  >
                    Next
                  </Button>
                </Stack>
              </Stack>
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default Products;
