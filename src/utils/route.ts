import queryString from "query-string";

interface IObtainDynamicRouteOption {
  queryObject?: object;
}

interface IObtainDynamicRouteOption {
  queryObject?: object;
}

export const obtainDynamicRoute = (
  dynamicRoute: string,
  params: any,
  options?: IObtainDynamicRouteOption,
) => {
  let route = dynamicRoute;
  Object.keys(params).forEach((key) => {
    const regex = new RegExp(`:${key}`, "gi");
    route = route.replace(regex, params[key]);
  });

  if (options && options.queryObject)
    route += `?${queryString.stringify(options.queryObject)}`;
  return route;
};

export const r = obtainDynamicRoute;
