import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Button, Image, Text, View } from "react-native";
import { TextInput as RNTextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import useForm from "../utils/useForm";

const TextInput = ({
  name,
  placeholder,
  value,
  handleChange,
}: {
  name: string;
  placeholder?: string;
  value: string;
  handleChange: (inputName: string, inputValue: string) => void;
}) => (
  <RNTextInput
    placeholder={placeholder}
    value={value}
    onChangeText={(val) => handleChange(name, val)}
  />
);

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $title: String!
    $body: String! # $author: String!
  ) {
    createPost(
      data: {
        title: $title
        body: $body
        # author: $author
      }
    ) {
      id
      title
    }
  }
`;
// mutation {
//   createPost(data:{
//     title: "titleeee"
//     body: "bodyyyyy"
//   }) {
//     id
//     title
//   }
// }

export default function CreatePostItem(): JSX.Element {
  // const [submitted, setSubmitted] = useState(false);

  // remove initial state in useForm custom hook if want no initial values and not using resetForm function
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    title: "Title example",
    body: "Body example",
    // author: "JamesVickers",
  });
  const [createPost, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
    },
  );

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
            const res = await createPost();
            console.log("res: ", res);
          } catch {
            console.log("createPost error: ", error);
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
