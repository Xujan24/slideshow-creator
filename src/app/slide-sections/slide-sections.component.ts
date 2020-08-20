import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide-sections',
  templateUrl: './slide-sections.component.html',
  styleUrls: ['./slide-sections.component.scss']
})
export class SlideSectionsComponent implements OnInit, OnDestroy {
  currentPage = 1;
  pageCount: number;
  isDocLoaded: boolean;
  showCreateDialog: boolean;
  showEditDialog: boolean;

  sections: any = [];

  sectionTitle: string;

  selectedSectionIdx: number;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  // get all the sections if has been created early
  getCreatedSection(): void {
    // In production, this will query to the database for the created sections for this presentation;
    // But for now, we just look into the session storage, if there's any sections already saved;
    // will be called once the document has been successfully loaded;

    this.sections = JSON.parse(sessionStorage.getItem('slideSections') || '[]');
  }

  docLoaded($event): void{
    // get the total page count, once the file is loaded;
    this.pageCount = $event._pdfInfo.numPages;
    this.isDocLoaded = true;
    this.getCreatedSection();
  }

  // pdf viewer controls - next and previous buttons;
  nextPage(): void {
    if (this.currentPage < this.pageCount) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage <= this.pageCount && this.currentPage > 1) {
      this.currentPage--;
    }
  }

  createSection(): void {
    // functio to create a new section;
    if (this.sectionTitle && this.sectionTitle.length > 1) {
      const newSection = {
        page: this.currentPage,
        title: this.sectionTitle
      };

      this.sections.push(newSection);
      this.sectionTitle = '';
      this.hideCreateDialog();
    }
  }

  // function to show and hide, the create new section dialog box;
  openCreateDialog(): void {
    this.showCreateDialog = true;
  }

  hideCreateDialog(): void {
    this.showCreateDialog = false;
  }

  // function to show and hide, the edit section title dialog box;

  openEditDialog(index: number): void{
    // make sure the index number is valid;
    if (index >= 0 && index < this.sections.length) {
      // set the sectionTitle as the title of the selected section
      // and store the index of the selected section. This will be required to perform update;
      this.sectionTitle = this.sections[index].title;
      this.selectedSectionIdx = index;
      this.showEditDialog = true;
    }
  }

  hideEditDialog(): void{
    this.showEditDialog = false;
  }

  editSection(): void {
    // edit an existing section's title - not the slide number;
    // there's no way to change the slide number; only way is to create a new section for the desired slide.
    if (this.sectionTitle) {
      this.sections[this.selectedSectionIdx].title = this.sectionTitle;
      this.selectedSectionIdx = null;
      this.sectionTitle = '';
      this.hideEditDialog();
    }
  }

  removeSection(index: number): void{
    // removes a section
    this.sections.splice(index, 1);
  }

  setCurrentPage(idx: number): void {
    // sets the current page/slide to the one corresponding to the stored section title
    this.currentPage = idx;
  }

  saveDataToSessionStorage(): void {
    // in production, we may store this to the database;
    // for demonstration, the data is stored in session storage;
    // once the brower, or the tab, is closed then the saved data will be lost;
    sessionStorage.setItem('slideSections', JSON.stringify(this.sections));

    this._router.navigate(['/edit-timeline']);
  }

  ngOnDestroy(): void {
    this.sections = [];
    this.selectedSectionIdx = null;
    this.sectionTitle = '';
  }

}
