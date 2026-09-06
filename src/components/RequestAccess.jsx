import { createContext, useContext } from "react";

// RequestAccess has been removed from this site.
// This stub preserves import compatibility during refactor.
const Ctx = createContext({ open: () => {} });
export const RequestAccessProvider = ({ children }) => (
  <Ctx.Provider value={{ open: () => {} }}>{children}</Ctx.Provider>
);
export const useRequestAccess = () => useContext(Ctx);
