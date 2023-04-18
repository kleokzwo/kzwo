import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnChanges {

  @Input() data: any[] = [];
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.totalPages = Math.ceil(this.data.length / this.pageSize);
      this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      this.goToPage(1);
    }
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    if (this.data) {
      return this.data.slice(startIndex, endIndex);
    }
    return;
  }

  parseNumber(str: string): number {
    return parseFloat(str);
  }

}
