import {useEffect, useState} from 'react';
import io from 'socket.io-client';

/* Importaciones propias */
import {BandAdd} from './components/BandAdd';
import {BandList} from './components/BandList';

const connectSocketServer = () => {
    return io.connect('http://localhost:4000', {
        transports: ['websocket']
    });
}

function App() {
    const [socket] = useState(connectSocketServer());
    const [online, setOnline] = useState(false);
    const [bands, setBands] = useState([]);

    useEffect(() => {
        // console.log(socket);
        setOnline(socket.connected)
    }, [socket]);

    useEffect(() => {
        socket.on('connect', () => [
            setOnline(true)
        ]);
    }, [socket]);

    useEffect(() => {
        socket.on('disconnect', () => [
            setOnline(false)
        ]);
    }, [socket]);

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
                    <BandAdd/>
                </div>
            </div>

        </div>
    );
}

export default App;
