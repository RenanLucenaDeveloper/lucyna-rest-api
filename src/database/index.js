const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://reenanluceena:churugu12@lucynadb.bhvboci.mongodb.net/?retryWrites=true&w=majority',
    {},
  )
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
  })
  .catch((error) => {
    console.log(`Erro ao estabelecer conexão com o MongoDB: ${error}`);
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;
