import { ApplicationState } from '../applicationState';
import { RESTConnector } from '../commonCore/connectors/restConnector';
import { IoCInstanceType } from '../commonCore/models/ioc/enum';

import { EventManager } from "modules/commonCore/eventManager";

let iocRegistrations: any = [
    { name: "IEventManager", instanceOf: EventManager, type: IoCInstanceType.Singleton },
    { name: "IConnector", instanceOf: RESTConnector, type: IoCInstanceType.Singleton },
    { name: "IApplicationState", instanceOf: ApplicationState, type: IoCInstanceType.Singleton },
];
export default iocRegistrations;