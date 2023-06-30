const express = require('express');
const dotenv = require('dotenv'); 
const cors = require('cors');
const morgan = require('morgan'); 

const connectDB = require('./config/db');
const usersRoutes = require('./routes/usersRoutes')
const camarasRoutes = require('./routes/camarasRoutes')
const naturalezaEventosRoutes = require('./routes/naturalezaEventoRoutes')
const categoriasRoutes = require('./routes/categoriasRoutes')
const subcategoriasRoutes = require('./routes/subcategoriasRoutes')
const reportesRoutes = require('./routes/reportesRoutes')
const reparticionesRoutes = require('./routes/reparticionesRoutes')
const despachosRoutes = require('./routes/despachosRoutes')

const app = express();
app.use(cors()); 
dotenv.config(); 
connectDB();

const PORT = process.env.PORT;

app.use(morgan('dev'))
app.use(express.json()); 
app.use(express.urlencoded({extended:true})) 

app.use('/users',usersRoutes)
app.use('/camaras',camarasRoutes)
app.use('/naturaleza',naturalezaEventosRoutes)
app.use('/categorias',categoriasRoutes)
app.use('/subcategorias',subcategoriasRoutes)
app.use('/reportes',reportesRoutes)
app.use('/reparticiones',reparticionesRoutes)
app.use('/despachos',despachosRoutes)

app.listen(PORT,()=>{console.log(`server listening on port ${PORT}`)})