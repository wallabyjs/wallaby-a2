import {
  it,
  iit,
  describe,
  ddescribe,
  expect,
  inject,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';
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