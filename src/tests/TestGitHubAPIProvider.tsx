import { FC, PropsWithChildren } from "react";
import { GitHubAPIContext } from "../contexts/GitHubAPIContext";

export const TestGitHubAPIProvider: FC<
  PropsWithChildren<{ search?: jest.Mock; userDetail?: jest.Mock }>
> = ({ children, search = jest.fn(), userDetail = jest.fn() } = {}) => {
  return (
    <GitHubAPIContext.Provider value={{ search, userDetail }}>
      {children}
    </GitHubAPIContext.Provider>
  );
};
