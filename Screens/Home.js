import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard ,Pressable} from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


const Home = () => {

    
    const navigation = useNavigation()
    const [todos,setTodos] = useState([])
    const todoRef = firebase.firestore().collection('todos')
    const [addData, setAddData] = useState()
    // verileri firestore'dan al veya oku

    useEffect(() => {

    todoRef
    .orderBy('createdAt','desc')
    .onSnapshot(
        querSnapShot =>{
            const todos = []
            querSnapShot.forEach((doc)=>{
                const {heading} = doc.data()
                todos.push({
                    id:doc.id,
                    heading
                })
            })
            setTodos(todos)
        }
    )



    }, [])

    // yapılacak işi firestore'dan silme

    const deleteTodo = (todos) => {
        todoRef
            .doc(todos.id)
            .delete()
            .then(() => {
                
            })
            .catch(error => {
                alert(error)
            })
    }

    // yapılacak işi ekleme

    const addTodo = () => {
        // yapacak bir işimiz olup olmadığını kontrol et
        if (addData && addData.length > 0) {
            // Zamanı al
            const timestamp = firebase.firestore.FieldValue.serverTimestamp()
            const data = {
                heading: addData,
                createdAt: timestamp,
            }
            todoRef
                .add(data)
                .then(() => {
                    setAddData('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                })
        }
    }

    return(
        <View style={{flex:1,marginTop:50}}>
            <View style={styles.container}>
                <TextInput 
                    style={styles.input}
                    placeholder='Add a new todo'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(heading)=> setAddData(heading)}
                    value={addData}
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <View style={{height:'100%'}}>
            <FlatList
            data={todos}
            numColumns={1}
            renderItem={({item})=>(
                
                <View>
                    <Pressable style={styles.container} onPress={()=>navigation.navigate('Detail',{item})}>
                        <FontAwesome name='trash-o' color='red' onPress={()=> deleteTodo(item)} style={styles.todoIcon} />
                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>
                                {item.heading[0].toUpperCase() + item.heading.slice(1)}
                            </Text>
                        </View>
                    </Pressable>
                </View>

            )}
            />
            </View>
            
        </View>
        
    )

}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#e5e5e5',
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10,
        flexDirection:'row',
        alignItems:'center',

    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
        marginLeft:20,
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize:18,
        marginRight:22,

    },
    formContainer:{
        flexDirection:'row',
        height:80,
        marginLeft:10,
        marginRight:10,
    },
    input:{
        height:48,
        borderRadius:5,
        overflow:'hidden',
        backgroundColor:'white',
        paddingLeft:16,
        flex:1,
        marginRight:5
    },
    button:{
        height:47,
        width:60,
        borderRadius:5,
        backgroundColor:'#788eec',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        color:'white',
        fontSize:20,

    },
    todoIcon:{
        marginTop:5,
        fontSize:20,
        marginLeft:14,
    }
})


export default Home