import {useState} from 'react';

export const BandAdd = ({createNewBand}) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value.trim().length > 0) {
            createNewBand(value);

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