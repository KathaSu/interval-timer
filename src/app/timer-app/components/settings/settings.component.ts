import { Component, OnInit } from '@angular/core';
import { ThemeType } from './settings.enum';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  theme: number;
  color: string;
  themeType = ThemeType;

  constructor() { }

  ngOnInit(): void {
    console.log(localStorage.getItem('theme'));
    console.log(localStorage.getItem('color'));

    this.getSettings();
  }

  /**
   * Store theme value in local storage
   */
  changeTheme(type: number): void {
    this.theme = type;
    localStorage.setItem('theme', this.theme.toString());
  }

  /**
   * Store highlight color in local storage
   */
  changeColor(): void {
    localStorage.setItem('color', this.color);
  }

  /**
   * Gets settings from local storage
   */
  private getSettings(): void {
    localStorage.getItem('theme');
    localStorage.getItem('color');
  }
}
