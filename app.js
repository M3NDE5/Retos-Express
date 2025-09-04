import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());


function agregarAHistorial(req, res, operacionTexto) {
  let historial = [];

  if (req.cookies.historial) {
    try {
      historial = JSON.parse(req.cookies.historial);
    } catch (e) {
      historial = [];
    }
  }

  historial.push(operacionTexto);

  res.cookie('historial', JSON.stringify(historial)); 
  res.send(`Resultado: ${operacionTexto}`);
}


app.get('/sumar/:n1/:n2', (req, res) => {
  const n1 = Number(req.params.n1);
  const n2 = Number(req.params.n2);
  const resultado = n1 + n2;
  const operacion = `${n1} + ${n2} = ${resultado}`;
  agregarAHistorial(req, res, operacion);
});

app.get('/restar/:n1/:n2', (req, res) => {
  const n1 = Number(req.params.n1);
  const n2 = Number(req.params.n2);
  const resultado = n1 - n2;
  const operacion = `${n1} - ${n2} = ${resultado}`;
  agregarAHistorial(req, res, operacion);
});

app.get('/multiplicar/:n1/:n2', (req, res) => {
  const n1 = Number(req.params.n1);
  const n2 = Number(req.params.n2);
  const resultado = n1 * n2;
  const operacion = `${n1} * ${n2} = ${resultado}`;
  agregarAHistorial(req, res, operacion);
});

app.get('/dividir/:n1/:n2', (req, res) => {
  const n1 = Number(req.params.n1);
  const n2 = Number(req.params.n2);
  if (n2 === 0) {
    return res.send("No se puede dividir por 0");
  }
  const resultado = n1 / n2;
  const operacion = `${n1} / ${n2} = ${resultado}`;
  agregarAHistorial(req, res, operacion);
});


app.get('/historial', (req, res) => {
  const historial = req.cookies.historial
    ? JSON.parse(req.cookies.historial)
    : [];
  res.send(historial);
});


app.get('/eliminarHistorial', (req, res) => {
  res.clearCookie('historial');
  res.send('Historial eliminado');
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
