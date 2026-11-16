import type { User } from "@/types/user";

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function fetchUsers(): Promise<User[]> {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error("Error al obtener usuarios");

    }
    return res.json();
}