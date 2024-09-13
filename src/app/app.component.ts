import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { HomepageComponent } from './homepage/homepage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDialogModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'disha';
  constructor( private dialog: MatDialog) {}

  openApp() {
    const dialogRef = this.dialog.open(HomepageComponent, {
      width: '28.125rem',
      maxWidth: '28.125rem',
      panelClass: 'custom-dialog-class',
      disableClose: true
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
