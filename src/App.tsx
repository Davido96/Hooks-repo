import { useState } from "react";
import Homepage from "./components/Homepage";
import CreatorSignup from "./components/CreatorSignup";
import ProfileSetup from "./components/ProfileSetup";
import CreatorProfileSetupProps from "./components/CreatorProfileSetup";
import { ChevronLeft } from "lucide-react";
import FanSignup from "./components/FanSignup";

function App() {
  const [currentPage, setCurrentPage] = useState("homepage");

  const renderPage = () => {
    switch (currentPage) {
      case "homepage":
        return <Homepage onNavigate={setCurrentPage} />;
      case "creator-signup":
        return <CreatorSignup onNavigate={setCurrentPage} />;
      case "creator-setup":
        return <CreatorProfileSetupProps onNavigate={setCurrentPage} />;
      case "fan-signup":
        return <FanSignup onNavigate={setCurrentPage} />;
      case "profile-setup":
        return <ProfileSetup onNavigate={setCurrentPage} />;
      default:
        return <Homepage onNavigate={setCurrentPage} />;
    }
  };

  const showBackButton = currentPage !== "homepage";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-pink-500 to-red-400">
      {showBackButton && (
        <div className="absolute top-4 left-4 z-10 md:top-6 md:left-6">
          <button
            onClick={() => setCurrentPage("homepage")}
            className="text-white hover:text-pink-100 transition-colors p-2"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
      )}
      {renderPage()}
    </div>
  );
}

export default App;
