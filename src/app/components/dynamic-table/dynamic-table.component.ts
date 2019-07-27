import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "dynamic-table",
  templateUrl: "./dynamic-table.component.html",
  styleUrls: ["./dynamic-table.component.css"]
})
export class DynamicTableComponent implements OnInit {
  @Input() items = [];
  itemsPerPage = 5;
  currentPage = 1;

  constructor() {}

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.pageCount) this.currentPage++;
  }

  firstPage() {
    if (this.currentPage !== 1) this.currentPage = 1;
  }

  lastPage() {
    if (this.currentPage !== this.pageCount) this.currentPage = this.pageCount;
  }

  goToPage(pageNbr: number) {
    this.currentPage = pageNbr;
  }

  get pageCount() {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

  get startIndex() {
    return (this.items.length / this.itemsPerPage) * this.currentPage;
  }

  get endIndex() {
    return this.startIndex + this.itemsPerPage;
  }

  get filteredItems() {
    return [];
    // return this.items.filter(
    //   x => x.index >= this.startIndex && x.index <= this.endIndex
    // );
  }

  ngOnInit() {}
}
