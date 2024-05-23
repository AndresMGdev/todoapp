import { Component } from '@angular/core';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [],
  templateUrl: './theme.component.html',
})
export class ThemeComponent {
  theme: 'fantasy' | 'dark' = 'dark';

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'fantasy' : 'dark';
    document.querySelector('html')?.setAttribute('data-theme', this.theme);
  }
}
