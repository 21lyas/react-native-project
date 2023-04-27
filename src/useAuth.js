import { useContext } from "react";
import { AuthContext } from "../App";

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
