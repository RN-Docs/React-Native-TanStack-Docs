import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ title, onPress }: { title: string; onPress: () => void  }) => {
  return (
   <TouchableOpacity style = {styles.button} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
   </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: '600',
  },
})


// import { StyleSheet, Text, TouchableOpacity } from 'react-native'
// import React from 'react'

// interface ButtonProps {
//     title: string
//     onPress: () => void
// }

// const Button : React.FC<ButtonProps> = ({title, onPress}) => {
//   return (
//     <TouchableOpacity onPress={onPress} style = {styles.button}>
//         <Text>{title}</Text>
//     </TouchableOpacity>
//   )
// }

// export default Button

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//     margin: 10,
//   },
// })