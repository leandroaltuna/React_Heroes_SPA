import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth/context';
import { PrivateRoute } from '../../src/router/PrivateRoute';
import { MemoryRouter, Route, Routes } from 'react-router-dom';


describe( 'Prueba en <PrivateRoute />', () => { 
    
    test( 'Debe de mostrar el children si esta autenticado', () => { 
        
        //* Sobre escribe la funcion localstorage.setItem en el <PrivateRouse /> y nos sirve para que la funcion se ejecute.
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            userInfo: {
                name: 'Canserbero',
                id: '73ABC',
            }
        };

        render(

            <AuthContext.Provider value={ contextValue }>

                {/* <MemoryRouter initialEntries={[ '/search?q=batman' ]}> */}
                <MemoryRouter initialEntries={[ '/dc' ]}>
                    {/* 
                        //* No es necesario usar el <Routes /> porque no se esta navegando a otro componente.
                    */}
                    <PrivateRoute>
                        <h1>Private Routes</h1>
                    </PrivateRoute>
                        
                </MemoryRouter>
            </AuthContext.Provider>

        );

        // screen.debug();
        expect( screen.getByText( 'Private Routes' ) ).toBeTruthy();
        // expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', '/search?q=batman' );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', '/dc' );
        
    });

    test( 'Debe de navegar si NO esta autenticado', () => { 
        
        const contextValue = { logged: false };

        render(

            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={[ '/marvel' ]}>
                    <Routes>

                        <Route path="marvel" element={
                            <PrivateRoute>
                                <h2>Marvel Page</h2>
                            </PrivateRoute>
                        } />

                        <Route path="login" element={ <h1>Login Page</h1> } />

                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>

        );

        // screen.debug();
        expect( screen.getByText( 'Login Page' ) ).toBeTruthy();
        
    });
    
});