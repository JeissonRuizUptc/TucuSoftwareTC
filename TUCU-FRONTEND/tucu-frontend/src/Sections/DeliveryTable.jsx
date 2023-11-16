import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/DeliveryTable.css";
import DeliveryTableItem from "../Components/DeliveryTableItem"; // Importa el nuevo componente


const DeliveryTable = () => {
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        // Realiza la solicitud al endpoint para obtener los datos de los pedidos
        axios.get("http://localhost:3200/api/tracking/5")
            .then(response => {
                setDeliveries(response.data.DELIVERIES);
            })
            .catch(error => {
                console.error("Error al obtener los datos de los pedidos:", error);
            });
    }, []);


    return (
        <div className="deliveryTable-container">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>N° Domicilio</th>
                        <th>Hora de solicitud</th>
                        <th>Tiempo de preparacion restante</th>
                        <th>Tiempo de mora</th>
                        <th>Domiciliario</th>
                        <th>Dirección Destino</th>
                        <th>Estado</th>
                        <th>Seguir</th>
                    </tr>
                </thead>
                <tbody>

                    {deliveries.map((delivery, index) => (
                        <DeliveryTableItem key={index} delivery={delivery} index={index} />
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default DeliveryTable;
