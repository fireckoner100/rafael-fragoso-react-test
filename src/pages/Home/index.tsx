import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const menuOptions = [
    {
      title: 'Rick and Morty',
      description: 'Explora personajes con paginación y orden.',
      route: '/rick-morty',
      icon: 'bi bi-people-fill',
    },
    {
      title: 'Productos',
      description: 'Consulta todos los productos disponibles.',
      route: '/products',
      icon: 'bi bi-box-seam',
    },
    {
      title: 'Crear Producto',
      description: 'Agrega nuevos productos fácilmente.',
      route: '/create-product',
      icon: 'bi bi-plus-circle-fill',
    },
    {
      title: 'Subir Imagen',
      description: 'Arrastra y suelta imágenes para subirlas.',
      route: '/upload',
      icon: 'bi bi-upload',
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Menú Principal</h2>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {menuOptions.map((option, index) => (
          <div className="col" key={index}>
            <div
              className="card shadow-sm h-100 border-0 hover-shadow"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(option.route)}
            >
              <div className="card-body text-center">
                <i className={`${option.icon} display-4 text-primary mb-3`} />
                <h5 className="card-title">{option.title}</h5>
                <p className="card-text text-muted">{option.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
