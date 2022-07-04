import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom';
import appContext from '../context/app/appContext';
import axiosClient from '../config/axios';


const ListadoPlaylist = () => {

    const AppContext = useContext(appContext);    
    const { access_token, playlist, guardarPlaylist } = AppContext;

    //const codetoken = localStorage.getItem('xtoken');

    const [optionsSelect, saveOptionsSelect] = useState([]);
    const [playslitsSeleccionada, savePlayslitsSeleccionada] = useState(playlist);
    const [isRedirect, setIsRedirect] = useState(false);

    
    const obtenerPlaylist = async () => {

        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        axiosClient.defaults.headers.common["Content-Type"] = `application/json`;
//        const userInfo = await axiosClient.get('https://api.spotify.com/v1/me');
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        axiosClient.defaults.headers.common["Content-Type"] = `application/json`;
        const playlist = await axiosClient.get(`https://api.spotify.com/v1/me/playlists`);
        saveOptionsSelect(playlist.data.items);

    }

    useEffect(() => {
        obtenerPlaylist();
      }, []);

      const guardarPlaylistChange = () => {
        if(playslitsSeleccionada === ''){
            return false;
        }
        guardarPlaylist(playslitsSeleccionada);
        setTimeout(() => {
            setIsRedirect(true);
        }, 1000)        
      }

     
     

    
    return ( 
        <div className="py-12">
            { isRedirect ? <Redirect to="/" /> : null }
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-white font-semibold tracking-wide uppercase">Ahora selecciona tu playlist favorita</h2>
                </div>
                <label class="block text-left pt-5" >
                    <span class="text-white">Playlist</span>
                    <select 
                        className="form-select block w-full mt-1"
                        value={playslitsSeleccionada}
                        onChange={e => savePlayslitsSeleccionada(e.target.value)}
                    >
                        <option value="">--</option>
                        {
                            optionsSelect.map((playlist, key) => <option key={key} value={`${playlist.id}---${playlist.tracks.total}`}>{playlist.name}</option>)
                        }
                    </select>
                    <button 
                        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={() => guardarPlaylistChange()}
                    >
                        &nbsp;Guardar
                    </button>
                </label>
            </div>
        </div>
     );
}
 
export default ListadoPlaylist;