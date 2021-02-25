import React, { useState } from "react";
import { Button, Image, Text, View } from "react-native";
import { TextInput as RNTextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";

const TextInput = ({
  name,
  placeholder,
  value,
  onChangeText,
}: {
  name: string;
  placeholder?: string;
  value: string;
  onChangeText: (inputName: string, inputValue: string) => void;
}) => (
  <RNTextInput
    placeholder={placeholder}
    value={value}
    onChangeText={(val) => onChangeText(name, val)}
  />
);

export default function CreatePostItem(): JSX.Element {
  // const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [author, setAuthor] = useState("");

  const onChangeTitle = (name: string, value: string) => {
    setTitle(value);
    console.log(name, value);
  };
  const onChangeBodyText = (name: string, value: string) => {
    setBodyText(value);
    console.log(name, value);
  };
  const onChangeAuthor = (name: string, value: string) => {
    setAuthor(value);
    console.log(name, value);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text>Create a PostItem:</Text>
      <TextInput
        value={title}
        onChangeText={onChangeTitle}
        name={"title"}
        placeholder={"Add the post title"}
      />
      <TextInput
        value={bodyText}
        onChangeText={onChangeBodyText}
        name={"body"}
        placeholder={"Add the post body text"}
      />
      <TextInput
        value={author}
        onChangeText={onChangeAuthor}
        name={"author"}
        placeholder={"Add the post body text"}
      />
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
      <Button title="Post it!" onPress={() => undefined} />
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
