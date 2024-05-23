import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ThemeComponent } from './components/theme/theme.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ThemeComponent,
    TodoAddComponent,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'todoapp';
  currentLang: string;

  private translateService = inject(TranslateService);

  setLanguage(lang: string) {
    this.translateService.use(lang);
    this.currentLang = lang;
  }

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.currentLang = this.translate.currentLang || 'es'
  }

  ngOnInit() {
    this.translate.use('es'); // o 'es', dependiendo del idioma por defecto
  }
}
