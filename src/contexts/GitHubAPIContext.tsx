import { createContext } from "react";

export type GitHubUser = {
  login: string;
  avatar_url: string;
};

export type GitHubUserDetails = GitHubUser & {
  id: number;
  name: string;
  company: string;
  location: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
};

export const GitHubAPIContext = createContext<{
  search: (term: string) => Promise<GitHubUser[]>;
  userDetail: (login: string) => Promise<GitHubUserDetails | null>;
}>({ search: async () => [], userDetail: async () => null });
