import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Directive({
  selector: '[appScrollTop]',
})
export class ScrollTopDirective implements OnInit {
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/public') {
        setTimeout(() => {
          this.renderer.setProperty(this.el.nativeElement, 'scrollTop', 0);
        }, 0);
      }
    });
  }
}
