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

//crear pedido
router.post('/createDelivery', async (req, res) => {
  const {
      preparation_time,
      state,
      id_users_fk,
      id_stores_fk,
      id_deliverymen_fk,
      address
  } = req.body;
  
  try {
      const newDelivery = await prisma.dELIVERIES.create({
          data: {
              timestamp: new Date(),
              preparation_time,
              state,
              id_users_fk,
              id_stores_fk,
              id_deliverymen_fk,
              address
          }
      });

      res.status(201).json(newDelivery);
  } catch (error) {
      console.error("Error al crear el delivery:", error);
      res.status(500).json({ error: "Error interno del servidor al crear el delivery" });
  }
});



/**
 * Endpoint nueva tienda
 */
router.post('/newStore', async (req, res) => {
  try {
    const { name, nit, telephone_number, address } = req.body;

    // Validación de datos
    if (!name || !nit || !telephone_number || !address) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Convierte el número de nit en una cadena de texto
    const nitAsString = nit.toString();

    // Validación de longitud del campo nit (debe tener 9 caracteres)
    if (nitAsString.length !== 9) {
      return res.status(400).json({ error: 'El campo nit debe tener una longitud de 9 caracteres.' });
    }

    // Validación de formato de número de teléfono por país
    const phoneValidationResult = validatePhoneNumber(telephone_number);

    if (phoneValidationResult === 'Invalid') {
      return res.status(400).json({ error: 'Formato de número de teléfono inválido para el país seleccionado.' });
    }

    const newStore = await prisma.sTORES.create({
      data: {
        name,
        nit: parseInt(nitAsString, 10), // Asegurándonos de que nit es un número
        telephone_number,
        address,
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

//crear deliveryman
router.post('/createDeliveryman', async (req, res) => {
  try {
    const {
      idDELIVERYMEN,
      surname,
      enabled,
      email,
      drivers_license,
      soat,
      tm_and_g_inspection_certificate,
      address
    } = req.body;

    // Validación de datos
    if (!surname || enabled === undefined || !email || drivers_license === undefined || soat === undefined || tm_and_g_inspection_certificate === undefined) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Validación del email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Formato de email inválido.' });
    }

    const newDeliveryman = await prisma.dELIVERYMEN.create({
      data: {
        idDELIVERYMEN,
        surname,
        enabled,
        email,
        drivers_license,
        soat,
        tm_and_g_inspection_certificate,
        address
      }
    });

    res.status(201).json(newDeliveryman);
  } catch (error) {
    console.error("Error al crear el repartidor:", error);
    res.status(500).json({ error: "Error interno del servidor al crear el repartidor" });
  }
});

/**
 * Endpoint para obtener una tienda por ID
 */
router.get('/store/:id', async (req, res) => {
  try {
    const storeId = parseInt(req.params.id);

    if (isNaN(storeId) || storeId <= 0) {
      return res.status(400).json({ error: 'ID de tienda no válido.' });
    }

    const store = await prisma.STORES.findUnique({
      where: {
        idStores: storeId,
      },
    });

    if (!store) {
      return res.status(404).json({ error: 'Tienda no encontrada.' });
    }

    res.status(200).json(store);
  } catch (error) {
    console.error('Error al obtener la tienda:', error);
    res.status(500).json({ error: 'Se produjo un error al obtener la tienda.' });
  }
});


/* Crear un nuevo rol */
router.post('/newRol', async (req, res) => {
  try {
    const { idROLES, roleName, description_role } = req.body;

    // Validación de datos (puedes agregar más validaciones según tus necesidades)
    if (!idROLES || !roleName) {
      return res.status(400).json({ error: 'Los campos idROLES y roleName son obligatorios y roleName debe ser un número entero.' });
    }

    const newRole = await prisma.ROLES.create({
      data: {
        idROLES,
        roleName,
        description_role,
      },
    });

    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error al crear el Rol:', error);
    res.status(500).json({ error: 'Se produjo un error al crear el Rol.' });
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
 * Obtiene todos los domicialiarios
 */
router.get('/deliverymen', async (req, res) => {
  try {
    const deliverymen = await prisma.DELIVERYMEN.findMany();
    res.status(200).json(deliverymen);
  } catch (error) {
    console.error('Error al recuperar los repartidores:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
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

/**
 * Obtener todos los pedidos
 */
router.get('/manyDeliveries', async (req, res) => {
  try {
      const deliveries = await prisma.dELIVERIES.findMany();
      res.json(deliveries);
  } catch (error) {
      res.status(500).json({ error: "Error al obtener los deliveries" });
  }
});

// Endpoint para obtener deliveries por fecha
router.get('/manyDeliveriesDate', async (req, res) => {
  const date = req.params.date;
  try {
      const deliveriesByDate = await prisma.dELIVERIES.findMany({
          where: {
              timestamp: date
          }
      });
      res.json(deliveriesByDate);
  } catch (error) {
      res.status(500).json({ error: "Error al obtener los deliveries por fecha" });
  }
});

// join entre deliverys y delyverymen
router.get('/deliveriesWithDeliverymen', async (req, res) => {
  try {
    const deliveries = await prisma.dELIVERIES.findMany({
      include: {
        DELIVERYMEN: true, // Aquí suponemos que tienes una relación entre las tablas en tu modelo Prisma
      }
    });

    res.status(200).json(deliveries);
  } catch (error) {
    console.error('Error al recuperar los deliveries con los deliverymen:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//actualizar estado del delivery #borrar xd
router.put('/updatedeliveries/:id', async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  if (!state) {
      return res.status(400).send('El estado es requerido');
  }

  try {
      const updatedDelivery = await prisma.dELIVERIES.update({
          where: {
              idDELIVERIES: Number(id)
          },
          data: {
              state
          }
      });
      res.json(updatedDelivery);
  } catch (error) {
      res.status(500).send('Error al actualizar el estado de la entrega');
  }
});

//endpoint join entre user y store
router.get('/user_store/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: 'ID de usuario no válido.' });
    }

    const userWithCompany = await prisma.USERS.findUnique({
      where: {
        idUSERS: userId,
      },
      include: {
        STORES: true,
      },
    });

    if (!userWithCompany) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    res.status(200).json(userWithCompany);
  } catch (error) {
    console.error('Error al obtener la información del usuario y la empresa:', error);
    res.status(500).json({ error: 'Se produjo un error al obtener la información del usuario y la empresa.' });
  }
});

/**
 * Endpoint 
 */
router.get('/tracking/:idTienda', async (req, res) => {
  try {
    const idTienda = parseInt(req.params.idTienda);

    // Consulta la tienda por ID y selecciona los campos específicos
    const tienda = await prisma.STORES.findUnique({
      where: { idStores: idTienda },
      select: {
        DELIVERIES: {
          select: {
            idDELIVERIES: true,
            timestamp: true,
            preparation_time: true,
            address: true,
            state: true,
            DELIVERYMEN: {
              select: {
                surname: true,
              },
            },
          },
        },
      },
    });

    if (!tienda) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    res.json(tienda);
  } catch (error) {
    console.error('Error al buscar la tienda y sus pedidos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
router.get('/transfer-deliveries', async (req, res) => {
  try {
    await transferData();
    res.status(200).send('La transferencia de datos se completó con éxito.');
  } catch (error) {
    res.status(500).send('Hubo un error al transferir los datos.');
  }
});

//get de histories
router.get('/histories', async (req, res) => {
  try {
    const histories = await prisma.hISTORIES.findMany();
    res.status(200).json(histories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Endpoint para traer registros entre 2 fechas
router.get('/histories-between-dates/:startDate/:endDate', async (req, res) => {
  const { startDate, endDate } = req.params;

  console.log("Fecha de inicio recibida:", startDate);
  console.log("Fecha de fin recibida:", endDate);

  // Convertir las fechas recibidas al inicio y final del día en formato UTC
  const startDateTime = new Date(startDate + 'T00:00:00.000Z');
  const endDateTime = new Date(endDate + 'T23:59:59.999Z');

  console.log("Fecha de inicio:", startDateTime.toISOString());
  console.log("Fecha de fin:", endDateTime.toISOString());

  try {
    const histories = await prisma.HISTORIES.findMany({
      where: {
        timestamp: {
          gte: startDateTime,
          lte: endDateTime
        }
      },
      include: {
        USERS: true,
        STORES: true,
        DELIVERYMEN: true,
        DELIVERIES: true
      }
    });

    console.log("Registros encontrados:", histories.length);

    res.status(200).json(histories);
  } catch (error) {
    console.error("Error al realizar la consulta:", error.message);
    res.status(500).send(error.message);
  }
});

//Endpoint de traer histtoricos desde una fecha
router.get('/histories-by-date/:date', async (req, res) => {
  const { date } = req.params;

  console.log("Fecha recibida:", date);

  // Convertir la fecha recibida al inicio del día en formato UTC
  const startDate = new Date(date + 'T00:00:00.000Z');
  // Configurar endDate para el final del día en formato UTC
  const endDate = new Date();  // Fecha actual

  try {
    const histories = await prisma.HISTORIES.findMany({
      where: {
        timestamp: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        USERS: true,
        STORES: true,
        DELIVERYMEN: true,
        DELIVERIES: true
      }
    });

    console.log("Registros encontrados:", histories.length);

    res.status(200).json(histories);
  } catch (error) {
    console.error("Error al realizar la consulta:", error.message);
    res.status(500).send(error.message);
  }
});


// Endpoint para obtener los usuarios de 'HISTORIES' por ID de tienda
router.get('/histories/users/:storeId', async (req, res) => {
  const storeId = parseInt(req.params.storeId);

  try {
    const users = await prisma.hISTORIES.findMany({
      where: {
        id_stores_fk: storeId
      },
      include: {
        USERS: true
      }
    });

    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

async function transferData() {
  try {
    // Obtén los datos de DELIVERIES a transferir
    const deliveriesToTransfer = await prisma.DELIVERIES.findMany();

    if (deliveriesToTransfer.length === 0) {
      console.log('No hay datos para transferir.');
      return;
    }

    // Inicia una transacción para evitar problemas de consistencia
    await prisma.$transaction([
      // Crea registros en la tabla HISTORIES con los datos de DELIVERIES
      ...deliveriesToTransfer.map((delivery) =>
        prisma.HISTORIES.create({
          data: {
            timestamp: delivery.timestamp,
            preparation_time: delivery.preparation_time,
            state: delivery.state,
            id_users_fk: delivery.id_users_fk,
            id_stores_fk: delivery.id_stores_fk,
            id_deliverymen_fk: delivery.id_deliverymen_fk,
            address: delivery.address,
          },
        })
      ),
      // Elimina los registros de DELIVERIES
      prisma.DELIVERIES.deleteMany(),
    ]);

    console.log('Datos transferidos a la tabla HISTORIES y registros eliminados de DELIVERIES.');
  } catch (error) {
    console.error('Error al transferir datos y eliminar registros:', error);
  } finally {
    await prisma.$disconnect();
  }
}


// Endpoint para actualizar el estado de una entrega
router.put('/update-delivery/:id', async (req, res) => {
  const deliveryId = parseInt(req.params.id);
  const { newState } = req.body;

  try {
    const updatedDelivery = await prisma.dELIVERIES.update({
      where: {
        idDELIVERIES: deliveryId,
      },
      data: {
        state: newState,
      },
    });
    res.json(updatedDelivery);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint para contar la cantidad de pedidos por estado
router.get('/countDeliveriesByState', async (req, res) => {
  try {
    const deliveryCounts = await prisma.dELIVERIES.groupBy({
      by: ['state'],
      _count: {
        state: true,
      },
    });

    // Mapea los estados a texto y construye el objeto de respuesta
    const deliveryCountsMapped = deliveryCounts.map((count) => ({
      state: count.state,
      stateText: mapStateToText(count.state),
      count: count._count,
    }));

    res.status(200).json(deliveryCountsMapped);
  } catch (error) {
    console.error('Error al contar los pedidos por estado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Función para mapear el estado a texto
function mapStateToText(state) {
  switch (state) {
    case 0:
      return 'CANCELADO';
    case 1:
      return 'EN PREPARACION';
    case 2:
      return 'EN CAMINO';
    case 3:
      return 'ENTREGADO';
    default:
      return 'Desconocido';
  }
}


  
  /**Funcion para validar el telefono
   */
  function validatePhoneNumber(phoneNumber) {
    if (/^\+57[0-9]{10}$/.test(phoneNumber)) {
        return 'CO';  // Colombia
    } else if (/^\+52[0-9]{10}$/.test(phoneNumber)) {
        return 'MX';  // México
    } else if (/^\+54[0-9]{10}$/.test(phoneNumber)) {
        return 'AR';  // Argentina
    } else {
        return 'Invalid';  // Número no válido para ninguno de los países
    }
}
    module.exports = router