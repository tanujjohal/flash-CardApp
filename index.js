const {sequelize} = require("./models");
const PORT = process.env.PORT || 8000;
const {app} = require("./routes/index");

sequelize.sync({ force: false, alter: 'true' }).then(() => {
    console.log(`Database & tables created!`)
}).catch(error=>console.log(error,"error"));


app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
});