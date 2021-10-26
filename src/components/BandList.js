import {useContext, useEffect, useState} from 'react';

/* Importaciones propias */
import {SocketContext} from '../context/SocketContext';

export const BandList = () => {
    /* Socket */
    const {socket} = useContext(SocketContext);

    const [bands, setBands] = useState([]);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands);
        });

        /* Dejar de escuchar el evento si el componente es desmontado */
        return () => socket.off('current-bands');
    }, [socket]);

    /* Método para cambiar el nombre de la banda */
    const handleChangeName = (event, id) => {
        const newName = event.target.value;
        setBands(bands => bands.map(band => {
            if (band.id === id) band.name = newName;
            return band;
        }));
    }

    /* Método para disparar evento de socket cuando se pierde el focus en el input */
    const onNotFocus = (id, name) => {
        // console.log(id, name);
        socket.emit('change-name-band', {id, name});
    }

    /* Método para votar una banda */
    const vote = (id) => {
        socket.emit('vote-band', id);
    }

    /* Método para eliminar banda */
    const deleteBand = (id) => {
        socket.emit('delete-band', id);
    }

    const createRows = () => {
        return (
            bands.map(band => (
                <tr key={band.id}>
                    <td>
                        <button className="btn btn-primary"
                                onClick={() => vote(band.id)}>
                            +1
                        </button>
                    </td>
                    <td>
                        <input className="form-control"
                               value={band.name}
                               onChange={(event) => handleChangeName(event, band.id)}
                               onBlur={() => onNotFocus(band.id, band.name)}/>
                    </td>
                    <td><h3>{band.votes}</h3></td>
                    <td>
                        <button className="btn btn-danger" onClick={() => deleteBand(band.id)}>Borrar</button>
                    </td>
                </tr>
            ))
        )
    }

    return (
        <>
            <table className="table table-stripped">
                <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
                </thead>

                <tbody>
                {createRows()}
                </tbody>
            </table>
        </>
    )
}