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
router.put('/deliveries/:id', async (req, res) => {
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

    // Mapea el valor del campo state a los textos correspondientes
    const estadoMapeado = tienda.DELIVERIES.map((delivery) => {
      delivery.state = mapStateToText(delivery.state);
      return delivery;
    });

    tienda.DELIVERIES = estadoMapeado;

    res.json(tienda);
  } catch (error) {
    console.error('Error al buscar la tienda y sus pedidos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
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