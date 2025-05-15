import { fireEvent, render, screen } from "@testing-library/react-native";
import { GitHubAPIProvider } from "./GitHubAPIProvider";
import { Text } from "react-native";
import { FC, useContext } from "react";
import { GitHubAPIContext } from "./GitHubAPIContext";

const GitHubAPIProviderUse: FC<{ searchTerm?: string; userLogin?: string }> = ({
  searchTerm = "default-search",
  userLogin = "default-userlogin",
} = {}) => {
  const { search, userDetail } = useContext(GitHubAPIContext);
  return (
    <>
      <Text onPress={() => search(searchTerm)}>SEARCH</Text>
      <Text onPress={() => userDetail(userLogin)}>USERDETAIL</Text>
    </>
  );
};

describe("GitHubAPIProvider", () => {
  describe("search", () => {
    it("should fetch from /users when search term is empty", () => {
      jest
        .spyOn(global, "fetch")
        // @ts-ignore
        .mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
      render(
        <GitHubAPIProvider>
          <GitHubAPIProviderUse searchTerm="" />
        </GitHubAPIProvider>
      );
      fireEvent.press(screen.getByText("SEARCH"));
      expect(fetch).toHaveBeenCalledWith("https://api.github.com/users");
    });

    it("should search /search/users when a term is provided", () => {
      jest
        .spyOn(global, "fetch")
        // @ts-ignore
        .mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
      render(
        <GitHubAPIProvider>
          <GitHubAPIProviderUse searchTerm="example" />
        </GitHubAPIProvider>
      );
      fireEvent.press(screen.getByText("SEARCH"));
      expect(fetch).toHaveBeenCalledWith(
        "https://api.github.com/search/users?q=example"
      );
    });
  });

  describe("userDetails", () => {
    it("should fetch from /users/login", () => {
      jest
        .spyOn(global, "fetch")
        // @ts-ignore
        .mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
      render(
        <GitHubAPIProvider>
          <GitHubAPIProviderUse userLogin="user1" />
        </GitHubAPIProvider>
      );
      fireEvent.press(screen.getByText("USERDETAIL"));
      expect(fetch).toHaveBeenCalledWith("https://api.github.com/users/user1");
    });
  });
});
