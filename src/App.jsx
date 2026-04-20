import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabaseClient";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true); // start waiting
    const { data, error } = await supabase.from("TodoList").select("*");

    if (!error) setTodoList(data);
    setLoading(false); // done loading
  };

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    };

    const { data, error } = await supabase
      .from("TodoList")
      .insert([newTodoData])
      .single();

    if (!error) {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }
  };

  // Complete Task (UPDATE)
  const completedTask = async (id, isCompleted) => {
    await supabase
      .from("TodoList")
      .update({ isCompleted: !isCompleted })
      .eq("id", id); //meaning isCompleted: !isCompleted  is if isCompleted is true then it will be false and if isCompleted is false then it will be true

    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo,
      ),
    );
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("TodoList").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
      return;
    }

    setTodoList((prev) => prev.filter((todo) => todo.id !== id)); //filter is used because filter is used to remove the deleted task from the todo list and it return a new array without the deleted task
  };

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <div className="inputBox">
            <input
              type="text"
              placeholder="New Todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="input"
            />

            <button className="addBtn" onClick={addTodo}>
              Add Todo
            </button>
          </div>

          <ul className="list">
            {todoList.map((todo) => (
              <li key={todo.id} className="card">
                <p className={todo.isCompleted ? "done" : ""}>{todo.name}</p>

                <div className="btnGroup">
                  <button
                    className="btn complete"
                    onClick={() => completedTask(todo.id, todo.isCompleted)}
                  >
                    {todo.isCompleted ? "Undo" : "Complete"}
                  </button>

                  <button
                    className="btn delete"
                    onClick={() => deleteTask(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
