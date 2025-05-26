import { displayedColumns, headerColumns } from '@/app/core/constants/columns';
import { Category } from '@/app/data/model/category';
import { CategoryService } from '@/app/data/services/category/category.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CreateCategoryComponent } from '../create/create.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewCategoryComponent implements OnInit {
  displayedColumns = displayedColumns.category;
  displayedHeader = headerColumns.category;
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryService: CategoryService, public dialog: MatDialog) {}

  loadData() {
    this.categoryService.getAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource<Category>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      minWidth: '900px',
      autoFocus: true,
      restoreFocus: false,
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe(() => this.loadData());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(id: string | number) {
    this.categoryService.delete(id as string).subscribe(() => this.loadData());
  }
}
