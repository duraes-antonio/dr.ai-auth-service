import { HttpMethods } from './http-methods';
import { BaseController } from '../controllers/base.controller';

export interface HttpRouteInput {
    method: HttpMethods;
    url: string;
    handler: BaseController;
}
