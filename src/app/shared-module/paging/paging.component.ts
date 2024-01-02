import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() data:any[]= [];
  @Input() lengthArray:number = 0;
  @Output() dataPerPage = new EventEmitter<any[]>
  @Output() currentPageEvent = new EventEmitter<number>

    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 20];

    currentPage: number = 0;
    pagedProducts: any[] = [];

    ngOnInit() {
      // Initialize pagedProducts with the first page of products
      this.onPageChange({ pageIndex: this.currentPage, pageSize: this.pageSize });
        }

onPageChange(event: any): void {
      this.currentPage = event.pageIndex;
      this.currentPageEvent.emit(this.currentPage);
      const startIndex = event.pageIndex * event.pageSize;
      const endIndex = startIndex + event.pageSize;
      this.pagedProducts = this.data.slice(startIndex, endIndex);

      this.dataPerPage.emit(this.pagedProducts);

    }
}
