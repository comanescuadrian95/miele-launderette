import { Cycle } from "./cycle.model";
import { Device } from "./device.model";
import { Tariff } from "./tariff.model";

export type DataBundle = {
    cycles: Cycle[];
    devices: Device[];
    tariffs: Tariff[];
}