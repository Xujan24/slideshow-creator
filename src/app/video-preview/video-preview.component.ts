import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss']
})
export class VideoPreviewComponent implements OnInit {
  @ViewChild(PdfViewerComponent, {static: false})
  private pdfComponent: PdfViewerComponent;

  @ViewChild('videoPlayer', {static: false}) private player: ElementRef;

  timeline: any = [];
  currentPlayingSlideIdx = 0;
  sliderValue = 50;

  zoomScaleOption = 'page-fit';
  pageCount: number;
  isDocLoaded: boolean;
  currentPage = 1;

  // flag to indicate whether the video and slides are automatically synchronized or not;
  // by default it is on;
  // however, if the user clicks on the slide next - previous button, this will be turned off;
  // uses can then have two options to turn back the sychronize option;
  // either click on sync with video or sync with current slide;
  preventAutoSync: boolean;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.timeline = JSON.parse(sessionStorage.getItem('timeline') || null );

    if (this.timeline === null) {
      this._router.navigate(['/edit-timeline']);
    }
  }

  docLoaded($event): void{
    // get the total page count, once the file is loaded;
    this.pageCount = $event._pdfInfo.numPages;
    this.isDocLoaded = true;
  }

  onVideoPlaying($event): void {
    // gets executed, repeatdly while the video is playing;

    if (this.preventAutoSync) {
      // do nothing as the automatic sync is disabled;
      return;
    }

    const currentPlayTime = $event.target.currentTime;

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.timeline.length; i++) {

      this.currentPlayingSlideIdx = i;

      if (i === this.timeline.length - 1) {
        this.currentPage = this.timeline[i].page;
        break;
      }

      if (this.timeline[i + 1].showTime - currentPlayTime >= 0) {
        this.currentPage = this.timeline[i].page;
        break;
      }
    }
  }

  // called after pdf page is rendered
  pageRendered(): void {
    this.pdfComponent.pdfViewer.currentScaleValue = 'page-fit';
  }

  nextSlide(): void {
    if (this.currentPlayingSlideIdx < this.timeline.length) {
      this.preventAutoSync = true;
      this.currentPlayingSlideIdx++;
      this.currentPage = this.timeline[this.currentPlayingSlideIdx].page;
    }
  }

  previousSlide(): void {
    if (this.currentPlayingSlideIdx > 0) {
      this.preventAutoSync = true;
      this.currentPlayingSlideIdx--;
      this.currentPage = this.timeline[this.currentPlayingSlideIdx].page;
    }
  }

  syncWithVideo(): void {
    this.preventAutoSync = false;
  }

  syncWithSlide(): void {
    const currentSlide = this.timeline[this.currentPlayingSlideIdx];
    this.player.nativeElement.currentTime = currentSlide.showTime + 0.001;
    this.preventAutoSync = false;
  }

}
