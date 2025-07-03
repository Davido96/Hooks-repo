import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Homepage from "./components/Landingpage";
import AuthenticatedHomepage from "./components/AuthenticatedHomepage";
import CreatorSignup from "./components/CreatorSignup";
import ProfileSetup from "./components/ProfileSetup";
import CreatorProfileSetupProps from "./components/CreatorProfileSetup";
import FanSignup from "./components/FanSignup";
import Login from "./components/Login";
import { ChevronLeft } from "lucide-react";
import { ROUTES, RouteType } from "./routes";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<RouteType>(ROUTES.HOMEPAGE);
  const { isAuthenticated } = useAuth();

  const renderPage = () => {
    // If user is authenticated and trying to access homepage, show authenticated homepage
    if (isAuthenticated && currentPage === ROUTES.HOMEPAGE) {
      return <AuthenticatedHomepage onNavigate={setCurrentPage} />;
    }

    switch (currentPage) {
      case ROUTES.HOMEPAGE:
        return <Homepage onNavigate={setCurrentPage} />;
      case ROUTES.AUTHENTICATED_HOMEPAGE:
        return <AuthenticatedHomepage onNavigate={setCurrentPage} />;
      case ROUTES.LOGIN:
        return <Login onNavigate={setCurrentPage} />;
      case ROUTES.CREATOR_SIGNUP:
        return <CreatorSignup onNavigate={setCurrentPage} />;
      case ROUTES.CREATOR_SETUP:
        return <CreatorProfileSetupProps onNavigate={setCurrentPage} />;
      case ROUTES.FAN_SIGNUP:
        return <FanSignup onNavigate={setCurrentPage} />;
      case ROUTES.PROFILE_SETUP:
        return <ProfileSetup onNavigate={setCurrentPage} />;
      default:
        return <Homepage onNavigate={setCurrentPage} />;
    }
  };

  const showBackButton = currentPage !== ROUTES.HOMEPAGE && !isAuthenticated;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-pink-500 to-red-400">
      {showBackButton && (
        <div className="absolute top-4 left-4 z-10 md:top-6 md:left-6">
          <button
            onClick={() => setCurrentPage(ROUTES.HOMEPAGE)}
            className="text-white hover:text-pink-100 transition-colors p-2"
            aria-label="Go back to homepage"
            title="Go back to homepage"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
      )}
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
