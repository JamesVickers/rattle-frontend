import React from "react";
import { Button, Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Post } from "../state/post.model";

export default function CreatePostItem(): JSX.Element {
    const [submitted, setSubmitted] = React.useState(false);
    const [username, setUsername] = React.useState("");
    
        return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text>Create a PostItem:</Text>
          <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Title"
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off"
          autoFocus
          onSubmitEditing={() => undefined}
          blurOnSubmit={false}
        />
           <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Body"
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off"
          autoFocus
          onSubmitEditing={() => undefined}
          blurOnSubmit={false}
        />
           <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Status"
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off"
          autoFocus
          onSubmitEditing={() => undefined}
          blurOnSubmit={false}
        />
                   <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Author"
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off"
          autoFocus
          onSubmitEditing={() => undefined}
          blurOnSubmit={false}
        />
        <Button
          title="Post it!"
          onPress={() => undefined}
        />
      </View>
    );
  };

  export const ProfileIconPlaceholder = styled(Image)<{
    height?: number;
    colour?: string;
  }>`
    width: 50px;
    height: 50px;
    border-radius: 200px;
    background-color: #FF6347;
  `;
  