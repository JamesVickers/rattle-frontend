import { useMutation } from "@apollo/client";
import React from "react";
import { Button, Image, Text, View } from "react-native";
import styled from "styled-components/native";
import { ALL_POSTS_QUERY } from "../queries/AllPostsQuery";
import { CREATE_POST_MUTATION } from "../queries/CreatePostMutation";
import useForm from "../utils/useForm";
import TextInput from "./TextInput";

export default function CreatePostItem(): JSX.Element {
  // const [submitted, setSubmitted] = useState(false);

  // remove initial state in useForm custom hook if want no initial values and not using resetForm function
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    title: "Title example",
    body: "Body example",
    // author: "JamesVickers",
  });
  const [
    createPost,
    {
      // data, loading,
      error,
    },
  ] = useMutation(CREATE_POST_MUTATION, {
    variables: inputs,
    refetchQueries: [
      {
        query: ALL_POSTS_QUERY,
        // can pass variables to the refetchQuery here is needed
        // variables: { }
      },
    ],
  });

  // const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text>Create a PostItem:</Text>
      <TextInput
        value={inputs.title}
        handleChange={handleChange}
        name={"title"}
        placeholder={"Add the post title"}
      />
      <TextInput
        value={inputs.body}
        handleChange={handleChange}
        name={"body"}
        placeholder={"Add the post body text"}
      />
      {/* <TextInput
        value={inputs.author}
        handleChange={handleChange}
        name={"author"}
        placeholder={"Add the post body text"}
      /> */}
      {/* <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Body"
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off" 
          autoFocus
          onSubmitEditing={() => undefined}
          blurOnSubmit={false}
        /> */}
      <Button
        title="Post it!"
        onPress={async () => {
          try {
            // const res =
            await createPost();
            clearForm();
            // navigation.navigate("PostItem");
          } catch {
            console.error("createPost error: ", error);
          }
        }}
      />
      <Button title="Clear form" onPress={clearForm} />
      <Button title="Reset form" onPress={resetForm} />
    </View>
  );
}

export const ProfileIconPlaceholder = styled(Image)<{
  height?: number;
  colour?: string;
}>`
  width: 50px;
  height: 50px;
  border-radius: 200px;
  background-color: #ff6347;
`;
