import { TestBed } from '@angular/core/testing';
import {
  TerminologyTreeviewItem,
  TerminologyTreeviewSelection,
} from '../model/terminology-treeview-item';
import { TerminologyTreeviewModule } from 'terminology-treeview';
import { TerminologyTreeViewComponent } from '../terminology-tree-view/terminology-tree-view.component';

import {
  DefaultTerminologyTreeviewEventParser,
  DownlineTreeviewEventParser,
  TerminologyOrderDownlineTreeviewEventParser,
  TerminologyTreeviewEventParser,
} from './terminology-treeview-event-parser';
import { I18NewModule, I18NewOptions } from '@orbis-u/i18n';
import { HttpClientModule } from '@angular/common/http';
import { TreeViewSelectHelperService } from '../services/tree-view-select-helper.service';
import { of } from 'rxjs';

const selectionWithUndefinedCheckedItems: TerminologyTreeviewSelection = {
  checkedItems: undefined,
  uncheckedItems: undefined,
};

const selectionWithNullCheckedItems: TerminologyTreeviewSelection = {
  checkedItems: null,
  uncheckedItems: undefined,
};

describe('DefaultTreeviewEventParser', () => {
  let parser: TerminologyTreeviewEventParser;
  let fakeComponent: TerminologyTreeViewComponent;
  const fakeOptions: I18NewOptions = {
    defaults: { locale: 'de_DE' },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TerminologyTreeviewModule,
        I18NewModule.forRoot(fakeOptions),
        HttpClientModule,
      ],
      providers: [
        {
          provide: TerminologyTreeviewEventParser,
          useClass: DefaultTerminologyTreeviewEventParser,
        },
        {
          provide: TreeViewSelectHelperService,
          useValue: { getEdutrFilterTextChange: () => of({}) },
        },
      ],
    });
    parser = TestBed.inject(TerminologyTreeviewEventParser);
    fakeComponent = TestBed.createComponent(
      TerminologyTreeViewComponent
    ).componentInstance;
  });

  it('should return empty list if checkedItems is null or undefined', () => {
    fakeComponent.items = undefined;
    fakeComponent.selection = selectionWithUndefinedCheckedItems;
    let result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual([]);

    fakeComponent.items = undefined;
    fakeComponent.selection = selectionWithNullCheckedItems;
    result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual([]);
  });

  it('should return list of value of checked items', () => {
    fakeComponent.items = undefined;
    fakeComponent.selection = {
      checkedItems: [
        new TerminologyTreeviewItem({
          id: 'RID34257',
          meaning: 'fein-pleomorphe Verkalkung',
        }),
        new TerminologyTreeviewItem({
          id: 'RID34255',
          meaning: 'fein-lineare Verkalkung',
        }),
      ],
      uncheckedItems: undefined,
    };

    const result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual(['RID34257', 'RID34255']);
  });
});

