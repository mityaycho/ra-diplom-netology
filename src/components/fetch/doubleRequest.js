import {
    getCategories,
    getProducts,
    getItem,
    getCart,
    getFeatures,
    getFilters,
} from './gettingRequests';

const request = {
    categories: getCategories,
    products: getProducts,
    item: getItem,
    cart: getCart,
    featured: getFeatures,
    filters: getFilters,
};

const checkObject = el => {
    if (typeof el === 'object') {
        return { name: el[0], params: el[1] };
    }
    return { name: el };
};

const getParams = (firstParam, secondParam) => {
    firstParam = checkObject(firstParam);
    secondParam = checkObject(secondParam);

    let firstFetch, secondFetch;

    if (firstParam.params) {
        firstFetch = request[firstParam.name](firstParam.params);
    } else {
        firstFetch = request[firstParam.name]();
    }

    if (secondParam.params) {
        secondFetch = request[secondParam.name](secondParam.params);
    } else {
        secondFetch = request[secondParam.name]();
    }

    const doubleRequest = {};
    doubleRequest[firstParam.name] = {};
    doubleRequest[secondParam.name] = {};

    return Promise.all([firstFetch, secondFetch]).then(values => {
        doubleRequest[firstParam.name] = values[0];
        doubleRequest[secondParam.name] = values[1];
        return doubleRequest;
    });
};

export default getParams;
