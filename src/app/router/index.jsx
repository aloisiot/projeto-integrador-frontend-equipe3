import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Cadastro from '../../pages/Cadastro';
import ConfirmacaoReserva from '../../pages/ConfirmacaoReserva'
import DetalhesReserva from '../../pages/DetalhesReserva';
import { Provider } from 'react-redux';
import { AuthProvider } from '../auth/AuthContext';
import store from '../store';
import SearchPage from '../../pages/Search';
import CriacaoReserva from '../../pages/CriacaoReserva';

export default function RouterList(){

    return(
        <BrowserRouter>
            <Provider store={store}>
                <AuthProvider>
                    <Routes>
                        <Route path="*" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/search" element={<SearchPage/>}/>
                        <Route path="/cadastro" element={<Cadastro/>}/>
                        <Route path="/reserva/:idReserva" element={<DetalhesReserva/>} />
                        <Route path="/confirmacao-reserva/:idReserva" element={<ConfirmacaoReserva/>} />
                        <Route path="/criar-reserva" element={<CriacaoReserva/>} />
                    </Routes>
                </AuthProvider>
            </Provider>
        </BrowserRouter>
    )
}
