import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { Fav } from "./Fav";
import { TestFavsProvider } from "../tests/TestFavsProvider";

describe("Fav", () => {
  const isFav = jest.fn();
  const toogleFav = jest.fn();
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe("when user is not favotire", () => {
    it("should show empty star", () => {
      isFav.mockReturnValue(false);
      render(
        <TestFavsProvider isFav={isFav} toogleFav={toogleFav}>
          <Fav userLogin="user1" />
        </TestFavsProvider>
      );
      expect(isFav).toHaveBeenCalled();
      expect(screen.getByTestId(`fav_icon_user1_false`));
    });

    it("should selected when clicked", async () => {
      isFav.mockReturnValue(false);
      render(
        <TestFavsProvider isFav={isFav} toogleFav={toogleFav}>
          <Fav userLogin="user1" />
        </TestFavsProvider>
      );
      fireEvent.press(screen.getByTestId(`fav_icon_user1_false`));
      expect(toogleFav).toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.queryByTestId(`fav_icon_user1_true`));
      });
    });
  });

  describe("when user is favotire", () => {
    it("should show full star", () => {
      isFav.mockReturnValue(true);
      render(
        <TestFavsProvider isFav={isFav} toogleFav={toogleFav}>
          <Fav userLogin="user1" />
        </TestFavsProvider>
      );
      expect(isFav).toHaveBeenCalled();
      expect(screen.getByTestId(`fav_icon_user1_true`));
    });

    it("should selected when clicked", async () => {
      isFav.mockReturnValue(true);
      render(
        <TestFavsProvider isFav={isFav} toogleFav={toogleFav}>
          <Fav userLogin="user1" />
        </TestFavsProvider>
      );
      fireEvent.press(screen.getByTestId(`fav_icon_user1_true`));
      expect(toogleFav).toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.queryByTestId(`fav_icon_user1_fakse`));
      });
    });
  });
});
