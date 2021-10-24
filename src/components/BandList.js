import {useEffect, useState} from 'react';

export const BandList = ({data, vote, deleteBand, changeName}) => {
    const [bands, setBands] = useState(data);

    useEffect(() => {
        setBands(data);
    }, [data]);

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
        changeName(id, name);
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