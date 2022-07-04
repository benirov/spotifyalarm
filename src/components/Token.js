import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import appContext from '../context/app/appContext';
import { Redirect } from 'react-router-dom';
const Token = () => {
    const AppContext = useContext(appContext);    
    const { ObtenerToken } = AppContext;
    let history = useHistory();
    const [code, setcode] = useState(null)

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const authorization_code = queryParams.get('code');
        if(authorization_code){
            ObtenerToken(authorization_code);
            setcode(authorization_code);
        }
      }, []);

      if(code) { 
          setTimeout(() => {
            history.push("/");
            //return <Redirect to="/dashboard" />
          },3000)
        }

    return ( 
        <div>
            <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-white font-semibold tracking-wide uppercase">Obteniendo Token...</h2>
                </div>
            </div>
        </div>
        </div>
     );
}
 
export default Token;