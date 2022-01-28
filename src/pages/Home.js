import React from "react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
const Home = () => {
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
    }
  };
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>S#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data, index) => {
            return (
              <tr key={data.id}>
                <td scope="row">{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.age}</td>
                <td>
                  <Link to={`/AddEdit/${data.id}`}>
                    <button> Edit</button>
                  </Link>
                  <button
                    onClick={() => {
                      deleteUser(data.id);
                    }}
                  >
                    {" "}
                    Delete User
                  </button>
                  <Link to={`/view/${data.id}`}>
                    <button> View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
