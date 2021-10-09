import { HttpRouteInput } from './http.models';
import { BaseController } from '../controllers/base.controller';

export interface Server {
    configureRoutes(routes: HttpRouteInput<BaseController>[]): void;

    listen(port: number | string): Promise<void>;
}
