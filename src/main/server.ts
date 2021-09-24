import { USER_ROUTES } from './infra/routes/user.routes';
import { getContainerDI } from './config/dependency-injection/inversify/containers/di-container';
import { Server } from './infra/http/server';
import { ADAPTERS_TYPES } from './config/dependency-injection/inversify/di-types';

const containerDI = getContainerDI();
const server = containerDI.get<Server>(ADAPTERS_TYPES.Server);
const port = process.env.PORT ?? 3000;
server.configureRoutes(USER_ROUTES);
server.listen(port).then();

export { server };
