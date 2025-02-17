import { TreeviewConfig } from './treeview-config';

describe('TreeviewConfig', () => {
  it('should have sensible default values', () => {
    const config = new TreeviewConfig();
    expect(config.hasAllCheckBox).toBe(false);
    expect(config.hasCollapseExpand).toBe(false);
    expect(config.maxHeight).toBe(500);
    expect(config.decoupleChildFromParent).toBe(false);
  });
});
