// routes.js
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const app = express();
app.use(bodyParser.json());
const { Client } = require('@googlemaps/google-maps-services-js');
const googleMapsClient = new Client({ apiKey: 'TU_CLAVE_DE_API' });


router.use(cors({
    origin: '*'
}));

/**
 * Endpoints ubicaciones
 */
// Endpoint para crear un nuevo país
router.post('/NewCountry', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre del país es obligatorio.' });
    }

    const newCountry = await prisma.COUNTRIES.create({
      data: {
        name,
      },
    });

    res.status(201).json({ message: 'País creado exitosamente', country: newCountry });
  } catch (error) {
    console.error('Error al crear el país:', error);
    res.status(500).json({ error: 'Se produjo un error al crear el país.' });
  }
});

// Endpoint para obtener todos los países
router.get('/GetCountries', async (req, res) => {
  try {
    const countries = await prisma.COUNTRIES.findMany();
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error al obtener países:', error);
    res.status(500).json({ error: 'Se produjo un error al obtener los países.' });
  }
});

// Endpoint para crear una nueva provincia
router.post('/NewProvinces', async (req, res) => {
  try {
    const { name, id_country } = req.body;

    if (!name || !id_country) {
      return res.status(400).json({ error: 'El nombre de la provincia y el ID del país son obligatorios.' });
    }

    const newProvince = await prisma.PROVINCE.create({
      data: {
        name,
        id_country,
      },
    });

    res.status(201).json({ message: 'Provincia creada exitosamente', province: newProvince });
  } catch (error) {
    console.error('Error al crear la provincia:', error);
    res.status(500).json({ error: 'Se produjo un error al crear la provincia.' });
  }
});

// Endpoint para obtener todas las provincias
router.get('/GetProvinces', async (req, res) => {
  try {
    const provinces = await prisma.PROVINCE.findMany();
    res.status(200).json(provinces);
  } catch (error) {
    console.error('Error al obtener provincias:', error);
    res.status(500).json({ error: 'Se produjo un error al obtener las provincias.' });
  }
});

// Endpoint para crear una nueva ciudad
router.post('/NewCities', async (req, res) => {
  try {
    const { name, id_province } = req.body;

    if (!name || !id_province) {
      return res.status(400).json({ error: 'El nombre de la ciudad y el ID de la provincia son obligatorios.' });
    }

    const newCity = await prisma.CITY.create({
      data: {
        name,
        id_province,
      },
    });

    res.status(201).json({ message: 'Ciudad creada exitosamente', city: newCity });
  } catch (error) {
    console.error('Error al crear la ciudad:', error);
    res.status(500).json({ error: 'Se produjo un error al crear la ciudad.' });
  }
});

// Endpoint para obtener todas las ciudades
router.get('/GetCities', async (req, res) => {
  try {
    const cities = await prisma.CITY.findMany();
    res.status(200).json(cities);
  } catch (error) {
    console.error('Error al obtener ciudades:', error);
    res.status(500).json({ error: 'Se produjo un error al obtener las ciudades.' });
  }
});

//Endponit para crear una dirección
router.post('/NewAddresses', async (req, res) => {
  try {
    const { street, cityId } = req.body;

    if (!street || !cityId) {
      return res.status(400).json({ error: 'La calle y la ciudad son campos obligatorios.' });
    }

    const newAddress = await prisma.ADDRESSES.create({
      data: {
        street,
        cityId,
      },
    });

    res.status(201).json({ message: 'Dirección creada exitosamente', address: newAddress });
  } catch (error) {
    console.error('Error al crear la dirección:', error);
    res.status(500).json({ error: 'Se produjo un error al crear la dirección.' });
  }
});

//Endpoint para obtener todas las direcciones
router.get('/GetAddresses', async (req, res) => {
  try {
    const addresses = await prisma.ADDRESSES.findMany();
    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error al obtener direcciones:', error);
    res.status(500).json({ error: 'Se produjo un error al obtener las direcciones.' });
  }
});

