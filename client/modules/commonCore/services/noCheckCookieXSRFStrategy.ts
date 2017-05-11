import {  Request, CookieXSRFStrategy } from '@angular/http';

export class NoCheckCookieXSRFStrategy extends CookieXSRFStrategy {
  configureRequest(req: Request): void {
    // noop
  }
}