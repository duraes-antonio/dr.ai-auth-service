import { USER_ROUTES } from './infra/routes/user.routes';
import { getContainerDI } from './config/dependency-injection/inversify/containers/di-container';
import { Server } from './infra/http/server';
import { ADAPTERS_TYPES } from './config/dependency-injection/inversify/di-types';

const containerDI = getContainerDI();
const server = containerDI.get<Server>(ADAPTERS_TYPES.Server);
server.configureRoutes(USER_ROUTES);

export { server };
