export function getLooked(id) {
    let looked = sessionStorage.getItem('looked');
    if (!looked) {
        sessionStorage.setItem('looked', '[]');
        looked = sessionStorage.getItem('looked');
    }
    const parsed = JSON.parse(looked);
    return id ? parsed.findIndex(i => i.id === id) + 1 : parsed;
}

export function setLooked(id, item) {
    const storage = getLooked();

    if (!storage) {
        sessionStorage.setItem('looked', '[]');
        setLooked(id, item);
        return;
    }

    if (storage.length === 10) {
        storage.pop();
    }

    const duplicate = storage.findIndex(i => i.id === id);
    duplicate !== -1 ? null : storage.unshift(item);
    sessionStorage.setItem('looked', JSON.stringify(storage));
}
