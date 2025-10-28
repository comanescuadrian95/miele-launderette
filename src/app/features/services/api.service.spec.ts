import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { Cycle } from '../models/cycle.model';

const mockCycle: Cycle = {
  startedAt: '2024-11-25T12:01:24.329Z',
  stoppedAt: '2024-11-25T13:01:24.329Z',
  status: 'in-progress',
  userId: 'alex',
  userAgent: 'test-agent',
  deviceId: '48565',
  id: '1',
  invoiceLines: [{ name: 'Washing cycle', totalPrice: 3.5, currency: 'EUR' }],
};

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post a cycle and return the result', () => {
    service.postCycle(mockCycle).subscribe((result) => {
      expect(result).toEqual(mockCycle);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/cycles`);

    expect(req.request.method).toBe('POST');

    req.flush(mockCycle);
  });

  it('should reload and provide bundled data', async () => {
    spyOn(window, 'fetch').and.callFake((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();
      const response = (data: any) =>
        Promise.resolve({
          json: () => Promise.resolve(data),
          ok: true,
          status: 200,
          headers: new Headers(),
          redirected: false,
          statusText: '',
          type: 'basic',
          url,
          clone: () => undefined,
          body: null,
          bodyUsed: false,
          arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
          blob: () => Promise.resolve(new Blob()),
          formData: () => Promise.resolve(new FormData()),
          text: () => Promise.resolve(''),
        } as unknown as Response);

      if (url.endsWith('/devices')) return response(['device1']);
      if (url.endsWith('/cycles')) return response(['cycle1']);
      if (url.endsWith('/tariffs')) return response(['tariff1']);

      return Promise.reject('Unknown URL');
    });

    service.dataBundler.reload();

    await new Promise((resolve) => {
      const check = () => {
        const value = service.dataBundler.value();

        if (value && value.devices && value.cycles && value.tariffs) {
          resolve(value);
        } else {
          setTimeout(check, 10);
        }
      };

      check();
    });

    const result: any = service.dataBundler.value();

    expect(result.devices).toEqual(['device1']);
    expect(result.cycles).toEqual(['cycle1']);
    expect(result.tariffs).toEqual(['tariff1']);
  });
});
