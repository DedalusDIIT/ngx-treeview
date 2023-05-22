import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminologyTreeViewItemComponent } from './terminology-tree-view-item.component';
import { TreeviewConfig } from '../../model/treeview-config';
import { TreeViewSelectHelperService } from '../../services/tree-view-select-helper.service';

describe('TerminologyTreeViewItemComponent', () => {
  let component: TerminologyTreeViewItemComponent;
  let fixture: ComponentFixture<TerminologyTreeViewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminologyTreeViewItemComponent],
      providers: [
        { provide: TreeviewConfig, useValue: { defaultConfig: {} } },
        { provide: TreeViewSelectHelperService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminologyTreeViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
