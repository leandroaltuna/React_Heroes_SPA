import { render, screen } from '@testing-library/react';
import { PublicRoute } from '../../src/router/PublicRoute';
import { AuthContext } from '../../src/auth';
import { MemoryRouter, Route, Routes } from 'react-router-dom';


describe( 'Pruebas en <PublicRoute />', () => { 
    
    test( 'Debe de mostrar el children si no esta autenticado', () => { 
        
        // const contextValue = { logged: false }

        // render(
        //     <AuthContext.Provider value={ contextValue }>
        //         <PublicRoute>
        //             <h1>Public Routes</h1>
        //         </PublicRoute>
        //     </AuthContext.Provider>
        // );

        // // screen.debug();
        // expect( screen.getByText( 'Public Routes' ) ).toBeTruthy();
        
    });

    test( 'Debe de navegar si esta autenticado', () => { 
        
        const contextValue = {
            logged: true,
            userInfo: {
                name: 'CheznaTest',
                id: 'ABC123',
            }
        };

        render(

            <AuthContext.Provider value={ contextValue }>
                
                {/* 
                    //* El MemoryRouter sirve para poder usar el Navigate que usa el componente. El initialEntries estableceria la ruta que estamos invocando que este caso seria el LoginPage ( path = 'login') en el <AppRouter />.
                 */}
                <MemoryRouter initialEntries={[ '/login' ]}>
                    
                    {/* 
                        //* Se configura como se usaria normalmente en desarrollo. Como aparece en el <AppRouter />
                    */}
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Public Routes</h1>
                            </PublicRoute>
                        } />
                        <Route path='marvel' element={
                            <h1>Marvel Page</h1>
                        } />
                    </Routes>

                </MemoryRouter>

            </AuthContext.Provider>
        );

        // screen.debug();
        expect( screen.getByText( 'Marvel Page' ) ).toBeTruthy();
        
    });
    
});