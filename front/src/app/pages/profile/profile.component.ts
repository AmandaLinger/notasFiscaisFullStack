import { Component } from '@angular/core';
import { DxFormModule } from 'devextreme-angular/ui/form';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ],
  standalone: true,
  imports: [DxFormModule],
})

export class ProfileComponent {
  employee: any;
  colCountByScreen: object;

  constructor() {
    this.employee = {
      ID: '',
      Nome: '',
      senha: '',

      Picture: 'public/assets/images/user.png',
      Notes: 'Descrição aqui',
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }
}
