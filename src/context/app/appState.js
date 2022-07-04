import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import Qs from "qs";

import {
    AUTORIZACION_SPOTIFY,
    OBTENER_PLAYLIST_SPOTIFY,
    OBTENER_PLAYLIST_SPOTIFY_EXITO,
    OBTENER_PLAYLIST_SPOTIFY_ERROR,
    SELECCIONAR_PLAYLIST_SPOTIFY,
    UPDATE_TOKEN_SPOTIFY,
    UPDATE_STATE_TOKEN,
    SAVE_ALARM,
    GUARDAR_DISPOSITIVO
} from '../../types';

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';


const AppState = ({children}) => {

    //definir state
    const initialState = {
        createToken : null,
        authorization_code: null,
        access_token: null,
        expireToken : null,
        refreshToken : null,
        validToken: false,
        playlist: '',
        alarma: '',
        dispositivo: null,
        ObtenerToken: null,
        token: null,
        setStateApp : null,
        playmusic: null,
    }

    //definir reducer
    const  [ state, dispatch ] = useReducer(appReducer, initialState);


    const ObtenerToken = async (authorization_code) => {
        

        //obtenemos Acceso a traves del token
        try {
            const authScret = window.btoa(`${process.env.REACT_APP_CLIENT_ID_KEY_SPOTIFY}:${process.env.REACT_APP_SECRET_ID_KEY_SPOTIFY}`);
            var data = Qs.stringify({
                'grant_type': 'authorization_code',
                'redirect_uri': `${process.env.REACT_APP_URL_FRONTEND}token`,
                'code': `${authorization_code}` 
            });
            axiosClient.defaults.headers.common["Content-Type"] = `application/x-www-form-urlencoded`;
            axiosClient.defaults.headers.common["Authorization"] = `Basic ${authScret}`;
            axiosClient.defaults.headers.common["Cookie"] = `__Host-device_id=AQB2cMuU1I8bI6hDZPKWQX4CjxWvfV90j_pvZCFJxl5Mkfug78h3HYYLokAodw6NBHEFvazHJrvmVKkV18MFDf80d7siatP0o20; sp_tr=false`;
            const resultado = await axiosClient.post('/api/token',  data);
            const date = new Date();
            date.setHours(date.getHours() + 1);
            dispatch({
                type:AUTORIZACION_SPOTIFY,
                payload: {
                    authorization_code: authorization_code,
                    access_token:resultado.data.access_token,
                    expire:resultado.data.expires_in,
                    refreshToken:resultado.data.refresh_token,
                    createToken : date.getTime()
                }
            })
            
        } catch (error) {
            dispatch({
                type:OBTENER_PLAYLIST_SPOTIFY_ERROR,
            })
            
        }
    }

   

    const saveToken = async (token) => {
        

        //obtenemos Acceso a traves del token
        try {
            const authScret = window.btoa(`${process.env.REACT_APP_CLIENT_ID_KEY_SPOTIFY}:${process.env.REACT_APP_SECRET_ID_KEY_SPOTIFY}`);
            var data = Qs.stringify({
                'grant_type': 'authorization_code',
                'redirect_uri': `${process.env.REACT_APP_URL_FRONTEND}token`,
                'code': `${token}` 
            });
            axiosClient.defaults.headers.common["Content-Type"] = `application/x-www-form-urlencoded`;
            axiosClient.defaults.headers.common["Authorization"] = `Basic ${authScret}`;
            axiosClient.defaults.headers.common["Cookie"] = `__Host-device_id=AQB2cMuU1I8bI6hDZPKWQX4CjxWvfV90j_pvZCFJxl5Mkfug78h3HYYLokAodw6NBHEFvazHJrvmVKkV18MFDf80d7siatP0o20; sp_tr=false`;
            const resultado = await axiosClient.post('/api/token',  data);
            dispatch({
                type:OBTENER_PLAYLIST_SPOTIFY_EXITO,
                payload: {
                    token:token,
                    tokencliente:resultado.data.access_token,
                    expire:resultado.data.expires_in,
                    refreshToken:resultado.data.refreshToken,
                }
            })
            
        } catch (error) {
            dispatch({
                type:OBTENER_PLAYLIST_SPOTIFY_ERROR,
            })
            
        }
    }

    const validToken = async (hour, createToken) => {

        return new Promise( async resolve => {
            if(hour.getTime() > createToken){
                resolve(true);
            }else{
                resolve(false);
            }
        });

    }

    const refrescarToken = async () => {

        return new Promise( async resolve => {

            //debemos actualizar el token
            const authScret = window.btoa(`${process.env.REACT_APP_CLIENT_ID_KEY_SPOTIFY}:${process.env.REACT_APP_SECRET_ID_KEY_SPOTIFY}`);
            var data = Qs.stringify({
                'grant_type': 'refresh_token',
                'refresh_token': state.refreshToken,
            });
            axiosClient.defaults.headers.common["Content-Type"] = `application/x-www-form-urlencoded`;
            axiosClient.defaults.headers.common["Authorization"] = `Basic ${authScret}`;
            axiosClient.defaults.headers.common["Cookie"] = `__Host-device_id=AQB2cMuU1I8bI6hDZPKWQX4CjxWvfV90j_pvZCFJxl5Mkfug78h3HYYLokAodw6NBHEFvazHJrvmVKkV18MFDf80d7siatP0o20; sp_tr=false`;
            const resultado = await axiosClient.post('/api/token',  data);
                dispatch({
                    type:UPDATE_TOKEN_SPOTIFY,
                    payload: {
                        tokencliente:resultado.data.access_token,
                        expire:resultado.data.expires_in,
                    }
                })
                resolve(resultado.data.access_token);
            }
        );

        

    }

    const guardarPlaylist = playlist  => {
        dispatch({
            type:SELECCIONAR_PLAYLIST_SPOTIFY,
            payload: playlist
        })
    }
    const guardarDispositivos = playlist  => {
        dispatch({
            type:GUARDAR_DISPOSITIVO,
            payload: playlist
        })
    }

    const saveAlarm = alarm  => {
        dispatch({
            type:SAVE_ALARM,
            payload: alarm
        })
    }

    const playmusic = async (date, createToken) => {
        const TokenExpire =  await validToken(date, createToken);
        let token = state.access_token;
        if(TokenExpire) {
            token = await refrescarToken();
        };
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axiosClient.defaults.headers.common["Content-Type"] = `application/json`;
        //transferimos reproduccion
        let data = JSON.stringify({
            "device_ids": [
                state.dispositivo
            ]
          });
        await axiosClient.put('https://api.spotify.com/v1/me/player', data);
        let playlist = state.playlist.split('---');
        let random = Math.floor(Math.random() * (playlist[1] - 0) + 0)
        data = {
            'context_uri': `spotify:playlist:${playlist[0]}`,
            'offset' : {'position' : random}
        };
        await axiosClient.put(`https://api.spotify.com/v1/me/player/play?device_id=${state.dispositivo}`, data);
        
        
    }

   

    return (
        <appContext.Provider
            value={{
                autorizacionspotify: state.autorizacionspotify,
                playlist: state.playlist,
                alarma: state.alarma,
                token:state.token,
                dispositivo:state.dispositivo,
                expireToken:state.expireToken,
                createToken:state.createToken,
                refreshToken:state.refreshToken,
                stateToken:state.stateToken,
                authorization_code: state.authorization_code,
                access_token: state.access_token,
                saveToken,
                guardarPlaylist,
                guardarDispositivos,
                validToken,
                refrescarToken,
                ObtenerToken,
                saveAlarm,
                playmusic
            }}
         >
             {children}
        </appContext.Provider>
    )

}

export default AppState;