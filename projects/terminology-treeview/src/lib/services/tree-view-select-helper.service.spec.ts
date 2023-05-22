import { TestBed } from '@angular/core/testing';
import { TreeViewSelectHelperService } from './tree-view-select-helper.service';

describe('TreeViewSelectHelperService', () => {
  let service: TreeViewSelectHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TreeViewSelectHelperService, useValue: {} }],
    });
    service = TestBed.inject(TreeViewSelectHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
