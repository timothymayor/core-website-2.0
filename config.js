module.exports = {
  port: process.env.PORT || 8000,
  host: process.env.HOST || 'localhost',
  dbPass: process.env.PASS || 'fullstackdb',
  dbname: process.env.NAME || 'fullstackdb',
  dbconnection: process.env.DBURL || 'mongodb+srv://fullstackdb:fullstackdb@full-stack-r4ajg.mongodb.net/test?retryWrites=true&w=majority'
}
