import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-ide',
  imports: [],
  templateUrl: './ide.component.html',
  styleUrl: './ide.component.scss'
})
export class IdeComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer,   @Inject(PLATFORM_ID) private platformId: Object) {}

  fullCode = `function greet(name) {
  console.log("Hello, " + name + "!");
  }

greet("World");`;

  renderedCode: string = '';
  highlightedCode: SafeHtml = '';
  index: number = 0;
  interval: any;


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTyping();
    }
  }

  startTyping() {
    if (this.index !== 0) {
      this.renderedCode = '';
      this.index = 0;
    }

    this.interval = setInterval(() => {
      if (this.index < this.fullCode.length) {
        this.renderedCode += this.fullCode.charAt(this.index);
        this.index++;
        this.highlightedCode = this.highlight(this.renderedCode, true);
      } else {
        clearInterval(this.interval);
        setTimeout(() => {
          this.startErasing();
        }, 2000);
      }
    }, 30);
  }

  startErasing() {
    this.interval = setInterval(() => {
      if (this.index > 0) {
        this.renderedCode = this.renderedCode.slice(0, -1);
        this.index--;
        this.highlightedCode = this.highlight(this.renderedCode, true);
      } else {
        clearInterval(this.interval);
        setTimeout(() => {
          this.startTyping();
        }, 500);
      }
    }, 30);
  }

  highlight(code: string, withCursor: boolean = true): SafeHtml {
    // 1. Заменяем токены на маркеры
    let marked = code.replace(/\b(function|return|let|const|var)\b/g, `%%TOKEN_KEYWORD_START%%$1%%TOKEN_KEYWORD_END%%`)
      .replace(/\b(console)\b/g, `%%TOKEN_METHOD_START%%$1%%TOKEN_METHOD_END%%`)
      .replace(/(["'`])((?:(?!\1)[^\\]|\\.)*?)\1/g, `%%TOKEN_STRING_START%%$1$2$1%%TOKEN_STRING_END%%`)
      .replace(/\b(\w+)(?=\()/g, `%%TOKEN_FUNCTION_START%%$1%%TOKEN_FUNCTION_END%%`);

    // 2. Экранируем весь текст
    let escaped = marked.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 3. Восстанавливаем HTML для выделенных токенов
    escaped = escaped.replace(/%%TOKEN_KEYWORD_START%%(.*?)%%TOKEN_KEYWORD_END%%/g, `<span class="token-keyword">$1</span>`)
      .replace(/%%TOKEN_METHOD_START%%(.*?)%%TOKEN_METHOD_END%%/g, `<span class="token-method">$1</span>`)
      .replace(/%%TOKEN_STRING_START%%(.*?)%%TOKEN_STRING_END%%/g, `<span class="token-string">$1</span>`)
      .replace(/%%TOKEN_FUNCTION_START%%(.*?)%%TOKEN_FUNCTION_END%%/g, `<span class="token-function">$1</span>`);

    // Добавляем курсор при необходимости
    if (withCursor) {
      escaped += `<span class="cursor">█</span>`;
    }

    return this.sanitizer.bypassSecurityTrustHtml(escaped);
  }


}



