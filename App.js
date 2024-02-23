import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
export default function App() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefreshing] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [posting, setIsPosting] = useState(false);

  const fetchData = async (limit) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
    );
    const data = await response.json();

    setPostList(data);
    setIsLoading(false);
    console.log(postList);
  };

  useEffect(() => {
    fetchData(90);
  }, []);

  handleRefresh = () => {
    console.log("hey there");
    setRefreshing(true);

    fetchData(30);

    console.log("after fetching");

    setRefreshing(false);
  };

  const handleSubmit = async () => {
    setIsPosting(true);
    //const id = postList[postList.length].id;
    const postId = postList[postList.length - 1].id;
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        id: postId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const newPost = await response.json();
    console.log([...postList, newPost]);
    setPostList([...postList, newPost]);
    setIsPosting(false);
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
        <>
          <View style={styles.postContainer}>
            <TextInput
              style={styles.postTitle}
              placeholder="Post title"
              value={postTitle}
              onChangeText={setPostTitle}
            />

            <TextInput
              style={styles.postBody}
              placeholder="Post body"
              value={postBody}
              onChangeText={setPostBody}
            />
            <Button
              title={posting ? "Adding..." : "Add Post"}
              onPress={handleSubmit}
            />
          </View>
          <View style={styles.listContainer}>
            <FlatList
              ListHeaderComponent={
                <Text style={styles.headerText}>Post List</Text>
              }
              data={postList}
              renderItem={({ item }) => {
                return (
                  <View style={styles.card}>
                    <Text style={styles.cardText}>{item.title}</Text>

                    <Text style={styles.cardText}>{item.body}</Text>
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
              refreshing={refresh}
              onRefresh={() => handleRefresh()}
              removeClippedSubviews={true}
            />
          </View>
        </>
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
    paddingBottom: 10,
  },
  card: {
    borderWidth: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginBottom: 10,
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

  postContainer: {
    padding: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  postTitle: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    marginBottom: 4,
  },
  postBody: {
    height: 80,
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    marginBottom: 4,
  },
  listContainer: {
    marginBottom: 200,
  },
});
