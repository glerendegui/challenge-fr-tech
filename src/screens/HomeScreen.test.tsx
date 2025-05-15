import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { TestGitHubAPIProvider } from "../tests/TestGitHubAPIProvider";
import { HomeScreen } from "./HomeScreen";
import { RootStackParamList } from "../components/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GitHubUser } from "../contexts/GitHubAPIContext";

const queryClient = new QueryClient();

describe("HomeScreen", () => {
  let mockNavigation: NativeStackNavigationProp<RootStackParamList, "Home">;
  let mockRoute: RouteProp<RootStackParamList, "Home">;
  beforeEach(() => {
    jest.resetAllMocks();
    // @ts-ignore
    mockNavigation = {
      navigate: jest.fn(),
    };
    // @ts-ignore
    mockRoute = {};
  });
  afterAll(() => {
    queryClient.resetQueries();
  });

  it("should show all users by default", async () => {
    const mockSearch = jest.fn().mockResolvedValue([
      { login: "user1", avatar_url: "url1" },
      { login: "user2", avatar_url: "url2" },
    ] as GitHubUser[]);
    render(
      <QueryClientProvider client={queryClient}>
        <TestGitHubAPIProvider search={mockSearch}>
          <HomeScreen navigation={mockNavigation} route={mockRoute} />
        </TestGitHubAPIProvider>
      </QueryClientProvider>
    );
    expect(mockSearch).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText("user1"));
      expect(screen.getByText("user2"));
    });
  });

  it("should filter by text", async () => {
    const mockSearch = jest
      .fn()
      .mockResolvedValueOnce([{ login: "user1", avatar_url: "url1" }])
      .mockResolvedValueOnce([{ login: "user3", avatar_url: "url3" }]);
    render(
      <QueryClientProvider client={queryClient}>
        <TestGitHubAPIProvider search={mockSearch}>
          <HomeScreen navigation={mockNavigation} route={mockRoute} />
        </TestGitHubAPIProvider>
      </QueryClientProvider>
    );
    expect(mockSearch).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText("user1"));
    });
    fireEvent.changeText(screen.getByTestId("searchInput"), "user-filter");
    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledTimes(2);
      expect(mockSearch).toHaveBeenNthCalledWith(2, "user-filter");
      expect(screen.getByText("user3"));
      expect(screen.queryByText("user1")).toBeNull();
    });
  });
});
