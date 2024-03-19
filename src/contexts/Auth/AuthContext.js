import { createContext } from "react";

export const AuthContext = createContext({
    company: null,
    signin: async (id, hash) => false,
});