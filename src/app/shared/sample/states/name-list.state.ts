import { Observable } from 'rxjs/Observable';

export interface ISampleState {
  names: string[];
}

export const initialState: ISampleState = {
  names: <string[]> []
};

export function getNames(state$: Observable<ISampleState>) {
  return state$.select((state) => state.names);
}
