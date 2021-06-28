import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { houseDoorFill, NgxBootstrapIconsModule, phoneFill } from 'ngx-bootstrap-icons';
const icons = { houseDoorFill, phoneFill };

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, FooterComponent],
  imports: [
    CommonModule, RouterModule, FlexLayoutModule, NgxBootstrapIconsModule.pick(icons)
  ], exports: [HeaderComponent, SidebarComponent, FooterComponent]
})
export class SharedModule { }
