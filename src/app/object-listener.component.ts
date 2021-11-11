import {Directive, Input, OnChanges, SimpleChanges} from "@angular/core";

@Directive()
export abstract class ObjectListenerComponent<T> implements OnChanges {

  @Input() object: T | undefined | null;

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.object;
    if (change && change.currentValue !== undefined) {
      this.objectChanged(change.currentValue);
    }
  }

  abstract objectChanged(object: T | null): void;
}
