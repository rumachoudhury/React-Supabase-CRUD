import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabaseClient";

function App() {
  const [todoList, setTodoList] = useState([]); //It means: “I will store a LIST of todos” thats why here [] (empty array)

  const [newTodo, setNewTodo] = useState(""); //It means: “I will store a SINGLE todo” thats why here "" (empty string)

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from(todoList).select("*"); //.select("*") → get all rows

    if (error) {
      console.error("Erroe fetching todos:", error);
    } else {
      setTodoList(data); //if success save data in todo list 
    }
  };

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    };

    const { data, error } = await supabase
      .from("TodoList")
      .insert([newTodoData])
      .single(); // TodoList from supabase table name and it return a single peace of data because we are inserting only one todo at a time

    if (error) {
      console.error("Error adding todo:", error);
    } else {
      setTodoList((prev) => [...prev, data]); // Update the local state with the new todo
      setNewTodo(""); // Clear the input field after adding the todo
    }
  };


  // Complete Task (UPDATE)
  const completedTask = async (id, isCompleted) => {
    const { data, error } = await supabase
      .from("TodoList")
      .update({ isCompleted: !isCompleted })
      .eq("id", id);

    if (error) {
      console.error("Error updating task:", error);
    } else {
      const updatedTodoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo,
      );
      setTodoList(updatedTodoList);
    }
  };

  const deleteTask = async(id) => {
    const {} = await supabase.from("TodoList").delete(.eq("id", id))

    if(error) {
      console.error("Error deleting task:", error)
    }else{
      setTodoList((prev) => (prev.filter((todo) => todo.id !==id)))
    }
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
          onChange={(e) => setNewTodo(e.target.value)}
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
          onClick={addTodo}
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
        {todoList.map((todo, index) => (
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
            <p> {todo.name}</p>
            <button onClick={() => completedTask(todo.id.isCompleted)}>
              {todo.isCompleted ? "Undo" : "Complete Task"}
            </button>

            <button onClick={() => deleteTask(todo.id)}>Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
