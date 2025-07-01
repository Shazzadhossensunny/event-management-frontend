import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  logout,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import type { TUser } from "../../type/global.type";

type TProtected = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: TProtected) => {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const location = useLocation();

  let user;
  if (token) {
    user = verifyToken(token);
  }
  // Check if user is active
  if (user && !(user as TUser)) {
    dispatch(logout());
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};
