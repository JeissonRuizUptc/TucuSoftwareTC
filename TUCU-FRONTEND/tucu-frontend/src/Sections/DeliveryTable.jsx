import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/DeliveryTable.css";
import DeliveryTableItem from "../Components/DeliveryTableItem"; // Importa el nuevo componente


const DeliveryTable = ({ idUser }) => {
    const [deliveries, setDeliveries] = useState([]);
    const [defaultAddress, setDefaultAddress] = useState(""); // Nuevo estado para la dirección por defecto


    useEffect(() => {
        // Obtener datos del usuario y la tienda
        axios.get(`https://db20-2800-484-b385-6100-306d-1ec6-4393-334f.ngrok-free.app/api/user_store/${idUser}`)
          .then(response => {
            const userStoreData = response.data;
            const address = userStoreData?.STORES?.address || ""; // Extraer la dirección
            setDefaultAddress(address);
          })
          .catch(error => {
            console.error("Error al obtener los datos del usuario:", error);
          });
    
        // Obtener datos de pedidos
        axios.get("https://db20-2800-484-b385-6100-306d-1ec6-4393-334f.ngrok-free.app/api/tracking/5")
          .then(response => {
            setDeliveries(response.data.DELIVERIES);
          })
          .catch(error => {
            console.error("Error al obtener los datos de los pedidos:", error);
          });
      }, [idUser]);


    return (
        <div className="deliveryTable-container">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Acción</th>
                        <th>N° Domicilio</th>
                        <th>Hora de solicitud</th>
                        <th>Tiempo de preparacion restante</th>
                        <th>Domiciliario</th>
                        <th>Dirección Destino</th>
                        <th>Estado</th>
                        <th>Seguir</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries.map((delivery, index) => (
                        <DeliveryTableItem key={index} delivery={delivery} index={index} defaultAdddress={defaultAddress} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeliveryTable;