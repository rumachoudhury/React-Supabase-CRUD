import { useState } from "react";
import "./App.css";
import { supabase } from "./supabaseClient";

function App() {
  const [todos, setTodos] = useState([]); //It means: “I will store a LIST of todos” thats why here [] (empty array)

  const [newTodo, setNewTodo] = useState(""); //It means: “I will store a SINGLE todo” thats why here "" (empty string)

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    };

    const {} = await supabase.form("TodoList").insert([newTodoData]).single(); // TodoList from supabase table name and it return a single peace of data because we are inserting only one todo at a time
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        backgroundColor: "#f0f0f0",
        minHeight: "200px",
        boxShadow: "0 4px 8px rgba(224, 137, 137, 0.1)",
        width: "400px",
        margin: "40px auto",
        borderRadius: "10px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>Todo List</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="New Todo..."
          onChange={(e) => setTodos(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            outline: "none",
          }}
        />

        <button
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Todo
        </button>
      </div>

      <ul
        style={{
          marginTop: "30px",
          listStyle: "none",
          padding: 0,
          textAlign: "center",
        }}
      >
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              background: "#f5f5f5",
              margin: "8px auto",
              padding: "10px",
              width: "300px",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
