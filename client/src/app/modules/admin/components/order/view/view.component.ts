import { displayedColumns, headerColumns } from '@/app/core/constants/columns';
import { OrderStatusType, PaymentStatusType, sortByOptions } from '@/app/core/constants/type';
import { Order, OrderFilter } from '@/app/data/model/order';
import { OrderService } from '@/app/data/services/order/order.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { catchError, of, Subject, takeUntil } from 'rxjs';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePickerComponent } from '@/app/shared/components/date-picker/date-picker.component';
import { SelectComponent } from '@/app/shared/components/select/select.component';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { OrderFormComponent } from '../form/form.component';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    InputComponent,
    DatePickerComponent,
    ReactiveFormsModule,
    CommonModule,
    SelectComponent,
    MatCheckboxModule,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewOrderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  displayedColumns = displayedColumns.order;
  displayedHeader = headerColumns.order;
  dataSource!: MatTableDataSource<Order>;

  // Forms
  formFilter!: FormGroup;
  formSearch!: FormGroup;

  selectOrders: Set<string> = new Set<string>();
  isAllSelected = false;
  currentFilter: OrderFilter = {};
  orderStatus = Object.entries(OrderStatusType).map(([value, label]) => ({ value: value.toUpperCase(), label }));
  paymentStatus = Object.entries(PaymentStatusType).map((value) => ({ value: value[1], label: value[0] }));
  sortFilter = sortByOptions;

  currentPage = 0;
  pageSize = 20;
  totalPages = 0;
  totalOrders = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService, public dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadData();
    this.initializeForm();
  }

  loadData() {
    const params: OrderFilter = {
      ...this.currentFilter,
      page: this.currentPage,
    };

    this.orderService
      .getAll(params, this.currentPage, this.pageSize)
      .pipe(
        takeUntil(this.destroy$),
        catchError(() => {
          this.dataSource = new MatTableDataSource<Order>([]);
          return of([]);
        }),
      )
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<Order>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  private initializeForm() {
    this.formFilter = this.fb.group({
      query: [''],
      status: [''],
      paymentStatus: [''],
      dateRange: [''],
      sort: [null],
    });

    this.formSearch = this.fb.group({
      query: [''],
    });
  }

  openDialog(id: string | number) {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      minWidth: '120px',
      autoFocus: true,
      restoreFocus: false,
      disableClose: false,
      data: { id: id, isEdit: false },
    });
    dialogRef.afterClosed().subscribe(() => this.loadData());
  }

  openEditDialog(id: string | number) {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      minWidth: '120px',
      autoFocus: true,
      restoreFocus: false,
      disableClose: false,
      data: { id: id, isEdit: true },
    });
    dialogRef.afterClosed().subscribe(() => this.loadData());
  }

  applyFilter(): void {
    const formValue = this.formFilter.value;

    this.currentFilter = {
      ...this.currentFilter,
      query: formValue.query?.trim() || undefined,
      status: formValue.status || undefined,
      paymentStatus: formValue.paymentStatus || undefined,
      dateFrom: formValue.dateRange?.start || undefined,
      dateTo: formValue.dateRange?.end || undefined,
      sortBy: formValue.sort?.sortBy || 'createdAt',
      sortDirection: formValue.sort?.sortDirection || 'desc',
    };

    console.log(this.currentFilter);
    this.currentPage = 0;
    this.loadData();
  }

  clearFilter() {
    this.formFilter.reset({
      sortBy: 'createdAt',
      sortDirection: 'desc',
    });
    this.formSearch.reset();
    this.currentFilter = {};
    this.currentPage = 0;
    this.selectOrders.clear();
    this.loadData();
  }

  onToggleRow(id: string, checked: boolean) {
    checked ? this.selectOrders.add(id) : this.selectOrders.delete(id);
  }

  onExport() {
    const ids = Array.from(this.selectOrders);
    this.orderService.export( ids ).subscribe((data: Blob) => {

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'order.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
