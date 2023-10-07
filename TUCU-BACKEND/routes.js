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
        const { idUSERS,username, firstname, password, surname, enabled, email, id_stores_fk, id_roles_fk } = req.body;

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

//Inicion de sesion 
/*
    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;

            // Validación de datos
            if (!email || !password) {
                return res.status(400).json({ error: 'Correo electrónico y contraseña son obligatorios.' });
            }

            // Buscar usuario por correo electrónico
            const user = await prisma.users.findUnique({
                where: { email },
            });

            // Verificar si el usuario existe
            if (!user) {
                return res.status(401).json({ error: 'Usuario no encontrado.' });
            }

            // Verificar la contraseña
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Contraseña incorrecta.' });
            }

            // Generar un token JWT
            const token = jwt.sign(
                { userId: user.idUSERS, username: user.username, email: user.email },
                'your-secret-key',  // Reemplaza con tu clave secreta
                { expiresIn: '1h' }  // Opcional: tiempo de expiración del token
            );

            // Devolver el token como parte de la respuesta
            res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        } catch (error) {
            console.error('Error en el proceso de inicio de sesión:', error);
            res.status(500).json({ error: 'Se produjo un error en el inicio de sesión.' });
        }
    });
    */
    //LOGIN FARID
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const get = await prisma.USERS.findMany({
    
            where: {
                "email": EMAIL
            }
        })
        const getPassword = await prisma.autentication.findMany({
            where: {
                "ID_USUARIO": get[0].ID_USUARIOS
            }
        })
        if (get.length > 0 && await bcryptjs.compare(PASSWORD, getPassword[0].HASH)) {
            const token = jwt.sign({ id: get[0].ID_USUARIOS }, "Secret_word", {
                expiresIn: "1h"
            })
    
            const userol = await prisma.ussers_rol.findMany({
                where: {
                    "ID_USUARIOS": get[0].ID_USUARIOS
                }
            })
    
            const rol = await prisma.rol.findMany({
                where: {
                    "ID_ROL": userol[0].ID_ROL
                }
            })
    
            res.status(200).json(
                {
                    token: token, rol: rol[0].NAME, name: get[0].NAME
                })
        }
        // if (!EMAIL || !PASSWORD) return res.sendStatus(400)
        //res.status(200).json({token:token})
        // try {
        //     const { guid } = authByEmailPwd(EMAIL, PASSWORD)
        //     const jwt = jwtConstructor.setProtectedHeader({ alg: 'hs256', typ: 'jwt' })
        //         .setIssuedAt()
        //         .setExpirationTime('1h').sign(procces.HASH)
    
        // } catch (error) {
        //     return res.sendStatus(401)
        // }
    })



   function getPhoneNumberRegexForCountry(countryCode) {
    // Implementa lógica para devolver la expresión regular según el código de país
    // Por ejemplo, para Colombia (Código de país: CO):
    if (countryCode === 'CO') {
        return /^\+[0-9]{1,3}-?[0-9]{1,14}$/;
    }
    // Agrega más lógica para otros países según sea necesario

    // Por defecto, devuelve una expresión regular general
    return /^\+[0-9]{1,3}-?[0-9]{1,14}$/;
}
    

    module.exports = router