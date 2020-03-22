// it("function", ()=>{
//   console.log("Hola test")
//   expect(true).toBeTruthy()
// });

const express = require("express");
const logger = require("morgan");
const PinsRouter = require("./routes/pins");
const http = require("http");
const Pins = require("./models/Pins");
const request =require('request');

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use("port", 3000);
app.use("/api", PinsRouter);

describe("Testing Router", () => {
  let server;

  //Antes de todo (iniciar las pruebas), vamos a inicializar los paquetes
  beforeAll(() => {
    server = http.createServer(app);
    server.listen(3000);
  });

  //Despues de que terminen las pruebas
  afterAll(() => {
    server.close();
  });

  describe("GET", () => {
    // it("200 and find pin", () => {
    //El done no sindica que es un metodo async
    it("200 and find pin", done => {
      const data = [{id:1}]
      //mira cuando se ejecuta un metodo
      //Vamos a espiar el metodo find del objeto Pins
      spyOn(Pins, "find").and.callFake(callBack =>{
        callBack(false,data);
      });

      request.get('http://localhost:3000/api', (error, response, body)=>{
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{id:1}]);
        done();
      });
    });
  });
});
