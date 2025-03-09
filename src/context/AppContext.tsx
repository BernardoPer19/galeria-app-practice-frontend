"use client";
import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface PropsContext {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

interface ChildrenType {
  children: ReactNode;
}

const AppContext = createContext<PropsContext | undefined>(undefined);

function AppContextProvider({ children }: ChildrenType) {
  const [search, setSearch] = useState<string>("dogs");
  const [query, setQuery] = useState<string>(search);

  const value = { query, setQuery, search, setSearch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }

  return context;
};

export default AppContextProvider;
