import { Injectable, resource } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataBundle } from '../models/bundle.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  readonly dataBundler = resource<DataBundle, unknown>({
    loader: async () => {
      const devices = await fetch(`${environment.apiUrl}/devices`).then((devices) =>
        devices.json()
      );
      const cycles = await fetch(`${environment.apiUrl}/cycles`).then((cycles) => cycles.json());
      const tariffs = await fetch(`${environment.apiUrl}/tariffs`).then((tariffs) =>
        tariffs.json()
      );

      return { devices, cycles, tariffs };
    },
  });
}
