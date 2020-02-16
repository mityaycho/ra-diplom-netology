import fetchData from './fetchData';

export function getCategories() {
    return fetchData('categories');
}

export function getProducts(request = '') {
    return fetchData(`products/${request}`);
}

export function getItem(id) {
    return fetchData(`products/${id}`);
}

export function getCart() {
    return fetchData(`cart/${localStorage.getItem('cartId')}`);
}

export function getFeatures() {
    return fetchData('featured');
}

export function getFilters() {
    return fetchData('filters');
}
