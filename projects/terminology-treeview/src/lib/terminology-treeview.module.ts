import { NgModule } from '@angular/core';
import { TerminologyTreeviewComponent } from './terminology-treeview.component';
import { TerminologyTreeViewComponent } from './terminology-tree-view/terminology-tree-view.component';
import { DropdownModule } from '@orbis-u/components/dropdown';
import { BadgeModule } from '@orbis-u/components/badge';
import { InputModule } from '@orbis-u/components/input';
import { IconModule } from '@orbis-u/components/icons';
import { ButtonModule } from '@orbis-u/components/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkModule } from '@orbis-u/common/cdk';
import { AutomationIdModule } from '@orbis-u/common';
import { TerminologyTreeViewItemComponent } from './terminology-tree-view/terminology-tree-view-item/terminology-tree-view-item.component';
import {
  TerminologyDefaultTreeviewI18n,
  TerminologyTreeviewI18n,
} from './model/terminology-treeview-i18n';
import { TreeviewConfig } from './model/treeview-config';
import {
  DefaultTerminologyTreeviewEventParser,
  TerminologyTreeviewEventParser,
} from './helpers/terminology-treeview-event-parser';
import { TerminologyTreeFilterComponent } from './terminology-tree-filter/terminology-tree-filter.component';
import { NewSelectModule } from '@orbis-u/components/new-select';
import { CheckboxModule } from '@orbis-u/components/checkbox';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TerminologyTreeviewComponent,
    TerminologyTreeViewComponent,
    TerminologyTreeViewItemComponent,
    TerminologyTreeFilterComponent,
  ],
  imports: [
    AutomationIdModule,
    BadgeModule,
    ButtonModule,
    CommonModule,
    CdkModule,
    CheckboxModule,
    DropdownModule,
    FormsModule,
    InputModule,
    IconModule,
    NewSelectModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [
    TreeviewConfig,
    {
      provide: TerminologyTreeviewI18n,
      useClass: TerminologyDefaultTreeviewI18n,
    },
    {
      provide: TerminologyTreeviewEventParser,
      useClass: DefaultTerminologyTreeviewEventParser,
    },
  ],
  exports: [TerminologyTreeviewComponent],
})
export class TerminologyTreeviewModule {}
