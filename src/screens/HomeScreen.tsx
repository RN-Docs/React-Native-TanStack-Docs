import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUsers } from '../hooks/useUsers';
import Loader from '../Components/Loader';
import { useCreateUser } from '../hooks/useCreateUser';
import Button from '../Components/Button';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { useUpdateUsers } from '../hooks/useUpdateUsers';


const HomeScreen = () => {
  const { data , isLoading, error } = useUsers();
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUsers();
    console.log(data);
    if (isLoading) return <Loader />;
    if (error) return <Text>Error: {error.message}</Text>;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="Create User"
        onPress={() => createUser.mutate({name: 'John Doe', avatar: 'https://via.placeholder.com/150', createdAt: new Date().toISOString() })} />
      </View>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={data}
          renderItem={({ item }) => 
          <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <Image source={{ uri: item.avatar }} style={styles.image} />
          <Text style={styles.createdAt}>{item.createdAt}</Text>
          <Button title="Delete User" onPress={() => deleteUser.mutate(item.id)} />
          <Button title="Update User" onPress={() => updateUser.mutate({ id: item.id, user: { name: 'Leonardo Pikas', avatar: 'https://via.placeholder.com/150', createdAt: new Date().toISOString() } })} />
          </View>
          }
          keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 24,
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  createdAt: {
    fontSize: 16,
  },
})

// ============================
// Example: manual create/update
// ============================
//
// This is only an example of how you could let users enter data manually.
// To use this approach, replace the hardcoded "John Doe" and "Leonardo Pikas"
// values with state values that come from TextInput fields.
//
// 1. Add useState and TextInput to your imports:
//
// import React, { useState } from 'react'
// import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
//
// 2. Create state inside the HomeScreen component:
//
// const [name, setName] = useState('');
// const [avatar, setAvatar] = useState('');
//
// const [editName, setEditName] = useState('');
// const [editAvatar, setEditAvatar] = useState('');
//
// These two states control when the create/update forms are visible:
//
// const [showCreateForm, setShowCreateForm] = useState(false);
// const [editingUserId, setEditingUserId] = useState<string | null>(null);
//
// 3. The first Create User button can open or close the create form:
//
// <Button
//   title={showCreateForm ? 'Close Create Form' : 'Create User'}
//   onPress={() => setShowCreateForm(!showCreateForm)}
// />
//
// 4. Show the create TextInput fields only when showCreateForm is true:
//
// {showCreateForm && (
//   <View>
//     <TextInput
//       placeholder="Enter user name"
//       value={name}
//       onChangeText={setName}
//       style={styles.input}
//     />
//
//     <TextInput
//       placeholder="Enter avatar URL"
//       value={avatar}
//       onChangeText={setAvatar}
//       style={styles.input}
//     />
//
//     <Button
//       title="Save User"
//       onPress={() => {
//         createUser.mutate({
//           name: name,
//           avatar: avatar,
//           createdAt: new Date().toISOString(),
//         });
//
//         setName('');
//         setAvatar('');
//         setShowCreateForm(false);
//       }}
//     />
//   </View>
// )}
//
// Shorter create version:
//
// createUser.mutate({
//   name,
//   avatar,
//   createdAt: new Date().toISOString(),
// });
//
// 5. For update, the Update User button can open the edit form for one item:
//
// <Button
//   title="Update User"
//   onPress={() => {
//     setEditingUserId(item.id);
//     setEditName(item.name);
//     setEditAvatar(item.avatar);
//   }}
// />
//
// 6. Show the update TextInput fields only for the selected item:
//
// {editingUserId === item.id && (
//   <View>
//     <TextInput
//       placeholder="New name"
//       value={editName}
//       onChangeText={setEditName}
//       style={styles.input}
//     />
//
//     <TextInput
//       placeholder="New avatar URL"
//       value={editAvatar}
//       onChangeText={setEditAvatar}
//       style={styles.input}
//     />
//
//     <Button
//       title="Save Update"
//       onPress={() => {
//         updateUser.mutate({
//           id: item.id,
//           user: {
//             name: editName,
//             avatar: editAvatar,
//             createdAt: new Date().toISOString(),
//           },
//         });
//
//         setEditName('');
//         setEditAvatar('');
//         setEditingUserId(null);
//       }}
//     />
//
//     <Button
//       title="Cancel"
//       onPress={() => {
//         setEditName('');
//         setEditAvatar('');
//         setEditingUserId(null);
//       }}
//     />
//   </View>
// )}
//
// The important idea is conditional rendering:
// - showCreateForm decides if the create inputs are visible.
// - editingUserId decides which user's update inputs are visible.
//
// 7. If you did not want open/close behavior, you could render inputs directly:
//
// <TextInput
//   placeholder="Enter user name"
//   value={name}
//   onChangeText={setName}
//   style={styles.input}
// />
//
// <TextInput
//   placeholder="Enter avatar URL"
//   value={avatar}
//   onChangeText={setAvatar}
//   style={styles.input}
// />
//
// 8. The Create User button would use state instead of hardcoded "John Doe":
//
// <Button
//   title="Create User"
//   onPress={() => {
//     createUser.mutate({
//       name: name,
//       avatar: avatar,
//       createdAt: new Date().toISOString(),
//     });
//
//     setName('');
//     setAvatar('');
//   }}
// />
//
// 9. For update, you could use inputs inside each item or inside a separate edit form:
//
// <TextInput
//   placeholder="New name"
//   value={editName}
//   onChangeText={setEditName}
//   style={styles.input}
// />
//
// <TextInput
//   placeholder="New avatar URL"
//   value={editAvatar}
//   onChangeText={setEditAvatar}
//   style={styles.input}
// />
//
// <Button
//   title="Update User"
//   onPress={() =>
//     updateUser.mutate({
//       id: item.id,
//       user: {
//         name: editName,
//         avatar: editAvatar,
//         createdAt: new Date().toISOString(),
//       },
//     })
//   }
// />
//
// 10. You would also add an input style inside StyleSheet.create:
//
// input: {
//   borderWidth: 1,
//   borderColor: '#ccc',
//   borderRadius: 8,
//   paddingHorizontal: 12,
//   paddingVertical: 10,
//   marginHorizontal: 10,
//   marginVertical: 6,
// },