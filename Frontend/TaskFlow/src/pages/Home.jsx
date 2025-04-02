import React, { useState } from "react";

const mockTasks = [
  { id: 1, title: "Comprar insumos", description: "Adquirir materiales de oficina", date: "2025-04-01", completed: 1 },
  { id: 2, title: "Revisión de código", description: "Revisar el pull request del equipo", date: "2025-04-02", completed: 0 },
  { id: 3, title: "Reunión con el equipo", description: "Discutir avances del sprint", date: "2025-04-03", completed: 1 },
  { id: 4, title: "Actualizar documentación", description: "Refrescar la documentación del API", date: "2025-04-04", completed: 0 }
];

export const Home = () => {
  const [tasks, setTasks] = useState(mockTasks);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">Gestión de Tareas</h2>

        {/* Formulario para agregar tarea */}
        <div className="bg-gray-200 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Nueva Tarea</h3>
          <input
            type="text"
            placeholder="Título"
            className="w-full p-2 mt-2 border rounded-lg"
          />
          <textarea
            placeholder="Descripción"
            className="w-full p-2 mt-2 border rounded-lg"
          ></textarea>
          <button
            className="w-full bg-blue-500 text-white py-2 mt-3 rounded-lg hover:bg-blue-600"
          >
            Agregar Tarea
          </button>
        </div>

        {/* Lista de Tareas en Grid (2 columnas en pantallas grandes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-lg border ${task.completed ? "bg-green-200 border-green-400" : "bg-gray-100 border-gray-300"}`}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">#{task.id} - {task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <span className="text-xs text-gray-500">Fecha de Creación: {task.date}</span>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end mt-3 space-x-2">
                <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Editar</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">Eliminar</button>
                <button className={`px-3 py-1 rounded-lg text-white ${task.completed ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600"}`}>
                  {task.completed ? "Desmarcar" : "Completar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
