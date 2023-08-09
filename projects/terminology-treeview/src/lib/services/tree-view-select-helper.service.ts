import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TreeViewFilterTextChange } from '../model/tree-view-filter-text-change';

@Injectable()
export class TreeViewSelectHelperService {
  private _edutrFilterTextChange = new Subject<TreeViewFilterTextChange>();
  private _eduTrMenuBlur = new Subject<boolean>();
  constructor() {}

  getEdutrFilterTextChange(): Observable<TreeViewFilterTextChange> {
    return this._edutrFilterTextChange.asObservable();
  }

  updateEdutrFilterTextChange(value: TreeViewFilterTextChange) {
    this._edutrFilterTextChange.next(value);
  }

  updateEduTrBlur(value: boolean): void {
    this._eduTrMenuBlur.next(value);
  }

  getEduTrBlur(): Observable<boolean> {
    return this._eduTrMenuBlur.asObservable();
  }
}
