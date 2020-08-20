import { VideoPreviewComponent } from './video-preview/video-preview.component';
import { SlideSectionsComponent } from './slide-sections/slide-sections.component';
import { VideoTimelineComponent } from './video-timeline/video-timeline.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '', component : SlideSectionsComponent },
  { path: 'edit-timeline', component: VideoTimelineComponent },
  { path: 'preview', component: VideoPreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
