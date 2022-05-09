import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Animated, Pressable, TouchableHighlight } from 'react-native';


import { AnimatedButton } from '../components/animatedButton';

const API_URL = 'http://localhost:4040';

const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');


    const onLoggedIn = (token) => {
        fetch(`${API_URL}/private`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        }).then(async response => {
            const jsonResponse = await response.json();
            if (response.status === 200) {
                setMessage(jsonResponse.message);
            }
            if (response.status == 404) {
                setMessage(jsonResponse.message);
                window.setTimeout(() => {
                    setMessage('');
                }, 2000);
            }
        })
    }

    const submitForm = () => {
        console.log(email, name, password)
        const payload = {
            email,name,password
        };
        fetch(`${API_URL}/${isLogin ? 'login' : 'register'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setMessage(jsonRes.message);
                } else {

                    onLoggedIn(jsonRes.token);
                    setMessage(jsonRes.message);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const getMessage = () => {
        // const status = isError ? `Error: ` : `Success: `;
        return message;
    }

    return (
        <ImageBackground source={require('../public/images/background.jpg')} style={styles.image}>
            <View style={styles.card}>
                <Text style={styles.title}>Clothy</Text>
                <View style={styles.form}>

                    {!isLogin && <View style={styles.subTitle}><Text style={styles.subTitleInput}>Nombre</Text></View>}
                    {!isLogin && <TextInput style={styles.input} placeholder="Ingresa tu nombre" placeholderTextColor="rgba(117, 98, 126, 1)"  onChangeText={setName}></TextInput>}
                    <View style={styles.subTitle}>
                        <Text style={styles.subTitleInput}>Email</Text>
                    </View>
                    <TextInput style={styles.input} placeholderTextColor="rgba(117, 98, 126, 1)" autoCapitalize='none' autoCorrect={false} onChangeText={setEmail} autoCompleteType='email' placeholder="Ingresa tu email" />
                    <View style={styles.subTitle}>
                        <Text style={styles.subTitleInput}>Contraseña</Text>
                    </View>
                    <TextInput style={styles.input} placeholderTextColor="rgba(117, 98, 126, 1)"  secureTextEntry={true}  onChangeText={setPassword}placeholder="Ingresa tu contraseña" />
                    <Text style={[]}>{message ? message : null}</Text>


                    <AnimatedButton name="text" color="rgba(117, 98, 126, 1)" textColor="#ffff" function={submitForm}> Enviar </AnimatedButton>
                    <AnimatedButton name="text" color="rgba(16, 140, 130, 43)" textColor="#ffff" function={onChangeHandler}> {isLogin ? 'Registrate' : 'Inicia Sesión'} </AnimatedButton>



                </View>
            </View>
        </ImageBackground>
    );
};
const styles = StyleSheet.create({

    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },

    card: {
        backgroundColor: 'rgba(184, 170, 191, 0.37)',
        width: '80%',
        borderRadius : 20,
    },

    title: {
        fontSize: 50,
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: "900",
        color: 'rgba(86, 64, 97, 1)',
        // fontFamily: 'PaytoneOne-Regular',


    },

    form: {
        alignItems: 'center',
        marginBottom: 20,
    },

    input: {
        textAlign: 'left',
        marginBottom: 5,
        fontSize: 15,
        width: '80%',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'rgba(117, 98, 126, 1)',
        color: 'rgba(86, 64, 97, 1)',
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginBottom: 5,

    },

    subTitle: {
        fontSize: 20,
        width: '80%',
        borderRadius: 5,
        fontWeight: 'normal',

    },
    
    subTitleInput: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'left',
        color: 'rgba(86, 64, 97, 1)',
        fontWeight: 'bold',
    },

    button: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "rgba(86, 64, 97, 1)",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 70,
    },

    buttonText: {
        fontSize: 20,
        color: 'white',
    }


});
    
export { AuthScreen };
export default AuthScreen;