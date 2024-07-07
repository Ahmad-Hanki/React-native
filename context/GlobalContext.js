import { createContext } from "react";


export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);