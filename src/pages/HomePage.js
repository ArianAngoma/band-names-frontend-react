import {useContext} from 'react';

/* Importaciones propias */
import {SocketContext} from '../context/SocketContext';

function HomePage() {
    const {online} = useContext(SocketContext);

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
                    {/*<BandList data={bands} vote={vote} deleteBand={deleteBand} changeName={changeName}/>*/}
                </div>

                <div className="col-4">
                    {/*<BandAdd/>*/}
                </div>
            </div>

        </div>
    );
}

export default HomePage;
