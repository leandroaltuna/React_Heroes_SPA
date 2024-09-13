import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';


const mockedUseNavigate = jest.fn();

jest.mock( 'react-router-dom', () => ({

    ...jest.requireActual( 'react-router-dom' ),
    useNavigate: () => mockedUseNavigate,

}));

describe( 'Pruebas en <SearchPage />', () => { 
    
    beforeEach( () => jest.clearAllMocks() );

    test( 'Debe de mostrarse correctamente con valores por defecto', () => { 
        
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        // screen.debug();
        expect( container ).toMatchSnapshot();

    });

    test( 'Debe de mostrar Batman y el input con el valor del queryString', () => { 
        
        render(
            <MemoryRouter initialEntries={[ '/search?q=batman' ]}>
                <SearchPage />
            </MemoryRouter>
        );

        // screen.debug();

        const inputSearch = screen.getByRole( 'textbox' );
        expect( inputSearch.value ).toBe( 'batman' );

        const imgResult = screen.getByRole( 'img' );
        expect( imgResult.src ).toContain( '/heroes/dc-batman.jpg' );

        const divAlertDanger = screen.getByLabelText( 'alertDanger' );
        expect( divAlertDanger.style.display ).toBe( 'none' );

    });

    test( 'Debe de mostrar un error si no se encuentra el hero (batman123)', () => { 
        
        render(
            <MemoryRouter initialEntries={[ '/search?q=batman123' ]}>
                <SearchPage />
            </MemoryRouter>
        );

        // screen.debug();

        const divAlertSearchHero = screen.getByLabelText( 'alertSearchHero' );
        expect( divAlertSearchHero.style.display ).toBe( 'none' );

        const divAlertDanger = screen.getByLabelText( 'alertDanger' );
        expect( divAlertDanger.style.display ).toBe( '' );
        // expect( divAlertDanger.style ).not.toBe( { display: "none" } );
        
    });

    test( 'Debe de llamar el navigate a la pantalla nueva', () => { 
        
        const inputValue = 'superman';

        render(
            <MemoryRouter initialEntries={[ '/search' ]}>
                <SearchPage />
            </MemoryRouter>
        );

        //? OJO: agregar un aria-label or name al form para obtener el form by role.
        const formSearch = screen.getByRole( 'form' );
        const formInput = screen.getByRole( 'textbox' );

        //? Se le asigna un el valor del superman al input 'searchText'
        fireEvent.change( formInput, { target: { name: 'searchText' , value: inputValue } } ); 
        
        //? La funcion que dispara el form no es necesario hacerle un mock ya que se disparara con el fireEvent. 
        fireEvent.submit( formSearch );

        expect( mockedUseNavigate ).toHaveBeenCalledWith( `?q=${ inputValue }` );
        
    });
    
});