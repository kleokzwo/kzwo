import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
const robohashAvatars = require('robohash-avatars');

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnChanges {

  @Input() data: any[] = [];
  public pageSize = 10;
  public currentPage = 1;
  public totalPages = 1;
  public pages: number[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.totalPages = Math.ceil(this.data.length / this.pageSize);
      this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      this.goToPage(1);
    }
  }

  public goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  public getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    if (this.data) {
      return this.data.slice(startIndex, endIndex);
    }
    return;
  }

  public parseNumber(str: string): number {
    return parseFloat(str);
  }

  public getAvatar(name: string) {
    return robohashAvatars.generateAvatar({
      username: name,
      background: robohashAvatars.BackgroundSets.RandomBackground1,
      characters: robohashAvatars.CharacterSets.Robots,
      height: 400,
      width: 400
    });
  }

}
