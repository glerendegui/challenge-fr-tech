import { createContext } from "react";

export const FavsContext = createContext<{
  isFav: (login: string) => boolean;
  toogleFav: (login: string) => void;
}>({ isFav: () => false, toogleFav: () => null });
