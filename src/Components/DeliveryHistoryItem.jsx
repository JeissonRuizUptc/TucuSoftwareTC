import React, { useState, useEffect } from "react";
import axios from "axios";
import './Styles/DeliveryTableItem.css';

const DeliveryHistoryItem = ({ index, delivery}) => {

  const [deliveryState, setDeliveryState] = useState(delivery.state);


  return (
    <tr>
      <td>{index + 1}</td>
      <td>{new Date(delivery.timestamp).toLocaleDateString('es-ES')}</td>
      <td>{new Date(delivery.timestamp).toLocaleTimeString()}</td>
      <td>{delivery.DELIVERYMEN.surname}</td>
      <td>{delivery.address}</td>
      <td>
        {deliveryState === 1 ? "EN PREPARACIÓN" :
          deliveryState === 2 ? "EN CAMINO" :
            deliveryState === 3 ? "ENTREGADO" : ""}
      </td>
    </tr>
  );
};

export default DeliveryHistoryItem;
