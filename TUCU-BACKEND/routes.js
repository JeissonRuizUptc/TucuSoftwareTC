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

router.use(cors({
    origin: '*'
}));

// Exporta el router para que pueda ser utilizado como middleware en tu aplicación principal


// Crear un nuevo lugar
router.post('/newPlace', async (req, res) => {
    try {
      const { city, province, country } = req.body;
  
      // Validación de datos (puedes agregar más validaciones según tus necesidades)
      if (!city || !province || !country) {
        return res.status(400).json({ error: 'Los campos city, province y country son obligatorios.' });
      }
  
      const newPlace = await prisma.PLACES.create({
        data: {
          city,
          province,
          country,
        },
      });
  
      // Respondemos con el lugar recién creado
      res.status(201).json(newPlace);
    } catch (error) {
      console.error('Error al crear el lugar:', error);
      res.status(500).json({ error: 'Se produjo un error al crear el lugar.' });
    }
  });

  //Obtener lugar por Id
  router.get('/getPlace/:id', async (req, res) => {
    try {
        const placeId = parseInt(req.params.id, 10); // Convertir el parámetro a entero

        // Validar si el ID es válido
        if (isNaN(placeId)) {
            return res.status(400).json({ error: 'El ID proporcionado no es válido.' });
        }

        const place = await prisma.PLACES.findUnique({
            where: {
                idPLACES: placeId, // Cambiar a idPLACES según tu modelo de datos
            },
        });

        if (!place) {
            return res.status(404).json({ error: 'Lugar no encontrado.' });
        }

        res.status(200).json(place);
    } catch (error) {
        console.error('Error al obtener el lugar:', error);
        res.status(500).json({ error: 'Se produjo un error al obtener el lugar.' });
    }
});

 // INSERTAR NUEVA TIENDA
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
        const phoneNumberRegex = getPhoneNumberRegexForCountry(id_place_fk);

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

// Crear un nuevo lugar
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
  
      // Respondemos con el lugar recién creado
      res.status(201).json(newRole);
    } catch (error) {
      console.error('Error al crear el Rol:', error);
      res.status(500).json({ error: 'Se produjo un error al crear el Rol.' });
    }
  });

  //Crear nuevo usuario
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

//login realizado el sabado por Farid xd 
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

    function getPhoneNumberRegexForCountry(countryCode) {
      if (countryCode === 'CO') {
          return /^\+[0-9]{1,3}-?[0-9]{1,14}$/; // Expresión regular para Colombia
      } else if (countryCode === 'MX') {
          return /^\+[0-9]{1,3}-?[0-9]{1,10}$/; // Expresión regular para México
      } else if (countryCode === 'AR') {
          return /^\+[0-9]{1,3}-?[0-9]{1,13}$/; // Expresión regular para Argentina
      }

    // Expresión regular general por defecto
    return /^\+[0-9]{1,3}-?[0-9]{1,14}$/;
}
    

    module.exports = router