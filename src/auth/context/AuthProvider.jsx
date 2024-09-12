import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { types } from '../types';


//* El init es el tercer param donde se puede inicializar el state.
const init = () => {
    
    const userStoraged = JSON.parse( localStorage.getItem( 'userStoraged' ) );

    return {
        logged: !!userStoraged, //? Doble negacion para saber si hay info del usuario almacenado en el localstorage.
        userInfo: userStoraged,
    }

}

// const initialState = {
//     logged: false,
// }

export const AuthProvider = ({ children }) => {
  
    //* El init es el tercer param del useReducer hook que puede ser opcional. En este caso lo usamos para poder guardar los datos del usuario en el localstorage.
    const [ authState, dispatch ] = useReducer( authReducer, {}, init );
    // const [ authState, dispatch ] = useReducer( authReducer, initialState );

    const login = ( name = '' ) => {
        
        const userObj = { id: 'ABC', name: name, };

        const action = {
            type: types.login,
            payload: userObj,
            // payload: {
            //     id: 'ABC',
            //     name: name,
            // }
        };

        localStorage.setItem( 'userStoraged', JSON.stringify( userObj ) );

        dispatch( action );

    }

    const logout = () => {
        
        localStorage.removeItem( 'userStoraged' );

        const action = { type: types.logout, };

        dispatch( action );

    }

    return (
        <AuthContext.Provider 
            value={
                {
                    ...authState,
                    login,
                    logout,
                }
            }
        >
            { children }
        </AuthContext.Provider>
    )

}
