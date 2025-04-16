import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../../interfaces/InterfaceData';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) return <div className="text-center mt-5">Cargando...</div>;

  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="pi pi-star-fill text-warning me-1" />
        ))}
        {hasHalfStar && <i className="pi pi-star-half text-warning me-1" />}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="pi pi-star text-warning me-1" />
        ))}
      </>
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">{product.title}</h2>
      <div className="row mb-4">
        <div className="col-md-4 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: 300, objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-8 text-start">
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Categoría:</strong> {product.category}</p>
          <p><strong>Descripción:</strong> {product.description}</p>
          <p className="d-flex align-items-center">
            <strong className="me-2">Rating:</strong>
            {renderStars(product.rating.rate)}
            <span className="ms-2 text-muted">({product.rating.count} valoraciones)</span>
          </p>

          <button className="btn btn-outline-primary mt-3" onClick={() => navigate('/products')}>
            ← Volver a productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
