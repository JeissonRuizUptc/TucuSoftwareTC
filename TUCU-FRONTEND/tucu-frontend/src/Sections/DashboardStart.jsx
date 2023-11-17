import React, { useState, useEffect } from 'react';
import './Styles/DashboardStart.css';
import axios from "axios";
import DeliveryChart from '../Components/DeliveryChart';

const DashboardStart = () => {

    const [deliveryData, setDeliveryData] = useState([]);
    

    useEffect(() => {
        axios.get('https://db20-2800-484-b385-6100-306d-1ec6-4393-334f.ngrok-free.app/api/countDeliveriesByState')
            .then(response => {
                setDeliveryData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de entregas:', error);
            });
    }, []);

    // Estado local para forzar la actualización del componente
    const [, forceUpdate] = useState();

    // Función para redirigir a la ruta de realizar pedidos
    const handleRealizarPedidosClick = () => {
        window.location.href = '#/order';
        forceUpdate(Math.random());  // Cambia el estado local para forzar la actualización
    };

    // Función para redirigir a la ruta de crear pedido
    const handleCrearPedidoClick = () => {
        window.location.href = '#/Seguimiento';
        forceUpdate(Math.random());  // Cambia el estado local para forzar la actualización
    };


    return (
        <div className="DashboardStart-container">
            <div className="DashboardStart-welcome">
                <h1>¡Bienvenido, Nombre del Usuario Administrador! </h1>
                <p><br />Estás en el centro de control de Entregas de Última Milla de TUCU. Administra todas las entregas y observar el progreso en tiempo real.</p>
                <div className="DashboardStart-buttons">
                    {/* Utiliza las funciones de redirección en los eventos onClick */}
                    <button id="greenButton" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleRealizarPedidosClick}>
                        Visualizar pedidos
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleCrearPedidoClick}>
                        Crear pedido
                    </button>
                </div>
            </div>


            <div className="DashboardStart-stadistics">
                <h2>Estadisticas diarias</h2>

                <p>Entregas totales:     16</p>
                <p>Porcentaje de entregas en camino:     18%  </p>
                <p>Porcentaje pedidos terminados:    82%  </p>
            </div>

            <div className='DashboardStart-stadistics__bar'>
                <h2>Gráfico de Barras - Procesos de Entrega</h2>
                <DeliveryChart data={deliveryData} />
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