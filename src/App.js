import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Navbar/Header";
import Home from "./components/Home/Home";
import Todo_list from "./components/create_task/Todo_list";
import Edit_task from "./components/edit_task/Edit_task";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Todo_list />} />
        <Route path="/edit/:id" element={<Edit_task />} />
      </Routes>
    </div>
  );
}

export default App;
