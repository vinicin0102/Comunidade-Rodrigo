import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireDiamond?: boolean;
}

export const ProtectedRoute = ({ children, requireDiamond = false }: ProtectedRouteProps) => {
  const { user, loading, isDiamond } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
        return;
      }

      if (requireDiamond && !isDiamond) {
        navigate("/");
        return;
      }
    }
  }, [user, loading, isDiamond, requireDiamond, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requireDiamond && !isDiamond) {
    return null;
  }

  return <>{children}</>;
};

