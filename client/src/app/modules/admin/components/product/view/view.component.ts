import { Product } from '@/app/data/model/product';
import { ProductService } from '@/app/data/services/product/product.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { columns } from '@/app/core/constants/columns';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSortModule, CommonModule, MatInputModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewProductComponent implements OnInit {
  displayedColumns = columns.products;
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) {}

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id: string | number) {
    this.productService.delete(id as string).subscribe(() => this.loadData());
  }
}
