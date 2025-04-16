import { useState, DragEvent, ChangeEvent } from 'react';

const Upload = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const handleFile = (file: File) => {
    if (!validTypes.includes(file.type)) {
      setError('Formato no válido. Solo se permiten PNG, JPEG o JPG.');
      setPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <h2 className="text-center mb-4">Subir Imagen</h2>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border border-2 border-primary rounded p-5 text-center"
        style={{ cursor: 'pointer', backgroundColor: '#f9f9f9' }}
      >
        <p className="text-muted mb-0">
          Arrastra una imagen aquí o selecciona una
        </p>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleChange}
          className="form-control mt-3"
        />
      </div>

      {error && (
        <div className="alert alert-danger mt-3 text-center">{error}</div>
      )}

      {preview && (
        <div className="mt-4 text-center">
          <img
            src={preview}
            alt="Preview"
            className="img-fluid rounded"
            style={{ maxHeight: 300 }}
          />
          <br />
          <button className="btn btn-danger mt-3" onClick={handleRemove}>
            Eliminar imagen
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
