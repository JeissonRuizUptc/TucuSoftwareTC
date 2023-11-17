import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Styles/DashboardCreateOrder.css';



const decodeToken = (token) => {
  const parts = token.split(".");
  if (parts.length === 3) {
    const payloadBase64 = parts[1];
    const payloadDecoded = atob(payloadBase64);
    return JSON.parse(payloadDecoded);
  }
  return null;
};

const DashboardCreateOrder = () => {
  const addressInputRef = useRef(null);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [preparationTime, setPreparationTime] = useState("10");
  const [orderAddress, setOrderAddress] = useState("");
  const [driversList, setDriversList] = useState([]);
  const [driversWithIds, setDriversWithIds] = useState([]);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current);

    // Configura las opciones de autocompletado (puedes personalizar según tus necesidades)
    autocomplete.setTypes(['geocode']);

    // Escucha el evento de selección de lugar y obtén los detalles del lugar
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      console.log(place); // Aquí puedes acceder a los detalles del lugar
    });
    axios.get("https://db20-2800-484-b385-6100-306d-1ec6-4393-334f.ngrok-free.app/api/deliverymen")
      .then((response) => {
        const driverSurnames = response.data.map(driver => driver.surname);
        setDriversList(driverSurnames);
        setDriversWithIds(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de repartidores:", error);
      });
  }, []);

  const handleCreateOrder = async () => {
    if (!selectedDriver || !preparationTime || !orderAddress) {
      toast.error("Los campos de domiciliario, dirección y tiempo son obligatorios.");
      return;
    }

    const token = localStorage.getItem("token");
    const userIdFromToken = decodeToken(token)?.userId;

    try {
      const responseUserStore = await axios.get(`https://db20-2800-484-b385-6100-306d-1ec6-4393-334f.ngrok-free.app/api/user_store/${userIdFromToken}`);

      const { id_stores_fk } = responseUserStore.data;
      const selectedDriverObj = driversWithIds.find(driver => driver.surname === selectedDriver);
      const preparationTimeAsNumber = parseInt(preparationTime);

      const orderData = {
        preparation_time: preparationTimeAsNumber,
        state: 1,
        id_users_fk: userIdFromToken,
        id_stores_fk: id_stores_fk,
        id_deliverymen_fk: selectedDriverObj.idDELIVERYMEN,
        address: orderAddress,
      };

      const responseCreateDelivery = await axios.post('https://db20-2800-484-b385-6100-306d-1ec6-4393-334f.ngrok-free.app/api/createDelivery', orderData);

      if (responseCreateDelivery.status === 201) {
        toast.success('El servicio se creó correctamente', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error('Error al crear el servicio, inténtelo nuevamente', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      toast.error('Error al crear el servicio, inténtelo nuevamente', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };


  return (
    <div className="DashboardCreateOrder-container">
      <h1>¡Crea el pedido para iniciar la preparación!</h1>

      <form className="DashboardCreateOrder-form w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Asigna repartidor *
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
            >
              <option value="">Selecciona un repartidor</option>
              {driversList.map((driver, index) => (
                <option key={index} value={driver}>{driver}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              Tiempo en estar listo tu pedido *
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
                id="grid-state"
                value={preparationTime}
                onChange={(e) => setPreparationTime(e.target.value)}
              >
                <option value="10">10 Minutos</option>
                <option value="15">15 Minutos</option>
                <option value="20">20 Minutos</option>
                <option value="30">30 Minutos</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              Dirección *
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="Albuquerque"
              ref={addressInputRef} // Asigna la referencia al campo de dirección
              value={orderAddress}
              onChange={(e) => setOrderAddress(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
              Detalle de dirección *
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
          </div>
        </div>
      </form>

      <div className="DashboardCreateOrder-footer">
        <p>Nota: Si el tiempo de preparacion es igual o menor a</p>
        <p>10 minutos, no podras cancelar la orden</p>

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleCreateOrder} >
          Crear
        </button>
      </div>
    </div>
  )
}


export default DashboardCreateOrder;