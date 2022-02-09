import React from "react";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
const initialState = {
  name: "",
  age: "",
};
const AddData = () => {
  const userCollection = collection(db, "users");
  const [state, setState] = useState(initialState);
  const {name, age} = state;
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    if(id){
    const docRef = doc(userCollection, id);
    const getUsers = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setState({...docSnap.data()});
      } else {
        console.log("No such document!");
        setState({...initialState});
      }
    };
    getUsers();
  }
  }, [id, userCollection]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age) {
      toast.error("Please provide value in each input");
    } else {
      if (!id) {
        await addDoc(userCollection, { name: name, age: Number(age) })
          .catch((err) => {
            toast.error(err);
          })
          .then(() => {
            toast.success("contact added");
          });

        setTimeout(() => history.push("/"), 500);
      } else {
        const userRef = doc(userCollection, id)
        try{
          await updateDoc(userRef, {
            name: name,
            age: Number(age)
          })
        } catch (err) {
          alert(err)
        }
        setTimeout(() => history.push("/"), 500);
      }
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
          value={name || ""}
          onChange={handleOnChange}
        ></input>
        <label htmlFor="age">Age : </label>
        <input
          type="text"
          id="age"
          name="age"
          placeholder="Enter age"
          value={age || ""}
          onChange={handleOnChange}
        ></input>
        <input type="submit" value={id ? "Update" : "Save"}></input>
      </form>
    </div>
  );
};
export default AddData;
