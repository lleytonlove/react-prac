import { useState } from "react";

// git push
function App() {
  const [todo, setTodo] = useState("");
  const changeTodo = (event) => setTodo(event.target.value);

  const [todos, setTodos] = useState([]);

  const submitForm = (event) => {
    event.preventDefault();
    if ((todo || "") === "") {
      return;
    }
    setTodos(currentArray => [todo, ...currentArray])
    setTodo("");
  }
  return (
    <div>
      <h1>My ToDo ({todos.length})</h1>
      <form onSubmit={submitForm}>
        <input onChange={changeTodo} value={todo} type="text" placeholder="Write your to do..." />
        <button>Add To Do</button>
      </form>
      <hr />
      <ls>
        {
          todos.map((item, index) => 
            <li key={index}>{item}</li>
          )
        }
      </ls>
    </div>
  );
}

export default App;
