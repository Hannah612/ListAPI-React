import type { User } from "./utils";

export async function getUsersList() : Promise<User[]> {
    const usersList = await fetch('https://jsonplaceholder.typicode.com/users');

    if (usersList.ok) {
        const data = await usersList.json();
        const relevantData : User[] = data.map((user: { name: string; email: string; address: { city: string; }; phone: number }) => ({
            name: user.name,
            email: user.email,
            city: user.address.city,
            phone: user.phone
        }));
        return relevantData;
    } 
    throw new Error ("Something went wrong "+ usersList.json() + ". Please try again.");
}
