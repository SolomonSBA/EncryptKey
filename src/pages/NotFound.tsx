import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Shield, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-encrypt-dark">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-encrypt-blue/5 via-transparent to-encrypt-magenta/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-encrypt-blue/10 to-encrypt-magenta/10 rounded-full blur-3xl opacity-50" />
      
      <div className="relative text-center p-8 lg:p-12 max-w-lg mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-encrypt-blue to-encrypt-magenta flex items-center justify-center">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Encrypt<span className="text-encrypt-magenta">Key</span>
          </span>
        </div>
        
        {/* 404 */}
        <h1 className="text-8xl lg:text-9xl font-bold bg-gradient-to-r from-encrypt-blue to-encrypt-magenta bg-clip-text text-transparent mb-4">
          404
        </h1>
        
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
          Page not found
        </h2>
        
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            className="w-full sm:w-auto bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white"
            asChild
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Link>
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
