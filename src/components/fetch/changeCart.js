import fetchData from './fetchData';

function changeCart(id, size, amount) {
    const json = {
        id,
        size,
        amount,
    };

    let cart = localStorage.getItem('cartId');
    if (cart === null) cart = '';
    return fetchData(`cart/${cart}`, 'POST', json)
        .then(res => {
            localStorage.setItem('cartId', res.data.id);
            return res;
        })
        .catch(err => console.log(err));
}

export default changeCart;
