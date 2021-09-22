import { HttpRouteInput } from './http-router';

export interface Server {
    configureRoutes(routes: HttpRouteInput[]): void;

    listen(port: number | string): Promise<void>;
}
