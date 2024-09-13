import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';


describe( 'Pruebas en el <AppRouter />', () => { 
    
    test( 'Debe de mostrar el LoginPage si NO esta autenticado', () => { 
        
        const contextValue = { logged: false };

        render(
            <MemoryRouter initialEntries={[ '/marvel' ]}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();
        expect( screen.getAllByText( 'Login' ).length ).toBe( 1 );
        
    });

    test( 'Debe de mostrar el componente Marvel SI esta autenticado', () => { 
        
        const contextValue = { 
            logged: true,
            userInfo: {
                name: 'Rapper School',
                id: '123',
            }
        };

        render(
            
            <MemoryRouter initialEntries={[ '/login' ]}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>

        );

        // screen.debug();
        // expect( screen.getAllByText( 'more...' ).length ).toBeGreaterThanOrEqual( 1 );
        expect( screen.getAllByText( 'Marvel' ).length ).toBeGreaterThanOrEqual( 1 );
        
    });
    
});