import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./Firebase-Config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [toggle, setToggle] = useState(false);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { username: UserName, password: Password });
  };

  const updateUser = async (id, password) => {
    const userDoc = doc(db, "users", id);
    const newFields = { password: newPassword };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
   getUsers();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Name..."
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <input
        placeholder="Password..."
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={createUser}> Create User</button>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Name: {user.username}</h1>
            <h1>Password: {user.password}</h1>
            <button
              onClick={() => {
                setToggle((prev) => !prev);
              }}
            >
              {" "}
              Change Password
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Delete User
            </button>
            <div className={`${!toggle ? "hidden" : "flex"}`}>
              <input
                placeholder="Password..."
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              />
              <button
              onClick={() => {
                updateUser(user.id, user.newPassword);
              }}
            >confirm</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
