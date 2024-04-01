import { ProductionInstallation } from "./production-installation";

export interface CustomProductionInstallationResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: {productionInstallations?: ProductionInstallation[], productionInstallation?: ProductionInstallation};
}