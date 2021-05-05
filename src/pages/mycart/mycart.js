import React from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CartActions from '../../actions/mycart';

import { Card, Button, Container, Row, Col, Table } from "react-bootstrap";

import itemList from "../../data/items";

import "./mycart.css";

class MyCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList
        };
    }

    onClickAdd(item) {
        this.props.action.addToCart(item);
    }

    incrememntQty(item) {
        this.props.action.incrememntQty(item);
    }

    decrementQty(item) {
        this.props.action.decrementQty(item);
    }

    getAllItemsTotal() {
        let total = 0;
        this.props.cart.cart.map((citem) => {
            return total += citem.total;
        });
        return total;
    }

    render() {
        const cartitems = this.state.itemList.map((item, id) => {
            return  <div className="itemCard"><Card className="itemParent">
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                              {item.description}
                            </Card.Text>
                            <Card.Text>
                              Rate: {item.rate}
                            </Card.Text>
                            <Button  onClick={() => this.onClickAdd(item)} variant="primary">Add to Cart [+]</Button>
                        </Card.Body>
                    </Card></div>
        });

        const addedCartValues = this.props.cart.cart.map((citem, index) => {
            return  <tr>
                        <td>{index+1}</td>
                        <td>{citem.name}</td>
                        <td>Rs-{citem.rate}</td>
                        <td>{citem.qty}</td>
                        <td>
                            <div className="displayFlex">
                                <Button onClick={() => this.incrememntQty(citem)} variant="outline-primary">+</Button>
                                <Button onClick={() => this.decrementQty(citem)}variant="outline-danger">-</Button>
                            </div>
                        </td>
                        <td>{citem.total}</td>
                    </tr>
        });
        return (<div className="mycartContainer">
                <Row>
                   <Col sm={8} xs={12}>
                        <Row>
                            {cartitems}
                        </Row>
                   </Col>
                   <Col sm={4} xs={12}>
                        <Card>
                            <Card.Header>My Cart</Card.Header>
                            <Card.Body>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Item</th>
                                        <th>Rate</th>
                                        <th>Qty</th>
                                        <th>Action</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {(this.props.cart.cart.length > 0) && addedCartValues}
                                        {(this.props.cart.cart.length <= 0) && <tr><td colSpan="6">
                                            <div className="emptyCart">
                                                <label>I am empty now.</label>
                                            </div>
                                        </td></tr>}
                                    </tbody>
                                    {(this.props.cart.cart.length > 0) && <tbody>
                                        <tr>
                                            <td colSpan="6">
                                                <label className="masterTotal">Total: {this.getAllItemsTotal()}</label>
                                            </td>
                                        </tr>
                                    </tbody>}
                                </Table>
                            </Card.Body>
                        </Card>
                   </Col>
                </Row>
        </div>)
    }
}

function mapStateToProps(state, prop) {
    console.log("In map to state " + JSON.stringify(state) + "   Props" + JSON.stringify(prop));
    return {
        cart: state.myCart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(CartActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);

// export default MyCart;