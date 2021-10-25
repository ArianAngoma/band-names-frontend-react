import {useState} from 'react';
import {useSocket} from '../hooks/useSocket';

export const BandAdd = () => {
    const [value, setValue] = useState('');

    const {socket} = useSocket('http://localhost:4000');

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