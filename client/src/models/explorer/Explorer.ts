import { cached, transaction, Transaction, unobservable } from "reactronic"
import { ObservableObject } from "../../ObservableObject"
import { ExplorerReconciler } from "./ExplorerReconciler"
import { GroupNode } from "./GroupNode"
import { ItemNode } from "./ItemNode"
import { Node } from "./Node"

class ExplorerRootNode extends GroupNode {
  override get isOpened(): boolean { return true }

  constructor(children: readonly Node[]) {
    super("Explorer", "explorer", children)
  }

  @transaction
  updateExplorerRootNode(children: readonly Node[]): void { this.updateGroupNode(this.title, children) }
}

export class Explorer<T> extends ObservableObject {
  @unobservable readonly root: ExplorerRootNode
  @unobservable private readonly reconciler: ExplorerReconciler<this, T> = new ExplorerReconciler(this)
  private _selectedNode: ItemNode<T> | null = null

  @cached get children(): readonly Node[] { return this.root.children }
  @cached get selectedNode(): ItemNode<T> | null { return this._selectedNode }

  constructor(children: readonly Node[] = []) {
    super()
    this.root = new ExplorerRootNode(children)
    this.reconciler.reconcile()
  }

  @transaction
  updateExplorer(children: readonly Node[]): void {
    this.root.updateExplorerRootNode(children)
    this.reconciler.reconcile()
  }

  @transaction
  setSelectedNode(node: ItemNode<T> | null): void { this._selectedNode = node }

  override dispose(): void {
    Transaction.run(() => {
      this.reconciler.dispose()
      super.dispose()
    })
  }
}
