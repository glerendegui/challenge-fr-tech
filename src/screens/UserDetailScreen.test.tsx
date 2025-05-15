import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { UserDetailScreen } from "./UserDetailScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../components/Navigation";
import { RouteProp } from "@react-navigation/native";
import { TestGitHubAPIProvider } from "../tests/TestGitHubAPIProvider";
import { GitHubUserDetails } from "../contexts/GitHubAPIContext";

const queryClient = new QueryClient();

describe("UserDetailScreen", () => {
  const exampleUser = {
    bio: "Just a guy",
    company: "fr",
    login: "glerendegui",
    avatar_url: "url",
    name: "Gabriel",
  } as GitHubUserDetails;

  let mockNavigation: NativeStackNavigationProp<
    RootStackParamList,
    "UserDetails"
  >;
  let mockRoute: RouteProp<RootStackParamList, "UserDetails">;
  beforeEach(() => {
    jest.resetAllMocks();
    // @ts-ignore
    mockNavigation = {
      goBack: jest.fn(),
    };
    // @ts-ignore
    mockRoute = {
      params: {
        login: "glerendegui",
      },
    };
  });
  afterAll(() => {
    queryClient.resetQueries();
  });
  it("should show user info when exists", async () => {
    const mockUserDetail = jest.fn().mockResolvedValue(exampleUser);

    render(
      <QueryClientProvider client={queryClient}>
        <TestGitHubAPIProvider userDetail={mockUserDetail}>
          <UserDetailScreen navigation={mockNavigation} route={mockRoute} />
        </TestGitHubAPIProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Gabriel"));
    });
  });

  it("should show user-not-found when user does not exists", async () => {
    const mockUserDetail = jest.fn().mockResolvedValue(null);

    render(
      <QueryClientProvider client={queryClient}>
        <TestGitHubAPIProvider userDetail={mockUserDetail}>
          <UserDetailScreen navigation={mockNavigation} route={mockRoute} />
        </TestGitHubAPIProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("USER NOT FOUND"));
    });
  });

  it("should go back to list when back-arrow is clicked", () => {
    const mockUserDetail = jest.fn().mockResolvedValue(exampleUser);

    render(
      <QueryClientProvider client={queryClient}>
        <TestGitHubAPIProvider userDetail={mockUserDetail}>
          <UserDetailScreen navigation={mockNavigation} route={mockRoute} />
        </TestGitHubAPIProvider>
      </QueryClientProvider>
    );

    fireEvent.press(screen.getByTestId("backArrow"));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
