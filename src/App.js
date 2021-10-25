import {useEffect, useState} from 'react';

/* Importaciones propias */
import {BandAdd} from './components/BandAdd';
import {BandList} from './components/BandList';
import {useSocket} from './hooks/useSocket';

function App() {
    const [bands, setBands] = useState([]);

    const {socket, online} = useSocket('http://localhost:4000');

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            // console.log(bands);
            setBands(bands);
        });
    }, [socket]);

    /* Incrementar voto de banda */
    const vote = (id) => {
        // console.log(id);
        socket.emit('vote-band', id);
    }

    /* Eliminar banda */
    const deleteBand = (id) => {
        socket.emit('delete-band', id);
    }

    /* Cambia nombre de banda */
    const changeName = (id, name) => {
        socket.emit('change-name-band', {id, name});
    }

    /* Agregar nueva banda */
    const createNewBand = (name) => {
        socket.emit('create-new-band', {name});
    }

    return (
        <div className="container">
            <div className="alert">
                <p>
                    Service status:

                    {
                        (online)
                            ? <span className="text-success"> Online</span>
                            : <span className="text-danger"> Offline</span>
                    }
                </p>
            </div>

            <h1>Band Names</h1>
            <hr/>

            <div className="row">
                <div className="col-8">
                    <BandList data={bands} vote={vote} deleteBand={deleteBand} changeName={changeName}/>
                </div>

                <div className="col-4">
                    <BandAdd createNewBand={createNewBand}/>
                </div>
            </div>

        </div>
    );
}

export default App;
