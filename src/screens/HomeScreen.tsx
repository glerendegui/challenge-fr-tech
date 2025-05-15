import { useQuery } from "@tanstack/react-query";
import { FC, useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GitHubAPIContext, GitHubUser } from "../contexts/GitHubAPIContext";
import { RootStackParamList } from "../components/Navigation";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Fav } from "../components/Fav";

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 10,
  },
  userListItem: {
    borderWidth: 0,
    backgroundColor: "#F0F0F0",
    flexDirection: "row",
    display: "flex",
    height: 50,
    borderRadius: 10,
    marginBottom: 2,
    padding: 10,
  },
  userListItem_Image: {
    display: "flex",
    marginRight: 5,
  },
  userListItem_Username: {
    display: "flex",
    paddingLeft: 10,
    flex: 1,
    verticalAlign: "middle",
  },
});

export const UsersListItem: FC<{
  user: GitHubUser;
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}> = ({ user, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.userListItem}
      onPress={() => navigation.navigate("UserDetails", { login: user.login })}
    >
      <Image
        src={user.avatar_url}
        width={30}
        height={30}
        style={styles.userListItem_Image}
      />

      <Text style={styles.userListItem_Username}>{user.login}</Text>
      <Fav userLogin={user.login} />
    </TouchableOpacity>
  );
};

export const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { search } = useContext(GitHubAPIContext);

  const { isLoading, data: usersFound } = useQuery({
    queryKey: [`search_${searchTerm}`],
    queryFn: () => search(searchTerm),
    enabled: true,
  });

  return (
    <View style={styles.main}>
      <TextInput
        onChangeText={(e) => setSearchTerm(e)}
        style={styles.searchInput}
        placeholder="Search by name"
        testID="searchInput"
      />
      {isLoading && <ActivityIndicator />}
      {!isLoading && !usersFound?.length && <Text>NO USERS FOUND</Text>}
      {!isLoading && !!usersFound?.length && (
        <FlatList
          data={usersFound}
          renderItem={({ item }) => (
            <UsersListItem user={item} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
};
