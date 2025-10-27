import { inject, Injectable, resource } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataBundle } from '../models/bundle.model';
import { Cycle } from '../models/cycle.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private _http = inject(HttpClient);

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

  postCycle(cycle: Cycle): Observable<Cycle> {
    return this._http.post<Cycle>(`${environment.apiUrl}/cycles`, cycle);
  }
}
