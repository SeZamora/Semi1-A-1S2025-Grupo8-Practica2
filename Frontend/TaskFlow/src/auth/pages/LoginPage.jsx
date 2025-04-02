import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import { login as LoginHelper } from '../helpers/actions'
import { ToastContainer, toast } from 'react-toastify';

export const LoginPage = () => {
  const { login } = useContext(AuthContext);  
  const [credenciales, setCredenciales] = useState({ username: '', contrasena: '' });
  const [error, setError] = useState(null);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales((prevCredenciales) => ({
      ...prevCredenciales,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      usuario: credenciales.username,
      password: credenciales.contrasena,
    };
    const respuesta = await LoginHelper(data);
    console.log(respuesta);
    setError(null); 
    if (!respuesta.exito) {
      notifyError("Usuario y/o contraseña son incorrectas.");
      setError(respuesta.mensaje);
    } else {
      notifySuccess(" Bienvenido " + respuesta.usuario.usuario + "!" );
      login(respuesta.usuario.usuario, respuesta.usuario.id); 

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Iniciar sesión</h2>

        {error && <div className="bg-red-500 text-white p-2 rounded-lg mb-4">{error}</div>} {/* Mostrar error si existe */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="correo" className="block text-sm font-medium text-gray-600">Usuario</label>
            <input
              type="username"
              id="username"
              name="username"
              value={credenciales.username}
              onChange={handleChange}
              placeholder="username"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={credenciales.contrasena}
              onChange={handleChange}
              placeholder="Tu contraseña"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">¿No tienes cuenta? <a href="/register" className="text-indigo-600 hover:text-indigo-700">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
};
