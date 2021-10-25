/* Importaciones propias */
import {SocketProvider} from './context/SocketContext';
import App from './App';

export const BandNamesApp = () => {
    return (
        <SocketProvider>
            <App/>
        </SocketProvider>
    )
}