const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = 3001;

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log("El servidor está escuchando en el puerto " + PORT);
  });
});
