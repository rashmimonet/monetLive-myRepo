import {ChangeDetectorRef, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appStyle]'
})
export class StyleDirective implements OnChanges{

  @Input() condition: any;

  constructor(private eleRef: ElementRef, private renderer: Renderer2, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.setStyle(this.condition);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.condition.previousValue !== undefined) {
      this.setStyle(changes.condition.currentValue);
    }
  }

  setStyle(cardNumber: number): any {
    // console.log('Card Number (from Directive) :', cardNumber);
    this.renderer.addClass(this.eleRef.nativeElement, cardNumber < 3 ? `cardLength${cardNumber}` : 'cardLengthOther');
  }

}
