import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { GitHubAPIContext } from "../contexts/GitHubAPIContext";
import { FC, useContext } from "react";
import { Fav } from "../components/Fav";
import Svg, { Path } from "react-native-svg";

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  main: {
    backgroundColor: "#F0F0F0",
    padding: 20,
    display: "flex",
    borderRadius: 10,
  },
  back: {
    padding: 10,
    height: 40,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
  },
  userImage: {
    borderRadius: 50,
    overflow: "hidden",
  },
  stats: {
    borderColor: "gray",
    borderWidth: 0,
    flex: 1,
    justifyContent: "center",
    padding: 0,
    marginLeft: 10,
  },
  data: {},
});

const BackArrow: FC<{
  navigation: NativeStackNavigationProp<RootStackParamList, "UserDetails">;
}> = ({ navigation }) => {
  return (
    <Svg
      viewBox="0 0 122.88 108.06"
      width="20"
      height="20"
      onPress={() => navigation.goBack()}
      testID="backArrow"
    >
      <Path
        stroke="white"
        fill="white"
        d="M63.94,24.28a14.28,14.28,0,0,0-20.36-20L4.1,44.42a14.27,14.27,0,0,0,0,20l38.69,39.35a14.27,14.27,0,0,0,20.35-20L48.06,68.41l60.66-.29a14.27,14.27,0,1,0-.23-28.54l-59.85.28,15.3-15.58Z"
      />
    </Svg>
  );
};

export const UserDetailScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "UserDetails">) => {
  const { login } = route.params;
  const { userDetail } = useContext(GitHubAPIContext);
  const { isLoading, data: user } = useQuery({
    queryKey: [`detail_${login}`],
    queryFn: () => userDetail(login),
    enabled: true,
  });
  return (
    <View style={styles.screen}>
      <View style={styles.back}>
        <BackArrow navigation={navigation} />
      </View>
      {isLoading && <ActivityIndicator />}
      {!isLoading && !user && <Text>USER NOT FOUND</Text>}
      {!isLoading && !!user && (
        <>
          <View style={styles.main}>
            <View style={styles.header}>
              <View style={styles.userImage}>
                <Image src={user.avatar_url} width={100} height={100} />
              </View>
              <View style={styles.stats}>
                <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                  {user.login}
                </Text>
                <Text>
                  Public Repositories:
                  <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                    {user.public_repos}
                  </Text>
                </Text>
                <Text>
                  Followers:
                  <Text style={{ fontWeight: "bold" }}>{user.followers}</Text>
                </Text>
                <Text>
                  Following:
                  <Text style={{ fontWeight: "bold" }}>{user.following}</Text>
                </Text>
              </View>
              <Fav userLogin={user.login} />
            </View>
            <View style={styles.data}>
              {!!user.name?.length && (
                <Text style={{ fontWeight: "bold" }}>{user.name}</Text>
              )}
              {!!user.location?.length && (
                <Text style={{ marginBottom: 10 }}>{user.location}</Text>
              )}
              {!!user.company?.length && (
                <Text style={{ marginBottom: 10 }}>
                  Company: {user.company}
                </Text>
              )}
              {!!user.bio?.length && (
                <Text style={{ fontStyle: "italic" }}>{user.bio}</Text>
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
};
