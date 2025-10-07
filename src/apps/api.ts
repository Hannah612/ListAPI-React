export async function getUsersList() : Promise<User[]> {
    const usersList = await fetch('https://jsonplaceholder.typicode.com/users');

    if (usersList.ok) {
        //fetch was successful, return it 
        const data = await usersList.json();
        //just return the relevant data 
        const relevantData : User[] = data.map((user: { name: string; email: string; address: { city: string; }; phone: number }) => ({
            name: user.name,
            email: user.email,
            city: user.address.city,
            phone: user.phone
        }));
        return relevantData;
    } 
    //not ok, return an error 
    throw new Error ("Something went wrong "+ usersList.json() + ". Please try again.");
}

export type User = {
  name: string;
  email: string;
  city: string;
  phone: number;
};
