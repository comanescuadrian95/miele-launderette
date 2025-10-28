import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

class RouterStub {
  url = '/home';
  events = new Subject();
  navigate = jasmine.createSpy('navigate');
}

describe('Footer', () => {
  let fixture: ComponentFixture<Footer>;
  let component: Footer;
  let router: RouterStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Footer, MatToolbar, MatButton, MatIcon],
      providers: [{ provide: Router, useClass: RouterStub }],
    });
    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentUrl from router.url initially', () => {
    expect(component.currentUrl()).toBe('/home');
  });

  it('should update currentUrl on NavigationEnd', () => {
    router.url = '/cycles-list';
    router.events.next(new NavigationEnd(1, '/home', '/cycles-list'));
    fixture.detectChanges();

    expect(component.currentUrl()).toBe('/cycles-list');
  });

  it('should show back button for /cycles-list', () => {
    router.url = '/cycles-list';
    router.events.next(new NavigationEnd(1, '/home', '/cycles-list'));
    fixture.detectChanges();

    expect(component.showBackButton()).toBeTrue();
  });

  it('should not show back button for /home', () => {
    router.url = '/home';
    router.events.next(new NavigationEnd(1, '/cycles-list', '/home'));
    fixture.detectChanges();

    expect(component.showBackButton()).toBeFalse();
  });

  it('should show start cycle button except on /start-cycle', () => {
    router.url = '/start-cycle';
    router.events.next(new NavigationEnd(1, '/home', '/start-cycle'));
    fixture.detectChanges();

    expect(component.showStartCycleButton()).toBeFalse();

    router.url = '/home';
    router.events.next(new NavigationEnd(1, '/start-cycle', '/home'));
    fixture.detectChanges();

    expect(component.showStartCycleButton()).toBeTrue();
  });

  it('should show check cycles button except on /cycles-list', () => {
    router.url = '/cycles-list';
    router.events.next(new NavigationEnd(1, '/home', '/cycles-list'));
    fixture.detectChanges();

    expect(component.showCheckCyclesButton()).toBeFalse();

    router.url = '/home';
    router.events.next(new NavigationEnd(1, '/cycles-list', '/home'));
    fixture.detectChanges();

    expect(component.showCheckCyclesButton()).toBeTrue();
  });

  it('should navigate to /home onNavigateBack', () => {
    component.onNavigateBack();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to /start-cycle onStartCycle', () => {
    component.onStartCycle();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/start-cycle']);
  });

  it('should navigate to /cycles-list on checkCycles', () => {
    component.checkCycles();
    fixture.detectChanges();
    
    expect(router.navigate).toHaveBeenCalledWith(['/cycles-list']);
  });
});
