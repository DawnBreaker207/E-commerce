import { displayedColumns, headerColumns } from '@/app/core/constants/columns';
import { Product } from '@/app/data/model/product';
import { ProductService } from '@/app/data/services/product/product.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CreateProductComponent } from '../create/create.component';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-view-product',
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
export class ViewProductComponent implements OnInit {
  displayedColumns = displayedColumns.product;
  displayedHeader = headerColumns.product;
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, public dialog: MatDialog) {}

  loadData() {
    this.productService.getAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource<Product>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      minWidth: '900px',
      autoFocus: true,
      restoreFocus: false,
      disableClose: false,
      data: { id: null },
    });
    dialogRef.afterClosed().subscribe(() => this.loadData());
  }

  openDialogEdit(id: string | number) {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      minWidth: '900px',
      autoFocus: true,
      restoreFocus: false,
      disableClose: false,
      data: { id: id },
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
    this.productService.delete(id as string).subscribe(() => this.loadData());
  }
}
