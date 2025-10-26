import { Cycle } from "./cycle.model";
import { Device } from "./device.model";
import { Tariff } from "./tariff.mode";

export type DataBundle = {
    cycles: Cycle[];
    devices: Device[];
    tariffs: Tariff[];
}

export const EMPTY: DataBundle = {
    cycles: [],
    devices: [],
    tariffs: []
};