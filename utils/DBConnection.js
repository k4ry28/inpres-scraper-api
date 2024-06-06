import Sequelize from 'sequelize';

class Database {
    constructor() {
        if (!Database.instance) {
            // Configuración de Sequelize
            this.sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: './db/database.sqlite',
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000,
                    aquire: 30000,
                },
                logging: true,
            });

            // Definición de modelos y otras configuraciones de Sequelize

            Database.instance = this;

            // Sincronización de los modelos
            this.syncModels();
        }

        return Database.instance;
    }

    // Métodos y funcionalidades adicionales
    async syncModels() {
        try {
            await this.sequelize.sync();
            //console.log('Todos los modelos se han sincronizado correctamente.');
        } catch (error) {
            console.error('Error al sincronizar modelos:', error);
        }
    }
}

// Uso del Singleton
const dbInstance = new Database();

// Exporta la instancia única del Singleton
export default dbInstance;
