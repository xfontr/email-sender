export const DEFAULT_ROUTE = "../data";

export const baseDefaultRoute = (route: string) => (name: string) =>
  Object.freeze({
    name,
    route: `${route}/${name}`,
  });

export const DefaultRoute = baseDefaultRoute(DEFAULT_ROUTE);
