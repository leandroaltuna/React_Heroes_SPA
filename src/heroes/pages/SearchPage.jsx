import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from '../../hooks';
import { getHeroesByName } from '../helpers';
import { HeroItem } from '../components/HeroItem';


export const SearchPage = () => {
    
    //* Obtener la navegacion
    const navigate = useNavigate();
    //* Obtener informacion de donde nos encontramos
    const location = useLocation();

    //* Cambio el nombre de q a queryParam y lo asigno '' por defecto. query-string es una libreria para obtener los parametros que se envian por url.
    const { q : queryParam = '' } = queryString.parse( location.search );
    const heroes = getHeroesByName( queryParam );

    //* Las condiciones ya regresan un valor booleano, por ende no es necesario asignar el valor booleano en el codigo.
    const showSearchAlert = ( queryParam.length === 0 );
    const showErrorAlert = ( queryParam.length > 0 ) && heroes.length === 0;


    const { searchText, onInputChange } = useForm({
        // searchText: '',
        searchText: queryParam,
    });
    

    const onSearchSubmit = ( event ) => {
        
        event.preventDefault();

        // if ( searchText.trim().length <= 1 ) return;

        navigate( `?q=${ searchText }` );

    }
    
    
    return (
        <>
            <h1>Search</h1>
            <hr />

            <div className="row">

                <div className="col-5">
                    
                    <h4>Searching</h4>
                    <hr />

                    <form onSubmit={ onSearchSubmit }>
                        <input
                            className="form-control" 
                            type="text" 
                            name="searchText" 
                            placeholder="Search a hero"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ onInputChange }
                        />

                        <button className="btn btn-outline-primary mt-2">
                            Search
                        </button>
                    </form>

                </div>

                <div className="col-7">
                    
                    <h4>Results</h4>
                    <hr />

                    
                    {/* //* Si no busca nada se mostrara el search alert, caso contrario se oculta. */}
                    <div 
                        className="alert alert-primary animate__animated animate__fadeIn" 
                        style={{ display: (showSearchAlert) ? '' : 'none' }}
                    >
                        Search a hero
                    </div>
                   
                    {/* //* Si la busqueda no retorna ningun valor se mostrara el error alert, caso contrario se oculta. */}
                    <div 
                        className="alert alert-danger animate__animated animate__fadeIn" 
                        style={{ display: (showErrorAlert) ? '' : 'none' }}
                    >
                        No Hero with <b>{ queryParam }</b>
                    </div>

                    {
                        heroes.map( ( hero ) => (
                            <HeroItem 
                                key={ hero.id }
                                { ...hero }
                            />
                        ))
                    }

                </div>

            </div>
        </>
    )
}
