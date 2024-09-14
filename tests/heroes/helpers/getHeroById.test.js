import { getHeroById } from '../../../src/heroes/helpers/getHeroById';


describe( 'Prueba en getHeroById', () => { 
    
    test( 'Debe retornar el hero by id', () => { 
        
        const id = 'dc-superman';

        const heroInfo = getHeroById( id );

        expect( heroInfo ).toEqual({
            id: 'dc-superman',
            superhero: 'Superman',
            publisher: 'DC Comics',
            alter_ego: 'Kal-El',
            first_appearance: 'Action Comics #1',
            characters: 'Kal-El'
          });
        
    });

    test( 'Debe de retonar undefined si no existe el ID', () => { 
        
        const id = 'marvel-superman';

        const heroInfo = getHeroById( id );
        
        expect( heroInfo ).toBeFalsy();
        
    });
    
});