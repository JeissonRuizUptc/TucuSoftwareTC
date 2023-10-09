import React, { useState } from "react";
import './Styles/LoginPage.css';
import userData from '../db/Users.json';

const LoginPage = () => {
    const [username, setUsername] = useState(""); // Estado para el nombre de usuario
    const [password, setPassword] = useState(""); // Estado para la contraseña
    const [error, setError] = useState(""); // Estado para mensajes de error

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Realiza una llamada a la API para verificar las credenciales
        try {
            const response = await fetch("http://localhost:3200/api/login", {
                method: "POST", // o "GET" dependiendo de tu API
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // Si las credenciales son válidas, puedes redirigir o realizar alguna acción deseada
                    setError("");
                    console.log("Inicio de sesión exitoso");
                    
                } else {
                    // Si las credenciales no son válidas, muestra un mensaje de error
                    setError("");
                    setError("Credenciales incorrectas");
                }
            } else {
                setError("");
                setError("Error en la solicitud");
            }
        } catch (error) {
            console.error("Error de red:", error);
            setError("Error de red");
        }
    };

    return (
        <div className="LoginContainer">
            <div className="LoginContainer-card">
                <div className="LoginContainer-card__formContainer max-w-xs">
                    <form className="LoginContainer-card__form bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <h1>Bienvenido de nuevo</h1>
                        <h1>Tucu</h1>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Usuario / Correo electrónico
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="**********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center mb-4">
                            <input
                                id="default-checkbox"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-black">
                                Recuérdame
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                        <p className="register">
                            ¿Aún no tienes una cuenta? <a href="">Regístrate</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
