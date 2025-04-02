import { useState } from "react";

export const CloudDrive = () => {
  const [files, setFiles] = useState([
    { id: 1, name: "imagen1.jpg", type: "Imagen" },
    { id: 2, name: "documento.txt", type: "Texto" },
  ]);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const newFile = {
        id: files.length + 1,
        name: uploadedFile.name,
        type: uploadedFile.type.includes("image") ? "Imagen" : "Texto",
      };
      setFiles([...files, newFile]);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Gestor de Archivos</h1>
      
      <div className="mb-4 flex justify-between items-center">
        <input type="file" onChange={handleFileUpload} className="hidden" id="fileInput" />
        <label htmlFor="fileInput" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
          Subir Archivo
        </label>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {files.map((file) => (
          <div key={file.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <p className="text-lg font-semibold">{file.name}</p>
            <p className="text-sm text-gray-600">Tipo: {file.type}</p>
            <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Ver</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloudDrive;
