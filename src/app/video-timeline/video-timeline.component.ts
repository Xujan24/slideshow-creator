import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video-timeline',
  templateUrl: './video-timeline.component.html',
  styleUrls: ['./video-timeline.component.scss']
})
export class VideoTimelineComponent implements OnInit {

  @ViewChild('videoPlayer', {static: false}) player: ElementRef;
  @ViewChild('slider', {static: false}) timeline: ElementRef;

  sectionVideoTimeline: any = [];

  sections: any = [];
  currentPage = 1;
  selectedSectionIdx: number;

  currentVideoTime = 0;
  videoLoaded: boolean;
  isVideoPlaying: boolean;
  videoLength = 0;

  showSlidesDialog: boolean;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.sections = this.getSections();
    if (!this.sections) {
      this._router.navigate(['/']);
    }

    // get timeline if it has already been created;
    this.sectionVideoTimeline = JSON.parse(sessionStorage.getItem('timeline') || '[]');


  }

  getSections(): any {
    return JSON.parse(sessionStorage.getItem('slideSections') || null);
  }

  dataLoaded($event): void {
    this.videoLoaded = true;
    this.videoLength = $event.target.duration;
  }

  playPauseVideo(): void{
    this.isVideoPlaying = !this.isVideoPlaying;

    if (this.isVideoPlaying) {
      this.player.nativeElement.play();
    } else {
      this.player.nativeElement.controls = true;
      this.player.nativeElement.pause();
    }
  }

  onVideoPlaying(): void {
    this.player.nativeElement.controls = false;
    this.isVideoPlaying = true;
  }

  videoEnded(): void{
    this.isVideoPlaying = false;
    this.currentVideoTime = 0;
  }

  updateSliderValue($event): void {
    this.currentVideoTime = $event.target.currentTime;
  }

  sliderValueChanged(sliderElement): void {
    this.player.nativeElement.currentTime = sliderElement.value;
  }

  openSlidesDialog(): void {

    if (this.isVideoPlaying) {
      this.isVideoPlaying = false;
      this.player.nativeElement.pause();
    }

    this.showSlidesDialog = true;
  }

  closeSlideDialog(): void {
    this.selectedSectionIdx = null;
    this.showSlidesDialog = false;
  }

  addSlideToTimeline(): void {
    if (this.selectedSectionIdx) {
      const data = this.sections[this.selectedSectionIdx];
      data.showTime = this.currentVideoTime;

      this.sectionVideoTimeline.push(data);
      this.sortTimeline();

      this.selectedSectionIdx = null;
      this.currentPage = data.page;
    }

    this.closeSlideDialog();
  }

  goToSectionTimeline(section: any): void {
    if (section) {
      this.currentPage = section.page;

      this.isVideoPlaying = false;
      this.player.nativeElement.pause();

      this.currentVideoTime = section.showTime;
      this.player.nativeElement.currentTime = this.currentVideoTime;
    }
  }

  // helper function to sort the array of object;
  // source code: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/;
  compare(obj1, obj2, prop): number {
    if(obj1.showTime > obj2.showTime) {
      return 1;
    }
    return -1;
  }

  sortTimeline(): void {
    if (this.sectionVideoTimeline.length > 0) {
      this.sectionVideoTimeline = this.sectionVideoTimeline.sort(this.compare);
    }
  }

  deleteFromTimeline(idx: number): void {
    if (idx >= 0) {
      this.sectionVideoTimeline.splice(idx, 1);
    }
  }

  saveTimeline(): void {
    // here the timeline data will be stored into the session storage;
    if (this.sectionVideoTimeline.length > 0) {
      sessionStorage.setItem('timeline', JSON.stringify(this.sectionVideoTimeline));
      this._router.navigate(['/preview']);
    }
  }

}
