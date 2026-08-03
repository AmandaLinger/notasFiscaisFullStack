import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Nota Fiscal Front';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
