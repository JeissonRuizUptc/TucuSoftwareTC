import React, { useState, useEffect } from "react";
import axios from "axios";
import TemporizadorComponent from "../Components/TemporizadorComponent";

const DeliveryTableItem = ({ index, delivery }) => {
  const [buttonText, setButtonText] = useState("");
  const [buttonColor, setButtonColor] = useState("green");
  const [remainingTime, setRemainingTime] = useState(delivery.preparation_time * 60);

  const handleButtonClick = async () => {
    try {
      if (delivery.state === 1 && buttonText === "Pedido listo") {
        // Realiza la solicitud PUT al endpoint cuando el botón está en "Pedido listo"
        await updateDeliveryState(delivery.idDELIVERIES, 2);
        setButtonText("ENTREGADO");
        setButtonColor("green");
      } else if (buttonText === "ENTREGADO") {
        // Realiza la solicitud PUT al endpoint cuando el botón está en "ENTREGADO"
        await updateDeliveryState(delivery.idDELIVERIES, 3);
        setButtonText("");
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la entrega:", error);
    }
  };

  const updateDeliveryState = async (deliveryId, newState) => {
    try {
      // Realiza la solicitud PUT para actualizar el estado de la entrega
      await axios.put(`http://localhost:3200/api/updatedeliveries/${deliveryId}`, { state: newState });
    } catch (error) {
      console.error("Error al actualizar el estado de la entrega:", error);
    }
  };

  useEffect(() => {
    // Actualiza el texto y color del botón según el estado inicial
    console.log(delivery.state)
    if (delivery.state === 1) {
      setButtonText("Pedido listo");
      setButtonColor("green");
    } else if (delivery.state === 2) {
      setButtonText("ENTREGADO");
      setButtonColor("green");
    } else if (delivery.state === "EN CAMINO") {
      setButtonText("hptaaa");
    }
  }, [delivery.state]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (remainingTime === 0) {
      clearInterval(intervalId);

      if (delivery.state === 1) {
        // Actualiza el estado a "EN CAMINO" y realiza la solicitud PUT al endpoint
        setButtonText("ENTREGADO");
        setButtonColor("green");
        updateDeliveryState(delivery.idDELIVERIES, 2);
      }
    }

    return () => clearInterval(intervalId);
  }, [remainingTime, delivery.idDELIVERIES, delivery.state]);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{new Date(delivery.timestamp).toLocaleTimeString()}</td>
      <td>
        <TemporizadorComponent preparationTime={delivery.preparation_time} startTime={delivery.timestamp} />
      </td>
      <td>{remainingTime}</td>
      <td>{delivery.DELIVERYMEN.surname}</td>
      <td>{delivery.address}</td>
      <td>
        {delivery.state === 1 ? "EN PREPARACIÓN" :
          delivery.state === 2 ? "EN CAMINO" :
            delivery.state === 3 ? "ENTREGADO" : ""}
      </td>
      <td>
        {buttonText && (
          <button style={{ backgroundColor: buttonColor }} onClick={handleButtonClick}>
            {buttonText}
          </button>
        )}
      </td>
    </tr>
  );
};

export default DeliveryTableItem;