// Endpoint para obtener una dirección por su ID
router.get('/addresses/:id', async (req, res) => {
  try {
    const addressId = parseInt(req.params.id); // Obtiene el ID de la dirección de los parámetros de la URL

    if (isNaN(addressId) || addressId <= 0) {
      return res.status(400).json({ error: 'ID de dirección no válido.' });
    }

    const address = await prisma.ADDRESSES.findUnique({
      where: {
        idADDRESSES: addressId, // Busca la dirección por su ID
      },
    });

    if (!address) {
      return res.status(404).json({ error: 'Dirección no encontrada.' });
    }

    res.status(200).json(address);
  } catch (error) {
    console.error('Error al obtener la dirección:', error);
    res.status(500).json({ error: 'Se produjo un error al obtener la dirección.' });
  }
});


 /**MODIFICARRRRR
  * Endpoint nueva tienda
  */
 router.post('/newStore', async (req, res) => {
  try {
      const { name, nit, address, telephone_number, id_place_fk } = req.body;

      // Validación de datos
      if (!name || !nit || !address || !telephone_number || !id_place_fk) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
      }

      // Validación de longitud del campo nit
     // if (nit.length !== 9) {
      //    return res.status(400).json({ error: 'El campo nit debe tener una longitud de 9 caracteres.' });
      //}

      // Validación de formato de número de teléfono por país
      const phoneNumberRegex = getPhoneNumberRegexForCountry(telephone_number);

      if (!phoneNumberRegex.test(telephone_number)) {
          return res.status(400).json({ error: 'Formato de número de teléfono inválido para el país seleccionado.' });
      }

      const newStore = await prisma.STORES.create({
          data: {
              name,
              nit,
              address,
              telephone_number,
              id_place_fk,
          },
      });

      console.log(newStore);

      // Devuelve una respuesta exitosa con la nueva tienda creada
      res.status(201).json({ message: 'Tienda creada exitosamente', store: newStore });
  } catch (error) {
      console.error('Error al crear la tienda:', error);

      // Devuelve una respuesta de error
      res.status(500).json({ error: 'Se produjo un error al crear la tienda.' });
  }
});



/**
 * Endpoints nuevo usuarios
 */
 router.post('/newUser', async (req, res) => {
  try {
      const { idUSERS, username, firstname, password, surname, enabled, email, id_stores_fk, id_roles_fk } = req.body;

      // Validación de datos
      if (!idUSERS || !username || !firstname || !password || !surname || !enabled || !email || !id_stores_fk || !id_roles_fk) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
      }

      // Validación de formato de correo
      if (!email.includes('@')) {
          return res.status(400).json({ error: 'El correo electrónico debe contener @.' });
      }

      // Encriptar la contraseña con bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.USERS.create({
          data: {
              idUSERS,
              username,
              firstname,
              password: hashedPassword,
              surname,
              enabled,
              email,
              id_stores_fk,
              id_roles_fk
          },
      });

      console.log(newUser);

      // Devuelve una respuesta exitosa con el nuevo usuario creado
      res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
  } catch (error) {
      console.error('Error al crear el usuario:', error);

      // Devuelve una respuesta de error
      res.status(500).json({ error: 'Se produjo un error al crear el usuario.' });
  }
});


/**
 * Endpoint login
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validación de datos
    if (!username || !password) {
      return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios.' });
    }

    // Buscar al usuario por nombre de usuario en la base de datos
    const user = await prisma.USERS.findFirst({
      where: {
        username: username, // Nombre de usuario a buscar
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
      
    }

    // Generar un token JWT para el usuario
    const token = jwt.sign({ userId: user.idUSERS }, 'tu_secreto_secreto', { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Se produjo un error al iniciar sesión.' });
  }
});


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// Endpoints a modificar


/* Crear un nuevo rol
*/
router.post('/newRol', async (req, res) => {
    try {
      const { idROLES , roleName, description_role } = req.body;
  
      // Validación de datos (puedes agregar más validaciones según tus necesidades)
      if (!idROLES || !roleName ) {
        return res.status(400).json({ error: 'Los campos idROLES y roleName son obligatorios.' });
      }
  
      const newRole = await prisma.ROLES.create({
        data: {
            idROLES,
            roleName, 
            description_role 
        },
      });
      res.status(201).json(newRole);
    } catch (error) {
      console.error('Error al crear el Rol:', error);
      res.status(500).json({ error: 'Se produjo un error al crear el Rol.' });
    }
  });

 


  app.get('/getDomiciliarioLocation/:domiciliarioId', (req, res) => {
    // Obtener las coordenadas en tiempo real de acuerdo al domiciliarioId
    const domiciliarioId = req.params.domiciliarioId;
    
    // Simula obtener las coordenadas en tiempo real (reemplaza esto con tu lógica real)
    const lat = 12.345678;
    const lng = -45.678901;
  
    // Enviar las coordenadas al cliente usando WebSockets (socket.io)
    io.emit(`location_${domiciliarioId}`, { lat, lng });
    res.send('Ubicación en tiempo real enviada');
  });
    // Generar la ubicacion del domiciliario
  function obtenerUbicacionDomiciliario() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
  
        // Actualizar el mapa con las nuevas coordenadas
        actualizarMapa(lat, lng);
      });
    }
  }
  // Ruta para crear un nuevo pedido (DELIVERY)
