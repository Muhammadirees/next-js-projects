"use client";

import Todo from "@/components/Todo";
import axios from "axios";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [todoData, setTodoData] = useState([]);

  const onChangeHandler = (e) => {
    const name = e.target?.name;
    const value = e.target?.value;

    setFormData((form) => ({ ...form, [name]: value }));
  };

  const fetchTodos = async () => {
    const response = await axios("/api");
    setTodoData(response?.data?.todos);
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete("/api", {
      params: {
        mongoId: id,
      },
    });
    toast.success(response.data.msg);
    fetchTodos();
  };
  const completeTodo = async (id) => {
    const response = await axios.put(
      "/api",
      {},
      {
        params: {
          mongoId: id,
        },
      }
    );
    toast.success(response.data.msg);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onSubmitHandler = async (e) => {
    try {
      const response = await axios.post("/api", formData);
      toast.success(response.data.msg);
      setFormData({
        title: "",
        description: "",
      });
      fetchTodos();
    } catch (error) {
      toast.error("Somthing went wrong!!");
    }
  };

  return (
    <>
      <ToastContainer theme="dark" pauseOnFocusLoss={false} />
      <form
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
        action={onSubmitHandler}
      >
        <input
          type="text"
          onChange={onChangeHandler}
          value={formData.title}
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 w-full border-2"
        />
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={formData.description}
          placeholder="Enter Description"
          className="px-3 py-2 w-full border-2"
        ></textarea>
        <button type="submit" className="bg-orange-700 px-11 py-3 text-white">
          Add Todo
        </button>
      </form>
      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto mb-12">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className={`px-6 py-3`}>
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="transition-all duration-1000">
            {todoData.map((item, index) => {
              return (
                <Todo
                  key={item._id}
                  id={index}
                  title={item.title}
                  description={item.description}
                  completed={item.isCompleted}
                  mongoId={item._id}
                  deleteTodo={deleteTodo}
                  completeTodo={completeTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
