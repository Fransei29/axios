const express = require('express');
const axios = require('axios');
const cors = require("cors");
const path = require('path');

const app = express()

// Permitir solicitudes OPTIONS en todos los recursos (necesario para CORS pre-flight requests)
app.options("*", cors())

// Configurar CORS
const corsOptions = {
    origin: 'http://localhost:3001/', // Reemplaza con el dominio de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Si necesitas enviar cookies con las solicitudes
    optionsSuccessStatus: 204 // Para que las solicitudes pre-flight no den errores en navegadores antiguos
};

app.use(cors(corsOptions));
// Servir archivos estáticos desde el directorio "client"
app.use(express.static(path.join(__dirname, 'client')));
  
// Ruta que utiliza CORS con opciones específicas
app.get("/products/:id", cors(corsOptions), (req, res, next) => {
    res.json({ msg: `Product ID: ${req.params.id}` });
})

// Ruta simple con CORS habilitado
app.get("/with-cors", cors(), (req, res, next) => {
    res.json({ msg: "WHOAH with CORS it works! 🔝 🎉" })
})

// Función para hacer una solicitud POST
const postBreed = async (breedName, breedInfo) => {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { // Realiza una solicitud POST a una URL de API de prueba
            name: breedName,
            info: breedInfo
        });
        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('Error posting breed data:', error);
    }
};

// Ejemplo de uso de la función postBreed
postBreed('Bulldog', {
    origin: 'England',
    size: 'Medium',
    temperament: 'Friendly'
});

// Función asincrónica para obtener la lista de razas de perros (tambien, si la API lo permite, se pueden usar parametros para una busqueda mas especifica)
const getBreeds = async () => {
    try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        if (response) {
            console.log('Our kinds of breeds are:', response.data.message)
            return response.data.message; // Devuelve solo la parte relevante de la respuesta    
        } else {
            console.error('La respuesta no es JSON:', response.data);
        }
    } catch (error) {
        console.error('Error fetching breeds:', error);
    }
};


// Función asincrónica para contar la cantidad de razas de perros
const countBreeds = async () => {
    const breedsData = await getBreeds(); // Llama a la función getBreeds

    if (breedsData) {
        const breedCount = Object.entries(breedsData).length;
        console.log(`So at the end i got ${breedCount} kinds of breeds`); // Solo imprime el conteo de las razas
    }
};

// Llamar a la función para contar las razas de perros
countBreeds()

// Iniciar el servidor en el puerto 3000
const server = app.listen(3000, () => {
    console.log("Listening on port", server.address().port);
});


