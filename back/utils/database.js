import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('loginDB', 'root', 'dongwon1*', {
    dialect: 'mysql',
    host: 'localhost', 
    define: {
        timestamps: false
    }
});

export default sequelize;