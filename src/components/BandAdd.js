import {useContext, useState} from 'react';

/* Importaciones propias */
import {SocketContext} from '../context/SocketContext';

export const BandAdd = () => {
    const [value, setValue] = useState('');

    const {socket} = useContext(SocketContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value.trim().length > 0) {
            socket.emit('create-new-band', {name: value});

            setValue('');
        }
    }

    return (
        <>
            <h3>Agregar Banda</h3>

            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control" placeholder="Nuevo nombre de banda"
                       value={value} onChange={(e) => setValue(e.target.value)}/>
            </form>
        </>
    )
}