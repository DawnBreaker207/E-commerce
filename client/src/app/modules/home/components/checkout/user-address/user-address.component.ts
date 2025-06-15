import { InputComponent } from '@/app/shared/components/input/input.component';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-address',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './user-address.component.html',
  styleUrl: './user-address.component.css',
})
export class UserAddressComponent {
  @Input({ required: true }) form!: FormGroup;
}
