import { cached, transaction, unobservable } from "reactronic"
import { ObservableObject } from "../ObservableObject"

export class SidePanel extends ObservableObject {
  @unobservable readonly title: string
  private _opened = true

  @cached get opened(): boolean { return this._opened }

  constructor(title: string) {
    super()
    this.title = title
  }

  @transaction
  close(): void { this._opened = false }

  @transaction
  open(): void { this._opened = true }
}
