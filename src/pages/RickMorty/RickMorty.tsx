import { useEffect, useState } from 'react';
import moment from 'moment';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getCharacters } from '../../services/rickMortyService';
import { Character } from '../../interfaces/InterfaceData';


const RickMorty = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { results, totalPages } = await getCharacters(page);
                setCharacters(results);
                setTotalPages(totalPages);
            } catch (error) {
                console.error('No se pudieron cargar los personajes.');
            }
        };

        fetchData();
    }, [page]);

    const imageTemplate = (rowData: Character) => (
        <img src={rowData.image} alt={rowData.name} width={50} className="rounded" />
    );

    const dateTemplate = (rowData: Character) => moment(rowData.created).format('DD/MM/YYYY');

    return (
        <div className='container-fluid mt-5'>
            <h2 className="mb-4 text-center">Rick and Morty Characters</h2>
            <div className="container mt-5 p-4 rounded" style={{ backgroundColor: '#f9f9f9' }}>
                <div className="table-responsive">
                    <DataTable
                        value={characters}
                        sortMode="multiple"
                        className="p-datatable-sm p-datatable-striped p-shadow-1 rounded bg-white"
                        paginator={false}
                        scrollable
                    >
                        <Column field="id" header="ID" sortable style={{ width: '80px', textAlign: 'center' }} />
                        <Column field="name" header="Nombre" sortable style={{ minWidth: '300px' }} />
                        <Column field="species" header="Especie" sortable style={{ minWidth: '140px' }} />
                        <Column field="gender" header="Género" sortable style={{ minWidth: '120px' }} />
                        <Column header="Imagen" body={imageTemplate} style={{ textAlign: 'center' }} />
                        <Column
                            header="Fecha"
                            body={dateTemplate}
                            sortable
                            sortField="created"
                            style={{ width: '140px', textAlign: 'center' }}
                        />
                    </DataTable>

                    <div className="d-flex justify-content-center mt-3">
                        {[...Array(totalPages)].map((_, i) => {
                            const pageNumber = i + 1;
                            const visible = Math.abs(pageNumber - page) <= 2;

                            return visible ? (
                                <button
                                    key={pageNumber}
                                    className={`btn btn-sm mx-1 ${pageNumber === page ? 'btn-primary' : 'btn-outline-primary'
                                        }`}
                                    onClick={() => setPage(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            ) : null;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RickMorty;
