import { useState } from "react";
import "./App.css";
import { SupabaseClient } from "@supabase/supabase-js";

function App() {
  const [todos, setTodos] = useState([]);
  return (
    <div className="App">
      <h1>Todo List</h1>

      <div>
        <input type="text" placeholder="New Todo..." />
        <button>Add Todo</button>
      </div>

      <ul></ul>
    </div>
  );
}

export default App;
