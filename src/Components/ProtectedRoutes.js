import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

export const ProtectedRouter = ({ children }) => {
  const { user, loading } = useAuth();
  console.log("estamos en el PROTECTED, ", user.currentUser);
  // console.log("estamos en el PROTECTED, ", user.currentUser.uid);

  if (loading) {
    return <h1>Loading</h1>;
  }

  // if (user === null) {
  if (!user.currentUser) {
    return <Navigate to="/" />;
  }

  // if (user.currentUser && user.user_rol === 'waiter') {
  //   return <Navigate to="/waiter"></Navigate>;
  // }

  return <>{children}</>;
};
