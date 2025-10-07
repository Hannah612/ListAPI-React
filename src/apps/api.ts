import type { User } from "./utils";

export async function getUsersList() : Promise<User[]> {
    const usersList = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await usersList.json();

    if (usersList.ok) {
        const relevantData : User[] = data.map((user: { name: string; email: string; address: { city: string; }; phone: number }) => ({
            name: user.name,
            email: user.email,
            city: user.address.city,
            phone: user.phone
        }));
        return relevantData;
    } 
    throw new Error (usersList.status + " - Something went wrong. Please try again.");
}
