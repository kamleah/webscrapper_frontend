import { AuthRouter } from "./AuthRouter";
import { DashboardRouter } from "./DashboardRouter";
import { PageNotFoundRouter } from "./PageNotFoundRouter";


export const routers = [
    ...AuthRouter,
    ...DashboardRouter,
    ...PageNotFoundRouter
]