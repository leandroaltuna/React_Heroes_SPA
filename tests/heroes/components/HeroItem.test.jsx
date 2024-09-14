import { render, screen } from '@testing-library/react';
import { HeroItem } from '../../../src/heroes/components/HeroItem';
import { MemoryRouter } from 'react-router-dom';


describe( 'Testing <HeroItem />', () => { 

    test( 'Debe de mostrar Hero', () => { 
        
        const heroInfo = {
            'id': 'dc-batman',
            'superhero':'Batman', 
            'publisher':'DC Comics', 
            'alter_ego':'Bruce Wayne',
            'first_appearance':'Detective Comics #27',
            'characters':'Bruce Wayne'
        };

        const { container } = render(
            <MemoryRouter>
                <HeroItem { ...heroInfo } />
            </MemoryRouter>
        );
        // screen.debug();

        expect( container ).toMatchSnapshot();

        const heroImg = screen.getByRole( 'img' );
        expect( heroImg.src ).toContain( `/heroes/${ heroInfo.id }.jpg` );

        //? OJO, necesita un arial-label or name para que funcione.
        const moreLink = screen.getByRole( 'link' );
        expect( moreLink.href ).toContain( `/hero/${ heroInfo.id }` );
        
    });
    
});