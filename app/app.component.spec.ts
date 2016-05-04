import {
  it,
  describe,
  expect,
  injectAsync
} from '@angular/core/testing';
import {
    TestComponentBuilder
} from '@angular/compiler/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {

  it('should be awesome', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.createAsync(AppComponent).then((fixture) => {
      fixture.detectChanges();
      expect(true).toEqual(true);
    });
  }));

  it('should fail', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.createAsync(AppComponent).then((fixture) => {
      fixture.detectChanges();
      expect(true).toEqual(false);
    });
  }));

});