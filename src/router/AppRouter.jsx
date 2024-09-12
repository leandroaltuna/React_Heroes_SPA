import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { HeroeRoutes } from '../heroes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {
    
    return (
        <>
            <Routes>

                <Route
                    path="login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                <Route 
                    path="/*" 
                    element={
                        <PrivateRoute>
                            <HeroeRoutes />
                        </PrivateRoute>
                    } 
                />

                {/* //* Otro modo de trabajar rutas por categorias como la Publica. */}
                {/* <Route path="login/*" element={
                        
                        <PublicRoute>
                            <Routes>
                                <Route path="/*" element={ <LoginPage /> } />
                                <Route path="/*" element={ <About /> } />
                                <Route path="/*" element={ <Public /> } />
                            </Routes>
                        </PublicRoute>

                    }
                /> */}


                {/* <Route path="login" element={ <LoginPage /> } /> */}
                {/* <Route path="/*" element={ <HeroeRoutes /> } /> */}

            </Routes>
        </>

    )

}
