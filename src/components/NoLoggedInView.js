import React from 'react';
import { Col, Image, Row, Container } from 'react-bootstrap';

import notLoggedInImage from '../assets/undraw_Login_re_4vu2.png'

function NoLoggedInView(props) {
    return (
        <>
            <Container>
                <Row className="align-items-center">
                    <Col>
                        <Image src={`${notLoggedInImage}`} style={{ width: '80%' }} />
                    </Col>
                    <Col>
                        <h1>Login Necessário</h1>
                        <p>Você não está logado. Por favor  realize  o <a href="/login">login</a> primeiro ou seu acesso será limitado.</p>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default NoLoggedInView;