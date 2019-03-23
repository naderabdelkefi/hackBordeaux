import fastify from "fastify"
import Sequelize from "sequelize"

const app = fastify({
  logger: {
    prettyPrint: true
  }
})

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  // Note: using `force: true` will drop the table if it already exists
  User.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
      userName: 'hack',
      password: 'hack',
      email: 'hack@hack.com'

    });
  });
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const User = sequelize.define('User', {
  // attributes
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email:  {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  // options
});



app.get('/', async (request, reply) => {
  return 'Hello world!'
})

app.listen(3000, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`server listening on ${address}`)
})
