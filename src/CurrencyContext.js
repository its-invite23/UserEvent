import React, { createContext, useState } from "react";
import Listing from "./Api/Listing";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [currencyRate, setCurrencyRate] = useState(1);

  const CurrencyRateUpdate = async(value) => 
    {
      try{

        const main= new Listing();
        const res=await main.getCurrencyRate(value);
        if(res && res?.data && res?.data?.data){
          setCurrencyRate(res?.data?.data);
        }
        else{
          setCurrencyRate(1);
        }
      }
      catch(error){
        console.log("error in api rate getting",error);
        setCurrencyRate(1);
      }
    }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencyRate, setCurrencyRate, CurrencyRateUpdate }}>
      {children}
    </CurrencyContext.Provider>
  );
};
