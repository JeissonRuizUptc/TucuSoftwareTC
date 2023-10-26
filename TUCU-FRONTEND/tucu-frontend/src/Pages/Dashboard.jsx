import React from "react";
import './Styles/Dashboard.css';
import DashboardStart from "../Sections/DashboardStart";
import DashboardCreateOrder from "../Sections/DashboardCreateOrder";


const Dashboard = () => {
    return (
        <div className="dashboardContainer">
            <div className="dashboardHeaderSection">

            
                <div className="dashboardHeader">
                    <div className="dashboardHeader-dateUser">
                        <h1>commercial name</h1>
                        <p>User name</p>
                    </div>
                    <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                    </button>
                </div>
                    
                <div>
                    <DashboardCreateOrder />
                </div>

            </div>

            <div className="dashboardNav">
                <h1>Tucu</h1>

                <div className="dashboardNav-items">
                    <a href=""><p>Inicio</p></a>
                    <a href=""><p>Crear Pedido</p></a>
                    <a href=""><p>Seguimiento</p></a>
                    <a href=""><p>Cerrar Sesion</p></a>
                </div>
            </div>



        </div>
    );
}


export default Dashboard;