import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Cadastro from '../../pages/Cadastro';
import DetalhesReserva from '../../pages/DetalhesReserva';
import { Provider } from 'react-redux';
import { AuthProvider } from '../auth/AuthContext';
import store from '../store';

export default function RouterList(){

    return(
        <BrowserRouter>
            <Provider store={store}>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/cadastro" element={<Cadastro/>}/>
                        <Route path="/reserva/:idReserva" element={<DetalhesReserva/>} />
                    </Routes>
                </AuthProvider>
            </Provider>
        </BrowserRouter>
    )
}
