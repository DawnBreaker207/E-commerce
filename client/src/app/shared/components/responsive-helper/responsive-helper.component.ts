import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-responsive-helper',
  standalone: true,
  imports: [NgIf],
  templateUrl: './responsive-helper.component.html',
  styleUrl: './responsive-helper.component.css',
})
export class ResponsiveHelperComponent implements OnInit {
  public env: any = environment;
  ngOnInit(): void {}
  constructor() {}
}
