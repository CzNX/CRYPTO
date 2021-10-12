import { createContext, useContext, useEffect, useState } from "react";
const Crypto = createContext();

const Context = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("रू");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "PKR") setSymbol("रू");
    else setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default Context;

export const CryptoState = () => useContext(Crypto);
