import { useCallback, useEffect, useState } from "react"
import {
  cached,
  observableArgs,
  ObservableObject,
  reaction,
  Reactronic,
  standalone,
  Transaction,
  unobservable,
} from "reactronic"

export default function autorender(jsx: () => JSX.Element, deps: unknown[] = []): JSX.Element {
  const [state, refresh] = useState(createReactState)
  const { rx } = state
  rx.refresh = refresh
  useEffect(() => rx.unmount, [])
  return rx.render(useCallback(jsx, deps))
}

type ReactState = { rx: Rx }

class Rx extends ObservableObject {
  @unobservable
  public refresh: ((rx: ReactState) => void) | null = null
  @unobservable
  public unmount: () => void = () => standalone(Transaction.run, () => Reactronic.dispose(this))

  @cached
  @observableArgs(true)
  public render(jsx: () => JSX.Element): JSX.Element {
    return jsx()
  }

  @reaction
  private ensureUpToDate(): void {
    if (!Reactronic.getController(this.render).isUpToDate)
      standalone(() => this.refresh?.({ rx: this }))
  }
}

function createReactState(): ReactState {
  return { rx: Transaction.run(() => new Rx()) }
}
