const initialState = {
    cart: []
};

const MyCart = (state = initialState, action) => {
    switch(action.type) {
        case "add": {
            let cartValue = state.cart;
            // check for aleady present cart item
            let present = false;
            cartValue.map((c) => {
                if (c.id === action.item.id) {
                    c.qty = c.qty + 1;
                    c.total = (action.item.rate * c.qty)
                    present = true;
                }
            });
            !present && cartValue.push({
                id: action.item.id,
                name: action.item.name,
                rate: action.item.rate,
                qty: 1,
                total: (action.item.rate * 1)
            });
            return {
                ...state,
                cart: cartValue
            }
        }
        case "increment": {
            let cartValue = state.cart;
            cartValue.map((c) => {
                if (c.id === action.item.id) {
                    c.qty = c.qty + 1;
                    c.total = (action.item.rate * c.qty)
                }
            });
            return {
                ...state,
                cart: cartValue
            }
        }
        case "decrement": {
            let cartValue = state.cart;
            let i = 0;
            cartValue.map((c) => {
                if (c.id === action.item.id) {
                    c.qty = c.qty - 1;
                    if (c.qty === 0) {
                        cartValue.splice(i,1);
                    } else {
                        c.total = (action.item.rate * c.qty)
                    }
                }
                i++;
            });
            return {
                ...state,
                cart: cartValue
            }
        }
        default:
            return state;
    }
};

export default MyCart;