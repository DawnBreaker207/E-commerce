import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { Gender } from '@/app/core/constants/type';
import { SelectComponent } from '../../../../../shared/components/select/select.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, SelectComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  @Input({ required: true }) form!: FormGroup;

  genderValue: Gender[] = ['Male', 'Female', 'Other'];

  gender = this.genderValue.map((g) => ({ label: g, value: g }));
}
