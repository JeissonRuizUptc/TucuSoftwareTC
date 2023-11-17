import React, { useState, useRef, useEffect } from "react";
import './Styles/RegisterPage.css';
import axios from 'axios';

const RegisterPager = () => {

    const addressInputRef = useRef(null);

    useEffect(() => {
        // Crea una instancia del servicio de autocompletado de Google Maps
        const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current);

        // Configura las opciones de autocompletado (puedes personalizar según tus necesidades)
        autocomplete.setTypes(['geocode']);

        // Escucha el evento de selección de lugar y obtén los detalles del lugar
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log(place); // Aquí puedes acceder a los detalles del lugar
        });
    }, []);



    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        passwordVerified: "",
        legalName: "",
        commercialName: "",
        nit: 0,
        contactNumber: "",
        address: "",
        addressDetails: "",
        description: ""
    });

    const [nitError, setNitError] = useState("");
    const [contactNumberError, setContactNumberError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto para enviar a Endpoint 2
        const endpoint2Data = {
            name: formData.legalName,
            nit: parseInt(formData.nit),
            telephone_number: formData.contactNumber,
            address: formData.address
        };


        try {


            // Enviar la solicitud al Endpoint 2
            const sendStore = await axios.post('https://db20-2800-484-b385-6100-306d-1ec6-4393-334f.ngrok-free.app/api/newStore', endpoint2Data);
            const responseData = sendStore.data;
            const idStores = responseData.idStores;


            // Crear un objeto para enviar a Endpoint 1
            const endpoint1Data = {
                idUSERS: parseInt(formData.nit),
                username: formData.userName,
                firstname: formData.firstName,
                password: formData.password,
                surname: formData.lastName,
                enabled: 1,
                email: formData.email,
                id_stores_fk: idStores,
                id_roles_fk: 1
            };

            // Enviar la solicitud al Endpoint 1
            await axios.post('https://db20-2800-484-b385-6100-306d-1ec6-4393-334f.ngrok-free.app/api/newUser', endpoint1Data);



            // Limpiar el formulario después de un envío exitoso
            setFormData({
                firstName: "",
                lastName: "",
                userName: "",
                email: "",
                password: "",
                passwordVerified: "",
                legalName: "",
                commercialName: "",
                nit: "",
                contactNumber: "",
                address: "",
                addressDetails: "",
                description: ""
            });

            console.log("Los datos se han enviado correctamente a ambos endpoints.");
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };

    return (
        <div className="RegisterContainer">
            <div className="Register-Nav">
                <h1>Tucu</h1>
                <button className="btn btn-blue">
                    Iniciar Sesion
                </button>
            </div>

            <div className="Register-Section">

                <div className="Register-Section__Form">
                    <form className="w-full max-w-lg">
                        <h1>Registra tu restaurante</h1>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Tu nombre *
                                </label>
                                <input
                                    id="firstName grid-first-name"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text"
                                    placeholder=""
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Tu apellido *
                                </label>
                                <input
                                    id="lastName grid-last-name"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    placeholder=""
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange} />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Nombre de usuario *
                                </label>
                                <input
                                    id="userName grid-last-name"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    placeholder=""
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange} />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    E-mail del responsable *
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="email "
                                    type="email"
                                    placeholder="example@email.com"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange} />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Crea una contraseña *
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="grid-first-name password"
                                    type="password"
                                    placeholder="******"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange} />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="passwordVerified">
                                    Repite la contraseña *
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="passwordVerified"
                                    type="password"
                                    placeholder="******"
                                    name="passwordVeried"
                                    value={formData.passwordVerified}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Nombre Legal de la empresa *
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="grid-first-name"
                                    type="text"
                                    placeholder="Tucu Delivery S.A.S"
                                    name="legalName"
                                    value={formData.legalName}
                                    onChange={handleChange} />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Nombre comercial de la empresa *
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-last-name"
                                    type="text"
                                    placeholder="Tucu"
                                    name="commercialName"
                                    value={formData.commercialName}
                                    onChange={handleChange} />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    NIT
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="grid-first-name"
                                    type="text"
                                    placeholder="1234565780-2"
                                    name="nit"
                                    value={formData.nit}
                                    onChange={handleChange} />
                                {/* Mostrar mensaje de error */}
                                {contactNumberError && <p className="text-red-500">{contactNumberError}</p>}
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Numero de contacto *
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-last-name"
                                    type="text "
                                    placeholder="(+57 311 123 456)"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange} />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Dirección *
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="grid-first-name"
                                    type="text"
                                    placeholder="Diagonal 1 #2-3"
                                    name="address"
                                    ref={addressInputRef}
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Detalles de la dirección
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-last-name"
                                    type="text"
                                    placeholder="Segundo piso, esquina"
                                    name="addressDetails"
                                    value={formData.addressDetails}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Descripción / Apuntes
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="grid-first-name"
                                    type="text"
                                    placeholder=""
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange} />
                            </div>
                        </div>

                        <button className="btn btn-blue" onClick={handleSubmit}>
                            Registrar restaurante
                        </button>
                    </form>
                </div>
                <div className="Register-Section__Card">
                    <h1>Tucu</h1>
                    <p>Cambiando el concepto de delivery en LATAM</p>
                    <p>Únete a nuestra plataforma y simplifica la gestión de entregas de tu empresa. Regístrate hoy</p>
                    <p>Lee nuestro <a href="">terminos y concidiones</a></p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPager;