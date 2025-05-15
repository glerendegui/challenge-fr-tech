import { fireEvent, render, screen } from "@testing-library/react-native";
import { FavsProvider } from "./FavsProvider";
import { FC, useContext } from "react";
import { FavsContext } from "./FavsContext";
import { Text } from "react-native";

const FavsProviderUse: FC = () => {
  const { isFav, toogleFav } = useContext(FavsContext);
  return (
    <Text onPress={() => toogleFav("test-user")}>
      {isFav("test-user") ? "IS-FAVORITE" : "IS-NOT-FAVORITE"}
    </Text>
  );
};

describe("FavsProvider", () => {
  it("should be not selected by default", () => {
    render(
      <FavsProvider>
        <FavsProviderUse />
      </FavsProvider>
    );
    expect(screen.getByText("IS-NOT-FAVORITE")).toBeVisible();
  });

  it("should toogle when clicked", () => {
    render(
      <FavsProvider>
        <FavsProviderUse />
      </FavsProvider>
    );
    expect(screen.getByText("IS-NOT-FAVORITE")).toBeVisible();
    fireEvent.press(screen.getByText("IS-NOT-FAVORITE"));
    expect(screen.getByText("IS-FAVORITE")).toBeVisible();
    fireEvent.press(screen.getByText("IS-FAVORITE"));
    expect(screen.getByText("IS-NOT-FAVORITE")).toBeVisible();
  });
});
