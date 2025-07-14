import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Gender } from '@/app/core/constants/type';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { SelectComponent } from '@/app/shared/components/select/select.component';


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
