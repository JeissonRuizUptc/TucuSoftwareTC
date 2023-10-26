import React from "react";
import './Styles/DashboardCreateOrder.css';



const DashboardCreateOrder = () => {

    return (
        <div className="DashboardCreateOrder-container">
            <h1>¡Crea el pedido para iniciar la preparación!</h1>

            <form className="DashboardCreateOrder-form w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Asigna repartidor *
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                            Tiempo en estar listo tu pedido *
                        </label>
                        <div class="relative">
                            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>10 Minutos</option>
                                <option>15 Minutos</option>
                                <option>20 Minutos</option>
                                <option>30 Minutos</option>

                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Dirección *
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
                    </div>

                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                            Detalle de dirección *
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
                    </div>
                </div>
            </form>

            <div className="DashboardCreateOrder-footer">
                <p>Nota: Si el tiempo de preparacion es igual o menor a</p>
                <p>10 minutos, no podras cancelar la orden</p>

                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Crear
                </button>
            </div>
        </div>
    )
}


export default DashboardCreateOrder;