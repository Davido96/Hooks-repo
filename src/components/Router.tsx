import { ReactNode } from "react";
import { RouteType } from "../routes";

interface Route {
  path: RouteType;
  component: ReactNode;
}

interface RouterProps {
  currentRoute: RouteType;
  routes: Route[];
}

export const Router: React.FC<RouterProps> = ({ currentRoute, routes }) => {
  const currentRouteComponent = routes.find(
    (route) => route.path === currentRoute
  );

  if (!currentRouteComponent) {
    // Fallback to first route if current route is not found
    return <>{routes[0]?.component}</>;
  }

  return <>{currentRouteComponent.component}</>;
};

export default Router;