router.post('/createPedido', async (req, res) => {
  try {
    // Obtener los datos del pedido del cuerpo de la solicitud
    const {
      destination_address,
      preparation_time,
      state,
      id_users_fk,       // ID del usuario relacionado con el pedido
      id_stores_fk,      // ID de la tienda relacionada con el pedido
      id_deliverymen_fk, // ID del repartidor relacionado con el pedido
    } = req.body;

    // Validación de datos (agrega las validaciones necesarias según tus requisitos)
    if (!destination_address || !preparation_time || !state || !id_users_fk || !id_stores_fk || !id_deliverymen_fk) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Crear el pedido en la base de datos
    const newPedido = await prisma.DELIVERIES.create({
      data: {
        destination_address,
        preparation_time,
        state,
        id_users_fk,
        id_stores_fk,
        id_deliverymen_fk,
      },
    });

    // Respondemos con el pedido recién creado
    res.status(201).json(newPedido);
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    res.status(500).json({ error: 'Se produjo un error al crear el pedido.' });
  }
});

// Ruta para crear un nuevo pedido (DELIVERY)
router.post('/createPedido', async (req, res) => {
  try {
    // Obtener los datos del pedido del cuerpo de la solicitud
    const {
      destination_address,
      preparation_time,
      state,
      id_users_fk,       // ID del usuario relacionado con el pedido
      id_stores_fk,      // ID de la tienda relacionada con el pedido
      id_deliverymen_fk, // ID del repartidor relacionado con el pedido
    } = req.body;

    // Validación de datos (agrega las validaciones necesarias según tus requisitos)
    if (!destination_address || !preparation_time || !state || !id_users_fk || !id_stores_fk || !id_deliverymen_fk) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Crear el pedido en la base de datos
const newPedido = await prisma.DELIVERIES.create({
  data: {
    destination_address,
    preparation_time,
    state,
    id_users_fk,
    id_stores_fk,
    id_deliverymen_fk,
  },
});



    // Respondemos con el pedido recién creado
    res.status(201).json(newPedido);
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    res.status(500).json({ error: 'Se produjo un error al crear el pedido.' });
  }
});

  
  // Actualizar la ubicacion del domiciliario
  function actualizarMapa(lat, lng) {
    // Verificar si la API de Google Maps se ha cargado
    if (typeof google === 'object' && typeof google.maps === 'object') {
      // Coordenadas
      const ubicacion = { lat, lng };
  
      // Opciones de mapa
      const mapOptions = {
        zoom: 15, // Nivel de zoom (ajusta según tus necesidades)
        center: ubicacion, // Centra el mapa en la nueva ubicación
      };
  
      // Crear un nuevo mapa en el elemento HTML con ID "map"
      const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
      // Crear un marcador en la ubicación
      const marker = new google.maps.Marker({
        position: ubicacion,
        map: map,
        title: 'Ubicación del domiciliario',
      });
    } else {
      console.log('La API de Google Maps no está cargada.');
    }
  }
  
  function getPhoneNumberRegexForCountry(phoneNumber) {
    if (/^\+57[0-9]{10}$/.test(phoneNumber)) {
        return 'CO';  // Colombia
    } else if (/^\+52[0-9]{10}$/.test(phoneNumber)) {
        return 'MX';  // México
    } else if (/^\+54[0-9]{10}$/.test(phoneNumber)) {
        return 'AR';  // Argentina
    } else {
        return 'Invalid';  // Número no válido para ninguno de los países
    }


    // Expresión regular general por defecto
    return /^\+[0-9]{1,3}-?[0-9]{1,14}$/;
}

    module.exports = router