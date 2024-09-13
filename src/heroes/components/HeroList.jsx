import { useMemo } from 'react';
import { getHeroesByPublisher } from '../helpers';
import { HeroItem } from './HeroItem';


export const HeroList = ({ publisher }) => {

    // console.log( publisher );
    const heroes = useMemo( () => getHeroesByPublisher( publisher ), [ publisher ] );

    return (
        
        <>
            <div className="row rows-cols-1 row-cols-md-3 g-3">
                {
                    heroes.map( hero => (

                        <HeroItem
                            key={ hero.id }
                            { ...hero }
                        />
                        // <li
                        //     key={ hero.id }
                        // >
                        //     { hero.superhero }
                        // </li>

                    ))
                }
            </div>
        </>

    )

}
