import { cloneDeep } from 'lodash';
import { TerminologyTreeviewItem } from '../model/terminology-treeview-item';
import { TerminologyTreeviewHelper } from './terminology-treeview-helper';

const rootNoChildren = new TerminologyTreeviewItem({
  id: 'RID36008',
  meaning: 'gutartiger Befund',
});
const rootHasChildren = new TerminologyTreeviewItem({
  id: 'RID36008',
  meaning: 'gutartiger Befund',
  checked: false,
  children: [
    {
      id: 'RID4941',
      meaning: 'Schwangerschaft',
      checked: true,
    },
    {
      id: 'RID39555',
      meaning: 'zusätzliche Schwangerschaft',
      checked: false,
      children: [
        {
          id: 'RID39554',
          meaning: 'Zwillingsschwangerschaft',
          checked: false,
        },
      ],
    },
  ],
});
const fakeItem = new TerminologyTreeviewItem({
  id: 'RID36008',
  meaning: 'gutartiger Befund',
});

describe('findItem', () => {
  it('should not find item if root is null or undefined', () => {
    expect(
      TerminologyTreeviewHelper.findTerminologyItem(undefined, 'RID36008')
    ).toBeUndefined();
    expect(
      TerminologyTreeviewHelper.findTerminologyItem(null, 'RID36008')
    ).toBeUndefined();
  });

  it('should find item', () => {
    expect(
      TerminologyTreeviewHelper.findTerminologyItem(rootNoChildren, 'RID36008')
    ).toEqual(rootNoChildren);
    expect(
      TerminologyTreeviewHelper.findTerminologyItem(rootHasChildren, 'RID4941')
    ).toEqual(rootHasChildren.children[0]);
  });

  it('should not find item', () => {
    expect(
      TerminologyTreeviewHelper.findTerminologyItem(rootNoChildren, 'RID4941')
    ).toBeUndefined();
    expect(
      TerminologyTreeviewHelper.findTerminologyItem(rootHasChildren, 'RID4942')
    ).toBeUndefined();
  });
});

describe('findItemInList', () => {
  it('should not find item if list is null or undefined', () => {
    expect(
      TerminologyTreeviewHelper.findTerminologyItemInList(undefined, 'RID36008')
    ).toBeUndefined();
    expect(
      TerminologyTreeviewHelper.findTerminologyItemInList(null, 'RID36008')
    ).toBeUndefined();
  });

  it('should find item', () => {
    const list = [rootNoChildren, rootHasChildren];
    expect(
      TerminologyTreeviewHelper.findTerminologyItemInList(list, 'RID4941')
    ).toEqual(rootHasChildren.children[0]);
  });

  it('should not find item', () => {
    const list = [rootNoChildren, rootHasChildren];
    expect(
      TerminologyTreeviewHelper.findTerminologyItemInList(list, 0)
    ).toBeUndefined();
  });
});

describe('findParent', () => {
  it('should not find parent if root is undefined or root has no children', () => {
    expect(
      TerminologyTreeviewHelper.findTerminologyParent(undefined, fakeItem)
    ).toBeUndefined();
    expect(
      TerminologyTreeviewHelper.findTerminologyParent(rootNoChildren, fakeItem)
    ).toBeUndefined();
  });

  it('should not find parent', () => {
    expect(
      TerminologyTreeviewHelper.findTerminologyParent(rootHasChildren, fakeItem)
    ).toBeUndefined();
  });

  it('should find parent', () => {
    let parent = rootHasChildren;
    let item = rootHasChildren.children[0];
    expect(
      TerminologyTreeviewHelper.findTerminologyParent(rootHasChildren, item)
    ).toBe(parent);

    parent = rootHasChildren.children[1];
    item = rootHasChildren.children[1].children[0];
    expect(
      TerminologyTreeviewHelper.findTerminologyParent(rootHasChildren, item)
    ).toBe(parent);
  });
});

describe('removeParent', () => {
  it('should not remove item if root is undefined or root has no children', () => {
    expect(
      TerminologyTreeviewHelper.removeTerminologyItem(undefined, fakeItem)
    ).toBeFalsy();
    expect(
      TerminologyTreeviewHelper.removeTerminologyItem(rootNoChildren, fakeItem)
    ).toBeFalsy();
  });

  it('should not remove item', () => {
    expect(
      TerminologyTreeviewHelper.removeTerminologyItem(rootHasChildren, fakeItem)
    ).toBeFalsy();
  });

  it('should remove item & has correct checked', () => {
    const root = cloneDeep(rootHasChildren);
    const parent = root;
    let item = root.children[1];
    expect(parent.children.length).toBe(2);
    expect(parent.checked).toBe(undefined);
    expect(TerminologyTreeviewHelper.removeTerminologyItem(parent, item)).toBe(
      true
    );
    expect(parent.children.length).toBe(1);
    expect(parent.checked).toBe(true);

    item = root.children[0];
    expect(TerminologyTreeviewHelper.removeTerminologyItem(parent, item)).toBe(
      true
    );
    expect(parent.children).toBeUndefined();
  });
});