describe('DownlineTreeviewEventParser', () => {
  let parser: TerminologyTreeviewEventParser;
  let fakeComponent: TerminologyTreeViewComponent;
  const fakeOptions: I18NewOptions = {
    defaults: { locale: 'de_DE' },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TerminologyTreeviewModule,
        I18NewModule.forRoot(fakeOptions),
        HttpClientModule,
      ],
      providers: [
        {
          provide: TerminologyTreeviewEventParser,
          useClass: TerminologyOrderDownlineTreeviewEventParser,
        },
        {
          provide: TreeViewSelectHelperService,
          useValue: { getEdutrFilterTextChange: () => of({}) },
        },
      ],
    });
    parser = TestBed.inject(TerminologyTreeviewEventParser);
    fakeComponent = TestBed.createComponent(
      TerminologyTreeViewComponent
    ).componentInstance;
  });

  it('should return empty list if items is null or undefined', () => {
    fakeComponent.items = undefined;
    fakeComponent.selection = selectionWithUndefinedCheckedItems;
    let result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual([]);

    fakeComponent.items = null;
    fakeComponent.selection = selectionWithUndefinedCheckedItems;
    result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual([]);
  });

  it('should return list of checked items with links', () => {
    const item1 = new TerminologyTreeviewItem({
      id: 'RID34257',
      meaning: 'fein-pleomorphe Verkalkung',
      checked: false,
    });
    const item1Child1 = new TerminologyTreeviewItem({
      id: 'RID39094',
      meaning: 'Kopfschmerzen',
      checked: true,
    });
    const item1Child2 = new TerminologyTreeviewItem({
      id: 'RID39083',
      meaning: 'Fieber',
      checked: false,
      children: [{ id: 'RID39083', meaning: 'Fieber', checked: false }],
    });
    item1.children = [item1Child1, item1Child2];
    const item2 = new TerminologyTreeviewItem({
      id: 'RID39082',
      meaning: 'Diarrhö',
      checked: true,
    });
    const item3 = new TerminologyTreeviewItem({
      id: 'RID39219',
      meaning: 'Schwindel',
      checked: false,
    });
    fakeComponent.items = [item1, item2, item3];
    fakeComponent.selection = selectionWithUndefinedCheckedItems;
    const result = parser.getSelectedChange(fakeComponent);
    const expected = [
      {
        item: item1Child1,
        parent: {
          item: item1,
          parent: null,
        },
      },
      {
        item: item2,
        parent: null,
      },
    ];
    expect(result).toEqual(expected);
  });
});

describe('OrderDownlineTreeviewEventParser', () => {
  let parser: TerminologyTreeviewEventParser;
  let fakeComponent: TerminologyTreeViewComponent;
  const fakeOptions: I18NewOptions = {
    defaults: { locale: 'de_DE' },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TerminologyTreeviewModule,
        I18NewModule.forRoot(fakeOptions),
        HttpClientModule,
      ],
      providers: [
        {
          provide: TerminologyTreeviewEventParser,
          useClass: TerminologyOrderDownlineTreeviewEventParser,
        },
        {
          provide: TreeViewSelectHelperService,
          useValue: { getEdutrFilterTextChange: () => of({}) },
        },
      ],
    });
    parser = TestBed.inject(TerminologyTreeviewEventParser);
    fakeComponent = TestBed.createComponent(
      TerminologyTreeViewComponent
    ).componentInstance;
  });

  it('should return empty list if items is null or undefined', () => {
    fakeComponent.items = undefined;
    fakeComponent.selection = selectionWithUndefinedCheckedItems;
    let result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual([]);

    fakeComponent.items = null;
    fakeComponent.selection = selectionWithUndefinedCheckedItems;
    result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual([]);
  });

  describe('', () => {
    const item1 = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
      checked: false,
    });
    const item1Child1 = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
      checked: true,
    });
    const item1Child2 = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
      checked: false,
      children: [
        { id: 'RID34255', meaning: 'fein-lineare Verkalkung', checked: false },
      ],
    });
    item1.children = [item1Child1, item1Child2];
    const item2 = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
      checked: false,
    });
    const item3 = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
      checked: true,
    });

    beforeEach(() => {
      fakeComponent.items = [item1, item2, item3];
      fakeComponent.selection = selectionWithUndefinedCheckedItems;
    });

    it('should return list of checked items with links', () => {
      const result = parser.getSelectedChange(fakeComponent);
      const expected = [
        {
          item: item1Child1,
          parent: {
            item: item1,
            parent: null,
          },
        },
        {
          item: item3,
          parent: null,
        },
      ];
      expect(result).toEqual(expected);
    });

    it('should return list of checked items with links by order', () => {
      parser.getSelectedChange(fakeComponent);
      item1Child1.checked = false;
      item2.checked = true;
      const result = parser.getSelectedChange(fakeComponent);
      const expected = [
        {
          item: item3,
          parent: null,
        },
        {
          item: item2,
          parent: null,
        },
      ];
      expect(result).toEqual(expected);
    });
  });
});
