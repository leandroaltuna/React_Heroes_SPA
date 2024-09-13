import { authReducer } from "../../../src/auth/context";
import { types } from "../../../src/auth/types";


describe( 'Prueba en authReducer', () => { 
    
    const initialState = { logged: false }

    test( 'Debe retornar el estado por defecto', () => { 
        
        const newState = authReducer( initialState, {} );

        expect( newState ).toBe( initialState );
        
    });

    test( 'Debe de llamar el login y establecer el usuario', () => { 
        
        const action = {
            type: types.login,
            payload: {
                name: 'Leandro',
            }
        }

        // const { logged, userInfo } = authReducer( initialState, action );
        
        // expect( logged ).toBeTruthy();
        // expect( userInfo ).toBe( action.payload );

        const newState = authReducer( initialState, action );
        
        expect( newState ).toEqual( {
            logged: true,
            userInfo: action.payload,
        })


    });

    test( 'Debe de borrar el nombre del usuario y logged en false', () => { 
        
        const userState = {
            logged: true,
            userInfo: { name: 'Chezna' }
        };

        const action = {
            type: types.logout,
        };

        const newState = authReducer( userState, action );

        expect( newState ).toEqual( { logged: false } );
        
    });
    
});