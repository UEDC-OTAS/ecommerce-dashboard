// OrderContext.js
import { createContext, useState } from "react";

export const NumberContext = createContext();

export function NumberProvider({ children }) {
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  return (
    <NumberContext.Provider
      value={{ newOrderCount, setNewOrderCount, messageCount, setMessageCount }}
    >
      {children}
    </NumberContext.Provider>
  );
}
