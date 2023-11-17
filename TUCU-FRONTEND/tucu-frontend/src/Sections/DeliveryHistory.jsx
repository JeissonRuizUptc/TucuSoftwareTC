import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/DeliveryHistory.css";
import DeliveryHistoryItem from "../Components/DeliveryHistoryItem";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFRendered from "../Components/PDFRendered";
const DeliveryHistory = ({ idUser }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState("");
  const [fechaInicial, setFechaInicial] = useState(""); // Nuevo estado para la fecha inicial
  const [fechaFinal, setFechaFinal] = useState(""); // Nuevo estado para la fecha final

  useEffect(() => {
    // Obtener datos del usuario y la tienda
    axios
      .get(`http://localhost:3200/api/user_store/${idUser}`)
      .then((response) => {
        const userStoreData = response.data;
        const address = userStoreData?.STORES?.address || "";
        setDefaultAddress(address);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });

    // Obtener datos de pedidos
    let endpoint = "http://localhost:3200/api/histories-by-date/2023-10-01";

    // Verificar si hay fechas iniciales y finales especificadas
    if (fechaInicial && fechaFinal) {
      endpoint = `http://localhost:3200/api/histories-between-dates/${fechaInicial}/${fechaFinal}`;
    }

    axios
      .get(endpoint)
      .then((response) => {
        setDeliveries(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de los pedidos:", error);
      });
  }, [idUser, fechaInicial, fechaFinal]);


  const handleSearch = (e) => {
    e.preventDefault();
    // Realizar la solicitud con las fechas actuales
    // useEffect manejará automáticamente los cambios en las fechas
  };

  return (
    <div className="deliveryHistory-container">
      <div className="deliveryHistory_filter">
        <h1 className="text-2xl font-semibold mb-4">Selecciona Fechas</h1>
        <form className="deliveryHistory_filter--dates" onSubmit={handleSearch}>
          <div className="filterItem mb-4">
            <label htmlFor="fechaInicial" className="block text-sm font-medium text-gray-600">
              Fecha Inicial
            </label>
            <input
              type="date"
              id="fechaInicial"
              name="fechaInicial"
              className="mt-1 p-2 w-full border rounded-md"
              value={fechaInicial}
              onChange={(e) => setFechaInicial(e.target.value)}
            />
          </div>
          <div className="filterItem  mb-4">
            <label htmlFor="fechaFinal" className="block text-sm font-medium text-gray-600">
              Fecha Final
            </label>
            <input
              type="date"
              id="fechaFinal"
              name="fechaFinal"
              className="mt-1 p-2 w-full border rounded-md"
              value={fechaFinal}
              onChange={(e) => setFechaFinal(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Buscar
            </button>
          </div>
        </form>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>N° Domicilio</th>
            <th>Fecha de creacion</th>
            <th>Hora de solicitud</th>
            <th>Domiciliario</th>
            <th>Dirección Destino</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery, index) => (
            <DeliveryHistoryItem key={index} delivery={delivery} index={index} />
          ))}
        </tbody>
      </table>

      <PDFDownloadLink  className = "pdfButton" document={<PDFRendered  data={deliveries} />} fileName="historial_entregas.pdf">
        {({ loading }) => (loading ? 'Cargando...' : 'Descargar PDF')}
      </PDFDownloadLink>
    </div>
  );
};

export default DeliveryHistory;
