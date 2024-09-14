import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth/context';
import { LoginPage } from '../../../src/auth/pages/LoginPage';


const mockedUseNavigate = jest.fn();

jest.mock( 'react-router-dom', () => ({

    ...jest.requireActual( 'react-router-dom' ),
    useNavigate: () => mockedUseNavigate,

}));

describe( 'Testing <LoginPage />', () => { 
    
    beforeEach( () => jest.clearAllMocks() );

    test( 'Should show default values', () => { 
        
        const contextValue = { logged: false };

        const { container } = render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <LoginPage />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();
        
    });

    test( 'Should call onLogin method with login, navigate and localstorage functions', () => { 
        
        const contextValue = { 
            logged: false,
            login: jest.fn(),
        };

        Storage.prototype.getItem = jest.fn();

        render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <LoginPage />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();

        const btnLogin = screen.getByRole( 'button' );
        fireEvent.click( btnLogin );

        expect( contextValue.login ).toHaveBeenCalled();
        expect( contextValue.login ).toHaveBeenCalledWith( 'Chezna' );
        
        expect( mockedUseNavigate ).toHaveBeenCalledWith( '/', { "replace": true } );
        
        expect( localStorage.getItem ).toHaveBeenCalledWith( 'lastPath' );
        
    });

    
});