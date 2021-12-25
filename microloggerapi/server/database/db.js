module.exports = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    dbName: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
};