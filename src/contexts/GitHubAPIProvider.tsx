import { FC, PropsWithChildren } from "react";
import {
  GitHubAPIContext,
  GitHubUser,
  GitHubUserDetails,
} from "./GitHubAPIContext";

const GITHUB_API_BASEURL = "https://api.github.com";

export const GitHubAPIProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const search = async (term: string) => {
    try {
      if (term.trim().length) {
        const res = await fetch(`${GITHUB_API_BASEURL}/search/users?q=${term}`);
        if (!res.ok) throw Error(res.statusText);
        const data = await res.json();
        return data.items as GitHubUser[];
      } else {
        const res = await fetch(`${GITHUB_API_BASEURL}/users`);
        if (!res.ok) throw Error(res.statusText);
        const data = await res.json();
        return data as GitHubUser[];
      }
    } catch (error) {
      console.log(`Error while fetching users... ${error}`);
      return [] as GitHubUser[];
    }
  };

  const userDetail = async (login: string) => {
    try {
      const res = await fetch(`${GITHUB_API_BASEURL}/users/${login}`);
      if (!res.ok) throw Error(res.statusText);
      return (await res.json()) as GitHubUserDetails;
    } catch (error) {
      console.log(`Error while fetching user details... ${error}`);
      return null;
    }
  };

  return (
    <GitHubAPIContext.Provider value={{ search, userDetail }}>
      {children}
    </GitHubAPIContext.Provider>
  );
};
