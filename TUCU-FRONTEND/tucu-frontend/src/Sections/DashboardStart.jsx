import React from "react";
import './Styles/DashboardStart.css';


const DashboardStart = () => {
    return (
        <div className="DashboardStart-container">
            <div className="DashboardStart-welcome">
                <h1>¡Bienvenido, Nombre del Usuario Administrador! </h1>
                <p>Estás en el centro de control de Entregas de Última Milla de TUCU. Administra todas las entregas y observar el progreso en tiempo real.</p>
                <div className="DashboardStart-buttons">
                    <button id="greenButton" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Visualizar pedidos
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Crear pedido
                    </button>
                </div>
            </div>


            <div className="DashboardStart-stadistics">
                <h2>Estadisticas diarias</h2>
                
                <p>Entregas totales:     104</p>
                <p>Tiempo promedio de entrega:            00:38:15 </p>
                <p>Tiempo promedio preparación:           00:28:15</p>
                <p>Porcentaje de entregas en camino:     32%  </p>
                <p>Porcentaje pedidos en preparación:    42%  </p>
                <p>Recaudo total:      $4.950.000</p>
            </div>

            <div className="DashboardStart-routes">
                <h1>Entregas en camino</h1>
                <div className="DashboardStart-routes__map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63538.98873269864!2d-73.356241!3d5.539294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a7c2e897fba5b%3A0xac9fda7e6b9aa68c!2zVHVuamEsIEJveWFjw6E!5e0!3m2!1ses!2sco!4v1698082758737!5m2!1ses!2sco" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

            </div>
        </div>
    )
}


export default DashboardStart;