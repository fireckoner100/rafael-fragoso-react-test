import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import RickMorty from '../pages/RickMorty/RickMorty';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import CreateProduct from '../pages/CreateProduct';
import Upload from '../pages/Upload';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/rick-morty" element={<RickMorty />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/upload" element={<Upload />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
