const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function fetchUsers() {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error(`Error al obtener usuarios (HTTP ${res.status})`);
    }
    return res.json();
}