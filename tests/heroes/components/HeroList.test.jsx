import { render, screen } from '@testing-library/react';
import { getHeroesByPublisher } from '../../../src/heroes/helpers';
import { HeroList } from '../../../src/heroes/components/HeroList';
import { MemoryRouter } from 'react-router-dom';


jest.mock( '../../../src/heroes/helpers' );


describe( 'Pruebas en <HeroList />', () => { 
    
    const publisher = 'DC Comics';

    test( 'Debe de mostrar info de los Heroes', () => { 
        
        const DC = [
            {
                id: 'dc-batman',
                superhero: 'Batman',
                publisher: 'DC Comics',
                alter_ego: 'Bruce Wayne',
                first_appearance: 'Detective Comics #27',
                characters: 'Bruce Wayne'
            },
            {
                id: 'dc-superman',
                superhero: 'Superman',
                publisher: 'DC Comics',
                alter_ego: 'Kal-El',
                first_appearance: 'Action Comics #1',
                characters: 'Kal-El'
            },
            {
                id: 'dc-flash',
                superhero: 'Flash',
                publisher: 'DC Comics',
                alter_ego: 'Jay Garrick',
                first_appearance: 'Flash Comics #1',
                characters: 'Jay Garrick, Barry Allen, Wally West, Bart Allen'
            },
        ];


        getHeroesByPublisher.mockReturnValue( DC );

        render(
            <MemoryRouter>
                <HeroList publisher={ publisher } />
            </MemoryRouter>
        );

        // screen.debug();
        const heroImg = screen.getAllByRole( 'img' );

        expect( heroImg.length ).toBe( 3 );
        
    });

    test( 'Si no hay heroes no debe mostrar nada', () => { 
        
        getHeroesByPublisher.mockReturnValue( [] );

        const { container } = render(
            <MemoryRouter>
                <HeroList publisher={ publisher } />
            </MemoryRouter>
        );

        // screen.debug();
        expect( container ).toMatchSnapshot();
        
    });
    
});