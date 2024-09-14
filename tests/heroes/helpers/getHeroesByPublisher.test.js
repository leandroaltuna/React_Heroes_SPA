import { getHeroesByPublisher } from '../../../src/heroes/helpers/getHeroesByPublisher';


describe( 'Pruebas en getHeroesByPublisher', () => { 
    
    test( 'Debe retornar un arreglo de Heores by Publisher', () => { 
        
        const publisher = 'DC Comics';

        const heroes = getHeroesByPublisher( publisher );
        // console.log( heroes );
        expect( heroes.length ).toBeGreaterThanOrEqual( 1 );
        
    });

    test( 'Debe retornar un Throw Error si no existe el Publisher', () => { 
        
        const publisher = 'Disney';

        expect(  () => { getHeroesByPublisher( publisher ) } ).toThrow( new Error( `${ publisher } is not a valid publisher` ) );
        //? Si la funcion no necesita un param.
        // expect( getHeroesByPublisher ).toThrow( new Error( `${ publisher } is not a valid publisher` ) );
        
    });
    
});