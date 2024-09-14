import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { HeroPage } from '../../../src/heroes/pages/HeroPage';
import { AuthContext } from '../../../src/auth/context';


const mockedUseNavigate = jest.fn();
const mockedUseParams = jest.fn();

const heroId = 'dc-flash';


jest.mock( 'react-router-dom', () => ({

    ...jest.requireActual( 'react-router-dom' ),
    useNavigate: () => mockedUseNavigate,
    useParams: () => mockedUseParams,
    // useParams: () => ({ heroId }),

}));


describe( 'Pruebas en <HeroPage />', () => { 
    
    beforeEach( () => jest.clearAllMocks() );

    test( 'Debe mostrar info del Hero obtenido por url', () => { 
    
        jest.spyOn( require('react-router-dom'), 'useParams').mockReturnValue({ heroId });

        const { container } = render(
            <MemoryRouter>
                <HeroPage />
            </MemoryRouter>
        );

        // screen.debug();
        expect( container ).toMatchSnapshot();
        
    });

    test( 'Debe mostrar la imagen del Hero obtenido por url', () => { 
        
        jest.spyOn( require('react-router-dom'), 'useParams').mockReturnValue({ heroId });

        render(
            <MemoryRouter>
                <HeroPage />
            </MemoryRouter>
        );

        const heroImg = screen.getByRole( 'img' );

        expect( heroImg.src ).toContain( `/heroes/${ heroId }.jpg` );

    });

    test( 'Debe de navegar a la pagina anterior cuando hace click en boton Back', () => { 

        jest.spyOn( require('react-router-dom'), 'useParams').mockReturnValue({ heroId });

        render(
            <MemoryRouter>
                <HeroPage />
            </MemoryRouter>
        );

        // screen.debug();
        const backBtn = screen.getByRole( 'button' );
        fireEvent.click( backBtn );

        expect( mockedUseNavigate ).toHaveBeenCalledWith( -1 );
        
    });

    test( 'Debe de navegar al /marvel si no es el heroId correcto', () => { 
        

        jest.spyOn( require('react-router-dom'), 'useParams').mockReturnValue({ heroId: 'marvel-captainxx' });

        render(

            <AuthContext.Provider value={{ logged: true }}>
                <MemoryRouter initialEntries={[ '/hero' ]}>
                    <Routes>

                        <Route path='hero' element={ <HeroPage /> } />
                        
                        <Route path='marvel' element={
                            <h1>Marvel Page</h1>
                        } />

                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>

        );

        expect( screen.getByText( 'Marvel Page' ) ).toBeTruthy(); 
        
    });
    
});