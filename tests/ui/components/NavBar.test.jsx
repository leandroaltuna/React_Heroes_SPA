import { fireEvent, render, screen } from '@testing-library/react';
import { AuthContext } from '../../../src/auth/context';
import { Navbar } from '../../../src/ui/components/NavBar';
import { MemoryRouter, useNavigate } from 'react-router-dom';


const mockedUseNavigate = jest.fn();

//? Hacemos un mock del hook react-router-dom que esta ubicado en el 'react-router-dom'. Luego hacemos el callback que retorna un objeto.
jest.mock( 'react-router-dom', () => ({

    //? Desestructuramos el hook react-router-dom para solo sobreescribir los metodos que necesitamos. Asi conserva los metodos originales como MemoryRouter, useLocation, etc.
    ...jest.requireActual( 'react-router-dom' ),

    //? Sobreescribimos el metodo useNavigate con una mocked function de jest.
    useNavigate: () => mockedUseNavigate,

}));


describe( 'Pruebas en <NavBar />', () => { 
    
    const contextValue = {
        logged: true,
        userInfo: {
            name: 'Canserbero',
            id: '135WZX',
        },
        logout: jest.fn(),
    };

    beforeEach( () => jest.clearAllMocks() );

    test( 'Debe de mostrar el nombre del usuario', () => { 
        
        render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();
        expect( screen.getByText( contextValue.userInfo.name ) ).toBeTruthy();
        
    });

    test( 'Debe de llamar el logout y navigate cuando se llama el boton', () => { 
        
        render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();
        const btnLogout = screen.getByText( 'Logout' );
        fireEvent.click( btnLogout );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith( '/login', { "replace" : true } );

    });
    
});