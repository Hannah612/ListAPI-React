import { useEffect, useState } from "react";
import { getUsersList } from '../api.ts';
import type { User } from "../utils.ts";

const UsersList = () => {
  const [showUsersList, setShowUsersList] = useState<User[]>([]);
  const [showError, setShowError] = useState<string>();
  const [search, setSearch] = useState<string>(""); //search by user's name
  const [loading, setLoading] = useState<boolean>(false); 
  const [usersClicked, setUsersClicked] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const data = await getUsersList();
        setShowUsersList(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setShowError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [search]); 

  const toggleUser = (user: User) => {
    setUsersClicked(prev =>
      prev.some(u => u.email === user.email)
        ? prev.filter(u => u.email !== user.email) 
        : [...prev, user] 
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
              onChange={(e) => setSearch(e.target.value)} 
          />
      </div>
      {showError && <p className="font-bold m-5">{showError}</p>} 
      {loading ? 
        <p className="font-bold m-5">Loading...</p>
        : <ul className="m-5"> 
          {showUsersList
            .filter(user =>
              user.name.toLowerCase().includes(search.toLowerCase()) 
            )
            .map(user => {
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