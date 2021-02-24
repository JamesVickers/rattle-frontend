import { gql, useQuery } from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Button, Text} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { PostItem } from '../components/post';
import {RootStackParams} from '../routes';

const ALL_POSTS_QUERY = gql`
 query {
  allPosts {
    id
    title
    body
    status
    author {
      id
      name
      profileImage {
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
}
`

const PostsScreen = (): JSX.Element => {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, 'Posts'>
  >();

  const { data, error, loading } = useQuery(ALL_POSTS_QUERY)
  // console.log(data, error, loading);

  return (
    <SafeAreaView
      forceInset={{
        left: 'always',
        top: 'always',
        right: 'always',
        bottom: 'always',
      }}
      style={{ flex: 1, backgroundColor: 'grey' }}>
      <Text>PostsScreen!!</Text>
      <Button
        title="go to HomeScreen"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <FlatList 
        data={data.allPosts} 
        keyExtractor={(item) => item.id}     
        renderItem={({ item }) => (
          <PostItem key={item.id} post={item} />
          )}
        />
    
    </SafeAreaView>
  );
};

export default PostsScreen;
