import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import { ProductsInterface } from '../../interfaces/InterfaceData';

const Products = () => {
  const [products, setProducts] = useState<ProductsInterface[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductsInterface[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('No se pudieron cargar los productos');
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Productos</h2>

      <div className="row">
        <div className="col-md-12 text-start">
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate('/create-product')}
          >
            <i className="fas fa-plus"></i> Crear producto
          </button>
        </div>
        <div className="col-md-12">
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          No se encontraron productos con el nombre "<strong>{search}</strong>"
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
          {filteredProducts.slice(0, 20).map((product) => (
            <div className="col" key={product.id}>
              <div
                className="card h-100"
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={product.image}
                  className="card-img-top p-3"
                  alt={product.title}
                  style={{ height: 200, objectFit: 'contain' }}
                />
                <div className="card-body">
                  <h6 className="card-title">{product.title}</h6>
                  <p className="card-text">
                    <strong>Precio:</strong> ${product.price}
                  </p>
                  <p className="card-text">
                    <strong>Categoría:</strong> {product.category}
                  </p>
                  <p className="card-text small">
                    {product.description.substring(0, 60)}...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
