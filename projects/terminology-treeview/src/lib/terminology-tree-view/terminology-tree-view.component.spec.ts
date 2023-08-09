import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminologyTreeViewComponent } from './terminology-tree-view.component';
import { TreeviewConfig } from '../model/treeview-config';
import { TerminologyTreeviewEventParser } from '../helpers/terminology-treeview-event-parser';
import { TerminologyTreeviewI18n } from '../model/terminology-treeview-i18n';
import { TreeViewSelectHelperService } from '../services/tree-view-select-helper.service';
import { of } from 'rxjs';

describe('TerminologyTreeViewComponent', () => {
  let component: TerminologyTreeViewComponent;
  let fixture: ComponentFixture<TerminologyTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminologyTreeViewComponent],
      providers: [
        { provide: TreeviewConfig, useValue: { defaultConfig: {} } },
        { provide: TerminologyTreeviewEventParser, useValue: {} },
        {
          provide: TerminologyTreeviewI18n,
          useValue: { getFilterNoItemsFoundText: () => '' },
        },
        {
          provide: TreeViewSelectHelperService,
          useValue: {
            getEdutrFilterTextChange: () => of({}),
            getEduTrBlur: () => of(false),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminologyTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
