import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"; // Importa el hook useHistory
import './Styles/Dashboard.css';
import DashboardStart from "../Sections/DashboardStart";
import DashboardCreateOrder from "../Sections/DashboardCreateOrder";

const Dashboard = ({ sesionIniciada, setSesionIniciada }) => {
    const navigate = useNavigate(); // Obtiene la instancia de useHistory
    const handleLogout = () => {
        // Cerrar sesión: Establecer la variable sesionIniciada en false
        setSesionIniciada(false);

        // Borrar el estado de la sesión del almacenamiento local
        localStorage.setItem("sesionIniciada", "false");

        navigate("/");
    };

    const [selectedComponent, setSelectedComponent] = useState("DashboardCreateOrder");

    const handleComponentChange = (componentName) => {
        setSelectedComponent(componentName);
    };

    console.log(sesionIniciada);
    if (!sesionIniciada) {
        // Si sesionIniciada es falso, redirige al usuario a la página de inicio
        return <Navigate to="/" />;
    }


    return (
        <div className="dashboardContainer">
            <div className="dashboardHeaderSection">
                <div className="dashboardHeader">
                    <div className="dashboardHeader-dateUser">
                        <h1>commercial name</h1>
                        <p>User name</p>
                    </div>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={handleLogout} // Agrega el manejador de eventos para cerrar sesión
                    >
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                <div className="dashboardHeaderSection_container" >
                {selectedComponent === "DashboardCreateOrder" ? (
                        <DashboardCreateOrder />
                    ) : (
                        <DashboardStart />
                    )}
                </div>
            </div>
            <div className="dashboardNav">
                <h1>Tucu</h1>
                <div className="dashboardNav-items">
                    
                    <a href="#" onClick={() => handleComponentChange("DashboardStart")}>
                        <p>Inicio</p>
                    </a>
                    <a href="" onClick={() => handleComponentChange("DashboardCreateOrder")}>
                        <p>Crear Pedido</p>
                    </a>
                    <a href=""><p>Seguimiento</p></a>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={handleLogout} // Agrega el manejador de eventos para cerrar sesión
                    > Cerrar Sesion</button>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;
