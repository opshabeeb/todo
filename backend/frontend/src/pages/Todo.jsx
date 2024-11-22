import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import MyContext from "../context/MyContext";
import Loader from "../components/Loader";

let id = sessionStorage.getItem("id");

const Todo = () => {
  const [todos, setTodos] = useState({ title: "", body: "" });
  const [todoList, setTodoList] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const context=useContext(MyContext)
  const {loading,setLoading}=context

  const [isVisible, setIsVisible] = useState(false);

  const handleAddFunction = async () => {
    if (todos.title === "" || todos.body === "") {
      toast.error("All fields are required");
    } else {
      if (id) {
        await axios
          .post(`${window.location.origin}/api/v2/addTask`, {
            title: todos.title,
            body: todos.body,
            id: id,
          })
          .then((res) => {
            console.log(res);
          });
        setTodoList([...todoList, todos]);
        setTodos({ title: "", body: "" });
        toast.success("your task is added");
        fetchList()
      } else {
        setTodoList([...todoList, todos]);
        setTodos({ title: "", body: "" });
        toast.success("your task is added");
        toast.error("your task is added but not saved");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodos((prev) => ({ ...prev, [name]: value }));
  };
  //
  const handleDelete = async (obj_id) => {
    if (id) {
      await axios
        .delete(`${window.location.origin}/api/v2/deleteTask/${obj_id}`, {
          data: { id: id },
        })
        .then((res) => {
          toast.success("your task is deleted");
          fetchList()
        });
    } else {
      toast.error("please login first");
    }
  };

  const fetchList = async () => {
    if (!id || id === "null") {
      console.error("Invalid ID:", id);
      return;
    }
    
    try {
      setLoading(true)
      const res = await axios.get(`${window.location.origin}/api/v2/getTask/${id}`);
      // const sortedTodos = res.data.todo.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTodoList(res.data.todo);
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchList();
  }, [id]);

  return (
    <>
      <div className="container font-sans px-5 py-6 flex flex-col justify-center items-center min-h-screen relative">
        <ToastContainer />
        <div className="bg-slate-300 px-6 py-5 w-full sm:w-3/4 lg:w-2/3 rounded-lg shadow-md ">
          {/* Header Section */}
          <div className="flex justify-center mb-5">
            <h1 className="text-2xl sm:text-3xl font-bold text-center">
              Todo App
            </h1>
          </div>

          {/* Input Section */}
          <div className="input flex flex-col gap-3 sm:gap-5">
            <input
              name="title"
              value={todos.title}
              onChange={handleChange}
              type="text"
              placeholder="Enter the title"
              className="px-4 py-2 rounded-md shadow-sm border border-gray-300"
            />
            <textarea
              name="body"
              value={todos.body}
              onChange={handleChange}
              placeholder="Enter the body"
              className="px-4 py-2 rounded-md shadow-sm border border-gray-300"
            ></textarea>
            <button
              onClick={handleAddFunction}
              className="px-4 py-2 rounded-md shadow font-bold text-lg sm:text-xl bg-slate-100 hover:bg-slate-200 transition"
            >
              Add
            </button>
          </div>
        </div>
        {/* Todos Section */}
        <div className="flex w-full">
          <div className="todos mt-10 w-full">
            <div className="flex justify-center mb-3">
              <h1 className="text-xl sm:text-2xl font-bold">Todos List</h1>
            </div>
            {
              loading?
              <div className="flex justify-center top-10">
                <Loader/>
              </div>
              :
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 px-4">
              {todoList?.length <= 0 ? (
                <h1 className="text-gray-500 text-lg col-span-full text-center">
                  No Records Found
                </h1>
              ) : (
                todoList?.map((todo, index) => (
                  <div
                    key={index}
                    className="p-6  bg-white shadow-lg rounded-lg flex flex-col justify-between overflow-hidden h-44 sm:h-auto mb-4"
                  >
                    <h2 className="text-xl font-bold truncate">
                      {todo?.title}
                    </h2>
                    <p className="text-gray-700 text-lg truncate">
                      {todo?.body}
                    </p>
                    <div className="flex w-full gap-x-4 border-t">
                      <p
                        onClick={() => {
                          setSelectedTodo(todo); // Example action
                          setIsVisible(!isVisible); // Example toggle
                          console.log(selectedTodo);
                        }}
                        className="w-1/2 flex items-center gap-x-2 border-r text-blue-600 cursor-pointer"
                      >
                        edit <FaEdit />
                      </p>
                      <p
                        onClick={() => handleDelete(todo?._id)}
                        className="w-1/2 flex items-center gap-x-2 text-red-500 cursor-pointer"
                      >
                        delete <MdDelete />
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            }
            
          </div>
        </div>
      </div>
      <div className={`${isVisible ? "block" : "hidden"}`}>
        <div className="todo-update absolute top-24 left-0  w-full h-auto flex justify-center">
          <div className="conatiner p-10 flex justify-center bg-slate-300 w-4/5">
            <Update
             setIsVisible={setIsVisible} 
             selectedTodo={selectedTodo}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
