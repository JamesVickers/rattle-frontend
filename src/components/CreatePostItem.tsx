import { useMutation } from "@apollo/client";
import React from "react";
import { Button, Image } from "react-native";
import styled from "styled-components/native";
import { ALL_POSTS_QUERY } from "../queries/AllPostsQuery";
import { CREATE_POST_MUTATION } from "../queries/CreatePostMutation";
import useForm from "../utils/useForm";
import { Card } from "./Card";
import TextInput from "./TextInput";
import { TextStyles } from "./TextStyles";

export default function CreatePostItem(): JSX.Element {
  // remove initial state in useForm custom hook if want no initial values and not using resetForm function
  const { inputs, handleChange, clearForm } = useForm({
    title: "",
    body: "",
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

  const canCreatePost = inputs.title !== "" && inputs.body !== "";

  return (
    <Card>
      <TextStyles>Create a PostItem:</TextStyles>
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
      <Button
        title="Post it!"
        disabled={!canCreatePost}
        onPress={async () => {
          try {
            await createPost();
            clearForm();
          } catch {
            console.error("createPost error: ", error);
          }
        }}
      />
      <Button title="Clear form" onPress={clearForm} />
    </Card>
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
