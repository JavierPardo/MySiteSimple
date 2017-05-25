import { ApplicationStateFactory } from '../commonCore/applicationState';
import { ResourceHelper } from '../commonCore/helpers/resourceHelper';
import { RESTConnector } from '../commonCore/connectors/restConnector';
import { IoCInstanceType } from '../commonCore/models/ioc/enum';

import { EventManager } from "modules/commonCore/eventManager";

let iocRegistrations: any = [
    //{ name: "ILogger", instanceOf: ConsoleLogger, type: IoCInstanceType.Transient },
    { name: "IConnector", instanceOf: RESTConnector, type: IoCInstanceType.Singleton },
    { name: "IEventManager", instanceOf: EventManager, type: IoCInstanceType.Singleton },
    { name: "IResource", instanceOf: ResourceHelper, type: IoCInstanceType.Singleton },
    { name: "IApplicationState", instance: ApplicationStateFactory.getInstance(), type: IoCInstanceType.Singleton },

];
export default iocRegistrations;