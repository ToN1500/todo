"use client";
import { Todo } from "@/models/model";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const api_url = "https://66c3f9a2b026f3cc6ceda0db.mockapi.io/todo";
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const fetchTodos = async () => {
    const response = await fetch(api_url);
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTodo,
        completed: false,
      }),
    });
    const data = await response.json();
    setTodos([...todos, data]);
    setNewTodo("");
  };

  const deleteTodo = async (id: string) => {
    await fetch(`${api_url}/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main>
      <h1 className="text-3xl font-semibold text-center mt-8">Todo List</h1>

      <form
        className="flex items-center justify-center mt-8"
        onSubmit={addTodo}
      >
        <input
          type="text"
          className="w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add
        </button>
      </form>
      <ul className="mt-8 bg-white shadow-lg rounded-lg w-3/4 mx-auto">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between px-6 py-4 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="text-lg font-medium text-gray-800">
              {todo.title}
            </span>

            <button
              className="text-red-500 hover:text-red-600 transition-colors duration-200"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}