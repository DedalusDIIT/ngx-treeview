import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminologyTreeFilterComponent } from './terminology-tree-filter.component';
import { OverlayService } from '@orbis-u/common/cdk';
import { TreeViewSelectHelperService } from '../services/tree-view-select-helper.service';
import { TranslateService } from '@ngx-translate/core';

xdescribe('NewTerminologyTreeFilterComponent', () => {
  let component: TerminologyTreeFilterComponent;
  let fixture: ComponentFixture<TerminologyTreeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminologyTreeFilterComponent],
      providers: [
        { provide: TranslateService, useValue: { instant: () => '' } },
        { provide: OverlayService, useValue: {} },
        { provide: TreeViewSelectHelperService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminologyTreeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
