import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text) return alert("Enter task");

    await axios.post("http://localhost:5000/todos/add", {
      title: text,
    });

    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  // ✅ FIXED EDIT (pre-filled value)
  const updateTodo = async (todo) => {
    const newText = prompt("Edit task:", todo.title);

    if (!newText) return;

    await axios.put(`http://localhost:5000/todos/${todo._id}`, {
      title: newText,
    });

    fetchTodos();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Todo App</h2>

        <div style={styles.inputBox}>
          <input
            style={styles.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your task..."
          />
          <button style={styles.addBtn} onClick={addTodo}>
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {todos.map((todo) => (
            <li key={todo._id} style={styles.item}>
              <span>{todo.title}</span>

              <div>
                <button
                  style={styles.editBtn}
                  onClick={() => updateTodo(todo)}   // ✅ FIXED HERE
                >
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addBtn: {
    background: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  editBtn: {
    marginRight: "10px",
    background: "#2196F3",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;