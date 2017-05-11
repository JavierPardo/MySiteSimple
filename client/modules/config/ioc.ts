import { IoCInstanceType } from '../commonCore/models/ioc/enum';

import { EventManager } from "modules/commonCore/eventManager";

let iocRegistrations: any = [
    { name: "IEventManager", instanceOf: EventManager, type: IoCInstanceType.Singleton },
];
export default iocRegistrations;