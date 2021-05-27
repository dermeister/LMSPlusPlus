import { cached, ObservableObject, transaction, unobservable } from "reactronic";

export abstract class ExplorerModel extends ObservableObject {
  @unobservable public abstract readonly roots: ExplorerNode[];
}

export abstract class ExplorerNode extends ObservableObject {
  @unobservable public readonly title: string;
  @unobservable public readonly key: string;

  public constructor(title: string, key: string) {
    super();
    this.title = title;
    this.key = key;
  }

  public abstract get isGroup(): boolean;

  @transaction
  public click(): void {}
}

export class ExplorerGroupNode extends ExplorerNode {
  private _isOpened = false;
  @unobservable public readonly children: ExplorerNode[];

  public constructor(title: string, key: string, children: ExplorerNode[]) {
    super(title, key);
    this.children = children;
  }

  @cached
  public get isOpened(): boolean {
    return this._isOpened;
  }

  public get isGroup(): boolean {
    return true;
  }

  @transaction
  public click(): void {
    this._isOpened = !this._isOpened;
  }
}

export class ExplorerItemNode extends ExplorerNode {
  public constructor(title: string, key: string) {
    super(title, key);
  }

  public get isGroup(): boolean {
    return false;
  }
}
