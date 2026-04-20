// import { useEffect, useState } from "react";
// import "./App.css";
// import { supabase } from "./supabaseClient";

// import { signIn, signOut, signUp, getUser } from "./api/auth";

// function App() {
//   const [todoList, setTodoList] = useState([]);
//   const [newTodo, setNewTodo] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [user, setUser] = useState(null);

//   // const fetchTodos = async () => {
//   //   setLoading(true); // start waiting
//   //   const { data, error } = await supabase.from("TodoList").select("*");

//   //   if (!error) setTodoList(data);
//   //   setLoading(false); // done loading
//   // };

//   // useEffect(() => {
//   //   fetchTodos();
//   // }, []);

//   useEffect(() => {
//     const loadUser = async () => {
//       const currentUser = await getUser();
//       setUser(currentUser);
//     };

//     loadUser();
//   }, []);

//   useEffect(() => {
//     const fetchTodos = async () => {
//       const { data, error } = await supabase.from("TodoList").select("*");

//       if (!error) {
//         setTodoList(data);
//       }
//       setLoading(false);
//     };

//     fetchTodos();
//   }, []);

//   const addTodo = async () => {
//     const newTodoData = {
//       name: newTodo,
//       isCompleted: false,
//     };

//     const { data, error } = await supabase
//       .from("TodoList")
//       .insert([newTodoData])
//       .single();

//     if (!error) {
//       setTodoList((prev) => [...prev, data]);
//       setNewTodo("");
//     }
//   };

//   // Complete Task (UPDATE)
//   const completedTask = async (id, isCompleted) => {
//     await supabase
//       .from("TodoList")
//       .update({ isCompleted: !isCompleted })
//       .eq("id", id); //meaning isCompleted: !isCompleted  is if isCompleted is true then it will be false and if isCompleted is false then it will be true

//     setTodoList((prev) =>
//       prev.map((todo) =>
//         todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo,
//       ),
//     );
//   };

//   const deleteTask = async (id) => {
//     const { error } = await supabase.from("TodoList").delete().eq("id", id);

//     if (error) {
//       console.error("Error deleting task:", error);
//       return;
//     }

//     setTodoList((prev) => prev.filter((todo) => todo.id !== id)); //filter is used because filter is used to remove the deleted task from the todo list and it return a new array without the deleted task
//   };

//   return (
//     <div className="container">
//       <h1 className="title">My Todo List</h1>

//       {loading ? (
//         <p className="loading">Loading...</p>
//       ) : (
//         <>
//           <div className="inputBox">
//             <input
//               type="text"
//               placeholder="New Todo..."
//               value={newTodo}
//               onChange={(e) => setNewTodo(e.target.value)}
//               className="input"
//             />

//             <button className="addBtn" onClick={addTodo}>
//               Add Your Todo
//             </button>
//           </div>

//           <ul className="list">
//             {todoList.map((todo) => (
//               <li key={todo.id} className="card">
//                 <p className={todo.isCompleted ? "done" : ""}>{todo.name}</p>

//                 <div className="btnGroup">
//                   <button
//                     className="btn complete"
//                     onClick={() => completedTask(todo.id, todo.isCompleted)}
//                   >
//                     {todo.isCompleted ? "Undo" : "Complete"}
//                   </button>

//                   <button
//                     className="btn delete"
//                     onClick={() => deleteTask(todo.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

// ------------------------------------
import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabaseClient";
import { signOut, getUser } from "./api/auth";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // 🔐 Load user
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    };

    loadUser();
  }, []);

  // 📦 Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("TodoList").select("*");

      if (!error) {
        setTodoList(data);
      }

      setLoading(false);
    };

    fetchTodos();
  }, []);

  // ➕ Add Todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const { data, error } = await supabase
      .from("TodoList")
      .insert([{ name: newTodo, isCompleted: false }])
      .single();

    if (!error && data) {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }
  };

  // ✅ Toggle Complete
  const completedTask = async (id, isCompleted) => {
    await supabase
      .from("TodoList")
      .update({ isCompleted: !isCompleted })
      .eq("id", id);

    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo,
      ),
    );
  };

  // ❌ Delete Todo
  const deleteTask = async (id) => {
    const { error } = await supabase.from("TodoList").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return;
    }

    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">My Todo List</h1>

      {/* 🔐 User Info */}
      {user && (
        <div className="userBox">
          <p>Logged in as: {user.email}</p>

          <button onClick={signOut} className="btn logout">
            Logout
          </button>
        </div>
      )}

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
