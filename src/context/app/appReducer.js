import {
    AUTORIZACION_SPOTIFY,
    OBTENER_PLAYLIST_SPOTIFY,
    OBTENER_PLAYLIST_SPOTIFY_EXITO,
    OBTENER_PLAYLIST_SPOTIFY_ERROR,
    UPDATE_TOKEN_SPOTIFY,
    UPDATE_STATE_TOKEN,
    SELECCIONAR_PLAYLIST_SPOTIFY,
    GUARDAR_ALARMA,
    GUARDAR_DISPOSITIVO,
    SAVE_ALARM
    } from '../../types';


export default ( state, action) => {
    switch(action.type) {
        case AUTORIZACION_SPOTIFY:
            return {
                ...state,
                authorization_code: action.payload.authorization_code,
                access_token: action.payload.access_token,
                expireToken: action.payload.expire,
                refreshToken: action.payload.refreshToken,
                createToken: action.payload.createToken,
            }
        case OBTENER_PLAYLIST_SPOTIFY:
            return {
                ...state,
                
            }

        case OBTENER_PLAYLIST_SPOTIFY_EXITO:
            return {
                ...state,
                token: action.payload.token,
                tokencliente: action.payload.tokencliente,
                expireToken: action.payload.expire,
                refreshToken: action.payload.refreshToken,
            }

        case UPDATE_TOKEN_SPOTIFY:
            return {
                    ...state,
                    tokencliente: action.payload.tokencliente,
                    expireToken: action.payload.expire,
                    stateToken: true,
                }

        case OBTENER_PLAYLIST_SPOTIFY_ERROR:
            return {
                ...state
            }

        case UPDATE_STATE_TOKEN:
            return {
                ...state,
                stateToken: action.payload,
                tokencliente: null
            }
        case SELECCIONAR_PLAYLIST_SPOTIFY:
            return {
                ...state,
                playlist: action.payload,
            }
        case GUARDAR_DISPOSITIVO:
            return {
                ...state,
                dispositivo: action.payload,
            }
        case SAVE_ALARM:
            return {
                ...state,
                alarma: action.payload,
            }
        default:
            return state;
    }
}