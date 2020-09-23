import { Router } from 'express';
import cors from 'cors';
import BrandController from './app/controllers/BrandController';
import ProductController from './app/controllers/ProductController';
import SaleController from './app/controllers/SaleController';
import ClientController from './app/controllers/ClientController';

const routes = Router();
routes.use(cors());
routes.get('/', (req, res) => res.json({ result: 'TEST-API' }));

// routes BRANDS
routes.post('/brands', BrandController.store);
routes.get('/brands/:uid', BrandController.show);
routes.get('/brands', BrandController.index);

// routes PRODUCT
routes.post('/products', ProductController.store);
routes.get('/products/:uid', ProductController.show);
routes.get('/products', ProductController.index);

// routes Sales
routes.post('/sales', SaleController.store);
routes.get('/sales/:uid', SaleController.show);
routes.get('/sales', SaleController.index);

// routes Client
routes.post('/clients', ClientController.store);
routes.get('/clients/:uid', ClientController.show);
routes.get('/clients', ClientController.index);

export default routes;
