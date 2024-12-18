import { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getHeroById } from '../helpers';


export const HeroPage = () => {
    
    const { heroId } = useParams();
    const navigate = useNavigate();

    const hero = useMemo( () => getHeroById( heroId ), [ heroId ] );
    // console.log( hero );

    const onNavigateBack = () => {
        navigate( -1 );
    }

    if ( !hero ) {
        return <Navigate to={ '/marvel' } />
    }

    return (
        <>
            <div className="row mt-5">
                
                <div className="col-4 animate__animated animate__fadeInLeft">
                    <img 
                        className="img-thumbnail"
                        src={ `/heroes/${ hero.id }.jpg` } 
                        alt={ hero.superhero } 
                    />
                </div>

                <div className="col-8">

                    <h3>{ hero.superhero }</h3>

                    <ul className="list-group list-group-flash">

                        <li className="list-group-item">
                            <b>Alter Ego:</b> { hero.alter_ego }
                        </li>
                        <li className="list-group-item">
                            <b>Publisher:</b> { hero.publisher }
                        </li>
                        <li className="list-group-item">
                            <b>First Appearance:</b> { hero.first_appearance }
                        </li>

                    </ul>

                    <h5 className="mt-3">Characters:</h5>
                    <p>{ hero.characters }</p>

                    <button
                        className="btn btn-outline-primary"
                        onClick={ onNavigateBack }
                    >
                        Back
                    </button>

                </div>

            </div>
        </>
    )

}
