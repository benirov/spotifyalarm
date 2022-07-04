import React, { useState, useEffect, useContext } from 'react'
import appContext from '../context/app/appContext';
import { Redirect } from 'react-router-dom';
import axiosClient from '../config/axios';


const ListadoDispositivos = () => {

    const AppContext = useContext(appContext);    
    const { access_token, playlist, guardarDispositivos, dispositivo } = AppContext;

    const [optionsSelect, saveOptionsSelect] = useState([]);
    const [textoption, saveTextOption] = useState('Guardar');
    const [DispositivoSeleccionada, saveDispositivosSeleccionada] = useState(dispositivo);
    const [isRedirect, setIsRedirect] = useState(false);

    
    const obtenerDispositivos = async (token) => {
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${access_token}`; 
        axiosClient.defaults.headers.common["Content-Type"] = `application/json`;
        const devices = await axiosClient.get('https://api.spotify.com/v1/me/player/devices');
        if(devices.data.devices.length === 0){ 
            saveTextOption('Refrescar');
        }else{
            if(devices.data.devices.length == 0) saveTextOption('Refrescar');
            saveOptionsSelect(devices.data.devices);
        }

    }

    useEffect(() => {
        obtenerDispositivos();
      }, []);

      const guardarDispositivoChange = () => {
        if(DispositivoSeleccionada === ''){
            return false;
        }
        guardarDispositivos(DispositivoSeleccionada);
        setTimeout(() => {
            setIsRedirect(true);
        }, 1000)
      }

     

    
    return ( 
        <div className="py-12">
            { isRedirect ? <Redirect to="/" /> : null }
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-white font-semibold tracking-wide uppercase">Ahora selecciona un dispositivos</h2>
                    <p className="text-white"> En este punto te recordamos que debes tener abierta la app en el dispositivo que quieres que suene la alarma</p>
                </div>
                <label class="block text-left pt-5" >
                    <span class="text-white">Dispositivo</span>
                    <select 
                        className="form-select block w-full mt-1"
                        value={DispositivoSeleccionada}
                        onChange={e => saveDispositivosSeleccionada(e.target.value)}
                    >
                        <option value="">--</option>
                        {
                            optionsSelect.map((devices, key) => <option value={devices.id}>{devices.name} - {(devices.is_active) ? 'Activo' : 'Inactivo'}</option>)
                        }
                    </select>
                    <button 
                        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={() => guardarDispositivoChange()}
                    >
                        &nbsp;{textoption}
                    </button>
                </label>
            </div>
        </div>
     );
}
 
export default ListadoDispositivos;