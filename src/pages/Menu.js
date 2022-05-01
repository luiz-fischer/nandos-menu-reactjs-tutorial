import React, { useEffect, useState } from 'react';
import { Table, Card, Image, Button, Spinner } from 'react-bootstrap';

import FirestoreService from '../utils/services/FirestoreService';

function Menu(props) {

    const [menuItems, setMenuItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        FirestoreService.getAllMenuItems().then((response) => {
            setIsLoading(false);
            setMenuItems(response._delegate._snapshot.docChanges);
        }).catch((e) => {
            setIsLoading(false);
            alert("Ocorreu um erro ao buscar o item de menu. " + e);
        })
    }, [])

    return (
        <>
            {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
            <Card style={{ margin: 24 }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div className="align-items-center" style={{ marginRight: 8 }}>
                        <Image src={'https://st2.depositphotos.com/1035649/7783/v/950/depositphotos_77833254-stock-illustration-restaurant-logo.jpg'} style={{ width: 150 }} />
                        <p style={{ marginTop: 8, fontSize: 12, color: '#A1A1A1' }}>Rua da Juventude. Bairro Dos Idosos. Numero 20 São Paulo - SP/Brasil</p>
                    </div>
                    <Button style={{ backgroundColor: '#BD2B2B', borderWidth: 0, }}>Realize o Pedido.</Button>
                </Card.Header>
                <Card.Body>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome Item</th>
                                <th>Categoria</th>
                                <th>Preço (R$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(menuItems) && (menuItems.map((menuItem, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{menuItem.doc.data.value.mapValue.fields.itemName.stringValue}</td>
                                    <td>{menuItem.doc.data.value.mapValue.fields.itemCategory.stringValue}</td>
                                    <td>{menuItem.doc.data.value.mapValue.fields.itemPrice.doubleValue ? menuItem.doc.data.value.mapValue.fields.itemPrice.doubleValue : menuItem.doc.data.value.mapValue.fields.itemPrice.integerValue}</td>
                                </tr>
                            )))}
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <p style={{ marginTop: 8, fontSize: 12, color: '#A1A1A1' }}>© 2022 Restaurante</p>
                    <p style={{ marginTop: 8, fontSize: 12, color: '#A1A1A1' }}><a href="/login">Admin Login</a> • <a href="#">Politica de Privacidade</a> • <a href="#">Instruções</a> • <a href="#">Contato</a></p>
                </Card.Footer>
            </Card>
        </>
    );
}

export default Menu;