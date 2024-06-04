/**
 * Handles errors returned from API requests.
 * @param {Error} error - The error object.
 * @returns {Object} - An object containing error details.
 */

export default function errorHandler(error) {

    if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx           
        console.error(error.response.data);
        return { error: true, status: error.response.status, data: error.response.data };
    } else if (error.request) {
        // The request was made but no response was received
        let message = `NO SE PUDO CONECTAR CON EL SERVIDOR: ${error.request._currentUrl?? 'URL no disponible'}`;
        console.error(message);
        return { error: true, status: 500, data: message, message: 'No se pudo conectar con el servidor' };
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
        return { error: true, status: 500, data: error.message, message: 'Error en la petición' };
    }
}