import { FC, PropsWithChildren } from "react";
import { FavsContext } from "../contexts/FavsContext";

export const TestFavsProvider: FC<
  PropsWithChildren<{
    isFav: jest.Mock;
    toogleFav: jest.Mock;
  }>
> = ({ isFav, children, toogleFav }) => {
  return (
    <FavsContext.Provider value={{ isFav, toogleFav }}>
      {children}
    </FavsContext.Provider>
  );
};
