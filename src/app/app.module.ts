import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { VideoTimelineComponent } from './video-timeline/video-timeline.component';
import { SlideSectionsComponent } from './slide-sections/slide-sections.component';
import { VideoPreviewComponent } from './video-preview/video-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoTimelineComponent,
    SlideSectionsComponent,
    VideoPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
