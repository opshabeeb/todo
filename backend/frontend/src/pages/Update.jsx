import { React, useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Update = ({ setIsVisible, selectedTodo }) => {
  const [todo, setTodo] = useState({
    
    title:'',
    body:''
  });

  const change = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };
  const handleUpdateFunction=async()=>{

    try {
      await axios.put(`${window.location.origin}/api/v2/updateTask/${selectedTodo._id}`,todo)
      .then((res)=>{
        toast.success(res.data.message)
      })
    } catch (error) {
      console.log(error)
    }
     console.log(todo)
  };

   useEffect(() => {
     setTodo({
      title: selectedTodo?.title ,
      body: selectedTodo?.body
     })
   }, [selectedTodo])
   
  return (
    <div className="w-2/3 bg-slate-200 flex flex-col justify-center py-5 rounded-md">
      <ToastContainer/>
      <div className="title flex justify-center">
        <h1 className="text-3xl font-bold">Update Todo</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <div className="mb-3 m-4">
          <label htmlFor="title">Title:</label>
          <input
            onChange={change}
            value={todo.title}
            type="text"
            placeholder="Enter title"
            name="title"
            className="w-full py-2 rounded-md"
          />
        </div>
        <div className="mb-3 m-4">
          <label htmlFor="body">Body:</label>
          <textarea
            onChange={change}
            value={todo.body}
            placeholder="Enter body"
            name="body"
            rows={3}
            className="w-full py-2 rounded-md"
          />
        </div>
        <div className="mb-3 m-4">
          <button onClick={handleUpdateFunction}
            type="submit"
            className="bg-blue-300 w-full py-3 rounded-md mb-3"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="bg-red-300 w-full py-3 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
