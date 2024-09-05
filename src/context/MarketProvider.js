'use client';
import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "../Common/themes";
import axios from "axios";
import toast from "react-hot-toast";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import Cookies from "js-cookie";

export const MarketContext = createContext({});
export const MarketUpdateContext = createContext({});

export const GlobalMarketProvider = ({ children }) => {
  const user = useContext(CurrentUserContext);
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  // const [carts, setCarts] = useState([]);

  const theme = themes[selectedTheme];

  // Set up Axios to include refresh token in the headers
  axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('refreshToken') || ''}`;

  // const allProducts = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.get("/api/market/products");
  //     console.log("pro:", res.data);
      
  //     if (Array.isArray(res.data)) {
  //        const sorted = res.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  //        setProducts(sorted);
  //     } else {
  //       console.error("Expected an array but got:", typeof res.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to fetch products");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const allCollections = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/market/collections");
      console.log("coll:", res.data);
      
      if (Array.isArray(res.data)) {
         const sorted = res.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
         setCollections(sorted);
      } else {
        console.error("Expected an array but got:", typeof res.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch collections");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    allProducts(); 
    allCollections();
    // if (user) allCarts();
  }, [user]);

  return (
    <MarketContext.Provider
      value={{
        theme,
        products,
        // collections,
        // carts,
        isLoading,
        allProducts,
        allCollections,
        // allCarts,
      }}
    >
      <MarketUpdateContext.Provider value={{}}>
        {children}
      </MarketUpdateContext.Provider>
    </MarketContext.Provider>
  );
};

export const useMarketState = () => useContext(MarketContext);
export const useMarketUpdate = () => useContext(MarketUpdateContext);
