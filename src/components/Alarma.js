import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom';
import appContext from '../context/app/appContext';

const Alarma = () => {
    const AppContext = useContext(appContext);  
    const { access_token, playlist, dispositivo, alarma, saveAlarm, playmusic, createToken } = AppContext;

    const [alarm, setAlarm] = useState(false);


    let setAlarmStart;
    if(access_token == null){
        return <Redirect to="/autorization" />
    }
    if(access_token !== null && playlist === ''){
        return <Redirect to="/lista-playlist" />
    }
    if((access_token !== null || playlist !== '') && dispositivo == null){
        return <Redirect to="/lista-dispositivos" />
    }

    const startAlarm = async () => {

        saveAlarm(alarma);
        setAlarm(true);

        if(alarma === ''){
            return false;
        }

        let seconds = alarma.split(':');
        let player = false;
        setAlarmStart = setInterval(() => {
            let date = new Date();
            if(Number(date.getHours()) === Number(seconds[0]) && Number(date.getMinutes()) === Number(seconds[1]) && !player){
                player = true;
                playmusic(new Date(), createToken);
            }
        }, 3000);




    }

    const changeAlarm = async () => {

        clearInterval(setAlarmStart);
        setAlarm(false);
    }

    
    
    return ( 
        <div>
        {alarm === true ?
            (<div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-white font-semibold tracking-wide uppercase">¡ Alarma configurada !</h2>

                </div>
                <br/>
                <div className="container contentAlarm">
                    <h2 className="text-base text-white font-semibold tracking-wide uppercase">{alarma}</h2>
                    <br/>
                    <button 
                        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={() => changeAlarm()}
                    >
                        &nbsp;Cambiar
                </button>
                </div>
            </div>
        </div>) : 
            (<div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-white font-semibold tracking-wide uppercase">Ahora Configuremos la alarma</h2>

                </div>
                <br/>
                <div className="container contentAlarm">
                    <input type="time" id="appt" className='inputtime' name="appt"min="09:00" max="18:00" required value={alarma} onChange={(e)=> saveAlarm(e.target.value)} />
                    <br/>
                    <button 
                        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={() => startAlarm()}
                    >
                        &nbsp;Guardar
                </button>
                </div>
            </div>
        </div>)
        }
        </div>

     );
}
 
export default Alarma;