export const addToCart = (item) => {
    return {
        type: 'add',
        item
    }
}

export const incrememntQty = (item) => {
    return {
        type: 'increment',
        item
    }
}

export const decrementQty = (item) => {
    return {
        type: 'decrement',
        item
    }
}