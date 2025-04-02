import { PrivateRoute } from '../../router/PrivateRoute';
import { Home } from '../Home';

export const PageRoutes = {
    path: "/home",
    element: (
        <PrivateRoute>
            <Home />
        </PrivateRoute>
    )
};
