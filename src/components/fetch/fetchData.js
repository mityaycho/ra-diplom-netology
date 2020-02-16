function fetchData(url, type = 'GET', body) {
    const params = {};
    if (type === 'POST') {
        params.body = JSON.stringify(body);
        params.headers = new Headers({ 'Content-Type': 'application/json' });
        params.method = 'POST';
    }

    return fetch(`https://api-neto.herokuapp.com/bosa-noga/${url}`, params)
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .catch(err => console.log(err));
}

export default fetchData;
