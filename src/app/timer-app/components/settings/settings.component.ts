import { Component, OnInit, Renderer2 } from '@angular/core';

import { ThemeType } from './settings.enum';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  theme: string;
  color: string;
  themeType = ThemeType;

  constructor(
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('theme'));
    console.log(localStorage.getItem('color'));

    this.getSettings();
  }

  /**
   * Store theme value in local storage
   */
  changeTheme(type: string): void {
    // Remove actual theme class 
    this.renderer.removeClass(document.body, `theme-${this.theme}`);
    
    // Change theme type 
    this.theme = type;
    localStorage.setItem('theme', this.theme);
    this.renderer.addClass(document.body, `theme-${this.theme}`);
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
