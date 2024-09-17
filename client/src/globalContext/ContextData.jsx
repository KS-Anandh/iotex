import { createContext, useState } from "react";

const GlobalContext = createContext();

const ContextData = ({ children }) => {
  const [navState, setNavState] = useState(0);
  let [data, setData] = useState([
    {
      room: "KITCHEN",
      device: "LED",
      status: true,
      level: 5,
      category: 1,
    },
    {
      room: "HALL",
      device: "LED",
      status: false,
      category: 2,
      level: 5,
    },
    {
      room: "KITCHEN",
      device: "FAN",
      status: true,
      category: 1,
      level: 5,
    },
    {
      room: "KITCHEN",
      device: "LED",
      status: false,
      category: 3,
      level: 5,
    },
    {
      room: "HALL",
      device: "LED",
      status: false,
      category: 2,
      level: 5,
    },
    {
      room: "KITCHEN",
      device: "FAN",
      status: false,
      category: 3,
      level: 5,
    },
    {
      room: "TV Room",
      device: "Fridge",
      status: true,
      category: 4,
      level: 4,
    },
  ]);

  return (
    <GlobalContext.Provider value={{ navState, setNavState, data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { ContextData, GlobalContext };
