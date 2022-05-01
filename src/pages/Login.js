import React, { useState } from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function Login(props) {

    const [validate, setValidated] = useState(false);
    const [user, setUser] = useState(null);

    firebase.auth().onAuthStateChanged((u) => {
        if (u) {
            setUser(u)
        } else {
            setUser(null);
        }
    });

    const LoginButtonPressed = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        firebase.auth().signInWithEmailAndPassword(email.value, password.value).then((userCredentails) => {
            //SignedIn User
            var user = userCredentails.user;
            alert("Login Completo")
            setUser(user);
            setValidated(true);
        }).catch((e) => {
            alert(e.message);
            setValidated(true);
        })
    }

    const LogoutButtonPressed = () => {
        firebase.auth().signOut().then(() => {
            //Signout Successful
            alert("Logout Completo")
            setUser(null);
            setValidated(false);
        }).catch((e) => {
            alert(e.message);
        })
    }

    return (
        <>
            {(user === null) && <Card style={{ margin: 24, }}>
                <Card.Header>
                    <Image src={'https://st.depositphotos.com/2291641/2449/v/950/depositphotos_24491055-stock-illustration-icon-of-a-chef-with.jpg'} style={{ width: 80, marginBottom: 8 }} />
                    <h4>Admin Login</h4>
                    <p style={{ marginTop: 8, fontSize: 12, color: '#A1A1A1' }}>Se você é um administrador do Restaurante, faça o login abaixo. Se você não tiver uma conta, entre em contato com seu administrador para obter um login.</p>

                </Card.Header>
                <Card.Body>
                    <Form noValidate validated={validate} onSubmit={LoginButtonPressed}>

                        <Form.Group className='mb-3' controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder='Enter admin email' size='md' />
                            <Form.Control.Feedback type='invalid'>Email necessário.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='password'>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder='Enter password' size='md' />
                            <Form.Control.Feedback type='invalid'>Senha necessária.</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant='primary' type='submit' size='md' style={{ fontWeight: 'bold' }}>
                            Login ❯
                        </Button>
                        {/* <p>{user.email}</p> */}
                    </Form>
                </Card.Body>
                <Card.Footer>

                    <a href="/" style={{ marginTop: 8, fontSize: 12, }}>← Voltar para Pagina Principal</a>
                </Card.Footer>
            </Card>}
            {(user !== null) && <div style={{ margin: 24 }}>
                <p>Você está logado. Ir para <a href="/dashboard">dashboard</a></p>
                <p><a variant="primary" onClick={
                    LogoutButtonPressed
                }>Click aqui para sair.</a></p>
            </div>}

        </>
    );
}

export default Login;