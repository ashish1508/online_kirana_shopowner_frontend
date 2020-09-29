export const cart = (payload) => ({
    type: 'CART',
    payload
});

export const setorderid = (id) => ({
    type:"ORDERID",
    id
})

export const getorders = (payload) => ({
    type:"GET_ORDERS",
    payload
})

export const addtoorders = (payload) => ({
    type:"ADD_TO_ORDERS",
    payload
})

export const makecurrent = (payload) => ({
    type:"MAKE_CURRENT",
    payload
})