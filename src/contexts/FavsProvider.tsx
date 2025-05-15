import { FC, PropsWithChildren, useState } from "react";
import { FavsContext } from "./FavsContext";

export const FavsProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [favs, setFavs] = useState<Set<string>>(new Set());

  const isFav = (login: string) => favs.has(login);
  const toogleFav = (login: string) => {
    if (isFav(login)) {
      setFavs((favs) => {
        const newFavs = new Set(favs);
        newFavs.delete(login);
        return newFavs;
      });
    } else {
      setFavs((favs) => {
        const newFavs = new Set(favs);
        newFavs.add(login);
        return newFavs;
      });
    }
  };

  return (
    <FavsContext.Provider value={{ isFav, toogleFav }}>
      {children}
    </FavsContext.Provider>
  );
};
