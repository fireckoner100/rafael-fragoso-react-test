import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createProduct } from '../../services/productService';
import { ProductForm } from '../../interfaces/InterfaceData';

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductForm>({ mode: 'onChange' });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    try {
      const productData = {
        ...data,
        category: 'general',
      };

      await createProduct(productData);

      Swal.fire({
        icon: 'success',
        title: 'Producto creado',
        text: 'El producto fue creado exitosamente 🎉',
        confirmButtonText: 'Ver productos',
      }).then(() => {
        navigate('/products');
      });

      reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al crear el producto',
      });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 800 }}>
      <h2 className="mb-4 text-center">Crear Producto</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Título */}
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            {...register('title', {
              required: 'Campo requerido',
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Solo letras permitidas',
              },
            })}
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>

        {/* Precio */}
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            step="0.01"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            {...register('price', {
              required: 'Campo requerido',
              valueAsNumber: true,
              min: { value: 0, message: 'Debe ser mayor a 0' },
            })}
          />
          {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            rows={3}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            {...register('description', {
              required: 'Campo requerido',
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Solo letras permitidas',
              },
            })}
          ></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
        </div>

        {/* Imagen */}
        <div className="mb-3">
          <label className="form-label">Imagen (URL o identificador)</label>
          <input
            type="text"
            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
            {...register('image', {
              required: 'Campo requerido',
              pattern: {
                value: /^[a-zA-Z0-9-_:.\/]+$/,
                message: 'Solo texto alfanumérico permitido',
              },
            })}
          />
          {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Crear Producto
        </button>

        <button
          type="button"
          className="btn btn-outline-danger mt-4"
          onClick={() => navigate('/products')}
        >
          ← Volver a productos
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
