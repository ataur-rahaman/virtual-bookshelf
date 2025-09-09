import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);
    const location = useLocation();

    if(loading){
       return <>
            <LoadingSpinner></LoadingSpinner>
        </>
    }

    if(!user){
      return  <Navigate state={location.pathname} to={'/login'}></Navigate>
    }

    return children;
};

export default PrivateRoute;