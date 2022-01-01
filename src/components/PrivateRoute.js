import { Navigate } from 'react-router-dom';
function PrivateRoute({ children, currentAccount }) {

    return currentAccount ? children : <Navigate to="/" />;
}

export default PrivateRoute
