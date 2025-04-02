import { AuthContext } from '../auth'; 
import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [editTask, setEditTask] = useState(null);
  

    const handleChange = (e) => {
      setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };
  

    const addTask = () => {
      if (!newTask.title || !newTask.description) return;
      
      const task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        date: new Date().toLocaleDateString(),
        completed: false,
      };
  
      setTasks([...tasks, task]);
      setNewTask({ title: "", description: "" });
    };
  

    const deleteTask = (id) => {
      setTasks(tasks.filter((task) => task.id !== id));
    };
  

    const toggleComplete = (id) => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    };
  

    const startEditing = (task) => {
      setEditTask(task);
    };
  
    const saveEdit = () => {
      setTasks(
        tasks.map((task) =>
          task.id === editTask.id ? { ...editTask } : task
        )
      );
      setEditTask(null);
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">Gestor de Tareas</h2>
  
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              placeholder="Título de la tarea"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none mb-2"
              required
            />
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleChange}
              placeholder="Descripción de la tarea"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
            <button
              onClick={addTask}
              className="w-full mt-3 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:outline-none"
            >
              Agregar Tarea
            </button>
          </div>
  
          <div className="space-y-4">
            {tasks.length === 0 && (
              <p className="text-gray-500 text-center">No hay tareas creadas.</p>
            )}
  
            {tasks.map((task) => (
              <div key={task.id} className={`p-4 rounded-lg flex justify-between items-center border ${task.completed ? "bg-green-200 border-green-400" : "bg-gray-100 border-gray-300"}`}>
                <div>
                  <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <span className="text-xs text-gray-500">Creado el {task.date}</span>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => toggleComplete(task.id)} className="text-green-500 hover:text-green-700">
                    {task.completed ? <FaTimesCircle size={20} /> : <FaCheckCircle size={20} />}
                  </button>
                  <button onClick={() => startEditing(task)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit size={20} />
                  </button>
  
                  <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
  
          {editTask && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-2xl font-bold text-gray-700 mb-4">Editar Tarea</h3>
                <input
                  type="text"
                  name="title"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none mb-2"
                />
                <textarea
                  name="description"
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setEditTask(null)}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveEdit}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default Home;
