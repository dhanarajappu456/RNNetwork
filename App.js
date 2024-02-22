import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
export default function App() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefreshing] = useState(false);
  const fetchData = async (limit) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
    );
    const data = await response.json();

    setPostList(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(10);
  }, []);

  handleRefresh = () => {
    console.log("hey there");
    setRefreshing(true);

    fetchData(30);

    console.log("after fetching");

    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            ListHeaderComponent={<Text style={styles.headerText}>List</Text>}
            data={postList}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                  <Text style={styles.cardText}>{item.title}</Text>

                  <Text style={styles.cardText}>{item.body}</Text>
                </View>
              );
            }}
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 5,
    paddingBottom: 3,
  },
  card: {
    borderWidth: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginBottom: 6,
  },
  cardText: {
    fontSize: 20,
  },
  headerText: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 40,
  },
  loadContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
