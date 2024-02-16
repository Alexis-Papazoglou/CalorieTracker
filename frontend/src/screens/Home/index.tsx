import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

export default function Home() {
  const [hello, setHello] = React.useState('Connecting to server...')

  useEffect(() => {
    async function fetchHello(){
      const res = await fetch('https://foodimageanalysisapi.onrender.com/')
      const data = await res.json()
      console.log(data)
      setHello(data.message)
    }
    fetchHello()
  }, [])

  return (
    <View>
      <Text>{hello}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})