import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect , useState, useContext } from 'react'
import { AuthContext } from '../../../Context/ContextProvider'
import { getDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../firebase'; // adjust the path as needed

export default function Home() {
  const [hello, setHello] = useState('Connecting to server...')
  const [userData, setUserData] = useState('');
  const auth = useContext(AuthContext);

  if (!auth) {
    // handle the case where the auth context is not provided
    throw new Error('AuthContext is not provided');
  }

  const { user , signOut } = auth;

  useEffect(() => {
    async function fetchHello(){
      const res = await fetch('https://foodimageanalysisapi.onrender.com/')
      const data = await res.json()
      console.log(data)
      setHello(data.message)
    }
    fetchHello()
  }, [])

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data().username);
        } else {
          console.log('No such document!');
        }
      }
    }
    fetchUserData();
  }, [user]);

  return (
    <View>
      <Text>{hello}</Text>
      {user && <Text>Welcome, {user.displayName || user.email}!</Text>}
      {userData && <Text>Username: {userData}</Text>}
      <Button title="Sign Out" onPress={signOut} />
    </View>
  )
}

const styles = StyleSheet.create({})