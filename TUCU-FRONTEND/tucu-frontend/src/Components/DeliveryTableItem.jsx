import React, { useState, useEffect } from "react";
import axios from "axios";
import TemporizadorComponent from "../Components/TemporizadorComponent";
import { FaPlay } from "react-icons/fa"; // Importa el ícono de "play"


const DeliveryTableItem = ({ index, delivery }) => {
  const [buttonText, setButtonText] = useState("");
  const [buttonColor, setButtonColor] = useState("green");
  const [remainingTime, setRemainingTime] = useState(delivery.preparation_time * 60);
  const [deliveryState, setDeliveryState] = useState(delivery.state);

  const handleButtonClick = async () => {
    if (deliveryState === 1) {
      // Si el estado es 1, actualiza a EN CAMINO y establece el tiempo restante a 0
      setDeliveryState(2);
      setRemainingTime(0);
      setButtonText("ENTREGADO");
      setButtonColor("yellow");
      // Realiza la solicitud PUT al endpoint con el nuevo estado
      await updateDeliveryState(delivery.idDELIVERIES, 2);
    } else if (buttonText === "ENTREGADO") {
      // Si el botón muestra ENTREGADO, actualiza a ENTREGADO y establece el tiempo restante a 0
      setDeliveryState(3);
      setRemainingTime(0);
      setButtonText("");
      // Realiza la solicitud PUT al endpoint con el nuevo estado
      await updateDeliveryState(delivery.idDELIVERIES, 3);
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
    if (deliveryState === 1) {
      setButtonText("Pedido listo");
      setButtonColor("green");
    } else if (deliveryState === 2) {
      setButtonText("ENTREGADO");
      setButtonColor("yellow");
    }
  }, [deliveryState]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (remainingTime === 0 && deliveryState === 1) {
      // Cuando el temporizador llega a 0 y el estado es 1, actualiza a EN CAMINO y establece el botón a ENTREGADO
      clearInterval(intervalId);
      setDeliveryState(2);
      setButtonText("ENTREGADO");
      setButtonColor("yellow");
      // Realiza la solicitud PUT al endpoint con el nuevo estado
      updateDeliveryState(delivery.idDELIVERIES, 2);
    }

    return () => clearInterval(intervalId);
  }, [remainingTime, delivery.idDELIVERIES, deliveryState]);

  return (
    <tr>
      {/* Agrega el botón de "play" al lado izquierdo cuando el estado es 2 */}
      <td>
        {deliveryState === 2 && (
          <button
            style={{
              backgroundColor: "green",
              borderRadius: "50%", // Hace que el botón sea redondo
              marginRight: "8px", // Ajusta el espaciado del botón
              padding: "8px", // Ajusta el relleno del botón
              border: "none", // Elimina el borde
              cursor: "pointer", // Cambia el cursor al pasar sobre el botón
            }}
            onClick={"/* Manejador de clic para iniciar algo */"}
          >
            <FaPlay style={{ color: "white" }} /> {/* Ícono de "play" en color blanco */}
          </button>
        )}
      </td>
      <td>{index + 1}</td>
      <td>{new Date(delivery.timestamp).toLocaleTimeString()}</td>
      <td>
        <TemporizadorComponent
          preparationTime={delivery.preparation_time}
          startTime={delivery.timestamp}
          remainingTime={remainingTime}
          setRemainingTime={(time) => {
            setRemainingTime(time);
          }}
          deliveryState={deliveryState}
        />
      </td>
      <td>00:00:00</td>
      <td>{delivery.DELIVERYMEN.surname}</td>
      <td>{delivery.address}</td>
      <td>
        {deliveryState === 1 ? "EN PREPARACIÓN" :
          deliveryState === 2 ? "EN CAMINO" :
            deliveryState === 3 ? "ENTREGADO" : ""}
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
