import { getHeroesByName } from '../../../src/heroes/helpers/getHeroesByName';


describe( 'Pruebas en getHeroesByName', () => { 
    
    test( 'Debe retornar un arreglo de heroes por el name', () => { 
        
        const nameValue = 'gre';

        const heroInfo = getHeroesByName( nameValue );

        expect( heroInfo.length ).toBeGreaterThanOrEqual( 1 );
        
    });

    test( 'Debe retornar un arreglo vacio sino encuentra match by the name', () => { 
    
        const nameValue = 'xxxwww';

        const heroInfo = getHeroesByName( nameValue );

        expect( heroInfo.length ).toBe( 0 );

    });
    
});