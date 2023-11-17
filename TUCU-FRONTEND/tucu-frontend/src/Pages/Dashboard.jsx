import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Styles/Dashboard.css';
import DashboardStart from "../Sections/DashboardStart";
import DashboardCreateOrder from "../Sections/DashboardCreateOrder";
import DeliveryTable from "../Sections/DeliveryTable"; // Importa el componente DeliveryTable
import DeliveryHistory from "../Sections/DeliveryHistory";

const Dashboard = ({ sesionIniciada, setSesionIniciada }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga del componente
    const [selectedComponent, setSelectedComponent] = useState("DashboardStart"); // Nuevo estado para el componente seleccionado
    const [deliveryData, setDeliveryData] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (sesionIniciada && storedToken) {
            setToken(storedToken);

            const parts = storedToken.split(".");
            if (parts.length === 3) {
                const payloadBase64 = parts[1];
                const payloadDecoded = atob(payloadBase64);
                const payloadJson = JSON.parse(payloadDecoded);

                if (payloadJson.userId) {
                    // Hacer una solicitud HTTP para obtener los datos del usuario y la tienda
                    fetch(`http://localhost:3200/api/user_store/${payloadJson.userId}`)
                        .then(response => response.json())
                        .then(data => {
                            setUserData(data);
                            setLoading(false); // Marcar la carga como completa
                        })
                        .catch(error => {
                            console.error("Error al obtener los datos del usuario:", error);
                            setLoading(false); // Marcar la carga como completa, incluso si hay un error
                        });
                } else {
                    setUserData(payloadJson);
                    setLoading(false); // Marcar la carga como completa
                }
            }
        } else {
            navigate("/");
        }
    }, [sesionIniciada, navigate]);

    const handleLogout = () => {
        setSesionIniciada(false);
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleComponentChange = (componentName) => {
        setSelectedComponent(componentName);
    };

    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case "DashboardCreateOrder":
                return <DashboardCreateOrder />;
            case "DeliveryHistory":
                return <DeliveryHistory />;
            case "DeliveryTable":
                return <DeliveryTable userId={userData ? userData.idUSERS : ""}/>;
            default:
                return <DashboardStart />;
        }
    };

    if (!sesionIniciada) {
        return <Navigate to="/" />;
    }

    // Si la carga no ha finalizado, muestra un mensaje de carga o un componente de carga
    if (loading) {
        return <div>Cargando...</div>;
    }



    return (
        <div className="dashboardContainer">
            <div className="dashboardHeaderSection">
                <div className="dashboardHeader">
                    <div><p></p></div>
                    <div> <h1>{userData && userData.STORES ? userData.STORES.name : "Nombre Comercial"}</h1></div>
                    <div className="dashboardHeader-dateUser__user">

                        <p>{userData ? userData.firstname : "Nombre de Usuario"}</p>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                            onClick={handleLogout} // Agrega el manejador de eventos para cerrar sesión
                        >
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" />
                            </svg>
                        </button>
                    </div>


                </div>
                <div className="dashboardHeaderSection_container">
                    {renderSelectedComponent()}
                </div>
            </div>
            <div className="dashboardNav">
                <h1>Tucu</h1>
                <div className="dashboardNav-items">
                    <a href="" onClick={() => handleComponentChange("DashboardStart")}>
                        <p>Inicio</p>
                    </a>
                    <a href="#/order" onClick={() => handleComponentChange("DashboardCreateOrder")}>
                        <p>Crear Pedido</p>
                    </a>
                    <a href="#/seguimiento" onClick={() => handleComponentChange("DeliveryTable")}> 
                        <p>Seguimiento</p>
                    </a>
                    <a href="#/historial" onClick={() => handleComponentChange("DeliveryHistory")}> 
                        <p>Historial</p>
                    </a>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={handleLogout}
                    > Cerrar Sesion</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;