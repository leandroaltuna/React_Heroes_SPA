import { types } from "../../../src/auth/types/types";


describe( 'Prueba en "Types.js"', () => { 
    
    test( 'Debe de regresar types', () => { 
        
        expect( types ).toEqual({
            login: '[Auth Login]',
            // logout: '[Auth Logout]',
            logout: expect.any( String ),
        });
        
    });
    
});