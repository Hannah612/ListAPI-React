import { useEffect, useState } from "react";
import { getUsersList, type User } from '../api.ts';

const UsersList = () => {
  const [showUsersList, setShowUsersList] = useState<User[]>([]);
  const [search, setSearch] = useState<string>(""); //search by user's name
  const [loading, setLoading] = useState<boolean>(false); 
  const [usersClicked, setUsersClicked] = useState<User[]>([]);

  //grab the data from the api (assuming the data will change)
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const data = await getUsersList();
        setShowUsersList(data);
      } catch (error) {
        console.error('Error fetching users: ', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [search]); 

  const toggleUser = (user: User) => {
    setUsersClicked(prev =>
      prev.some(u => u.email === user.email) //find user via email (assuming email is unique)
        ? prev.filter(u => u.email !== user.email) //filter out the user if they're already in the selected list (deselect them)
        : [...prev, user] //add the user to the list of previous users if not found in the selected list (select them)
    );
  };

  return <section
        id="userList"
        className="md:h-[600px] md:pb-0" 
    >
      <div className="flex m-5">
          <input
              id="searchBar"
              className="w-3/5 rounded-sm mr-3 text-black"
              type="text"
              placeholder="Search by Name..."
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)} //this will store the search query
          />
      </div>

      {loading ? 
        <p className="font-bold m-5">Loading...</p>
        : <ul className="m-5"> 
          {showUsersList
            .filter(user =>
              user.name.toLowerCase().includes(search.toLowerCase()) //first filter, then display using map
            )
            .map(user =>{
              const isSelected = usersClicked.some(u => u.email === user.email);
              return (
                <li key={user.name}>
                  <button 
                    className="font-bold"
                    onClick={() => toggleUser(user)}
                  >
                    Name: {user.name}
                  </button>
                  <p>Email: {user.email}</p>
                  { isSelected ? 
                    <>
                        <p>City: {user.city}</p>
                        <p className="mb-5">Phone: {user.phone}</p>
                    </>
                  : 
                    <p className="mb-5">City: {user.city}</p>
                  }
                </li>
              )
            } 
            )}
        </ul>
      }
  </section>
}

export default UsersList;