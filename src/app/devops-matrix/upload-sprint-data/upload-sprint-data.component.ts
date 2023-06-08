import { Component, Inject } from '@angular/core';
import { ISprintData } from '../models/common.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'upload-sprint-data',
  templateUrl: './upload-sprint-data.component.html',
  styleUrls: ['./upload-sprint-data.component.css']
})
export class UploadSprintDataComponent {
  uploadedFile: any;
  uploadedFileSize: any;
  loading: boolean = false;
  isSubmitDisabled: boolean = true;
  sprintData: ISprintData[] = [];
  baseUrl: string;
  _httpClient: HttpClient;
  messageToDisplay: string = "";
  success: boolean = false;
  failure: boolean = false;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this._httpClient = http;
  }

  OnFileSelect(event: any) {
    this.uploadedFile = null;
    this.uploadedFileSize = null;
    this.isSubmitDisabled = true;
    this.success = false;
    this.failure = false;
  }

  OnUpload(event: any) {
    this.success = false;
    this.failure = false;

    this.uploadedFile = event.files[0];
    this.uploadedFileSize = this.GetExactFileSize();
    this.isSubmitDisabled = false;
  }

  OnSubmit() {
    this.loading = true;
    this.success = false;
    this.failure = false;
    this.isSubmitDisabled = true;

    let formData = new FormData();
    formData.append('upload', this.uploadedFile);

    console.log(formData);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this._httpClient.post(this.baseUrl + 'sprintdata/uploadexcel', formData, httpOptions).subscribe(
      data => {
        this.success = true;
        this.loading = false;
        this.isSubmitDisabled = false;
      },
      err => {
        this.failure = true;
        if (typeof (err.error) === 'object')
          this.messageToDisplay = err.error.title;
        else
          this.messageToDisplay = err.error;

        console.log(err);
        this.loading = false;
        this.isSubmitDisabled = false;
      }
    );
  }

  OnClearSelection() {
    this.uploadedFile = null;
    this.uploadedFileSize = null;
  }

  GetExactFileSize() {
    var totalBytes = this.uploadedFile.size;
    var _size = this.uploadedFile.size;
    if (totalBytes < 1000000)
      _size = (((totalBytes / 1000) * 100) / 100).toFixed(3) + ' KB';
    else
      _size = (((totalBytes / 1000000) * 100) / 100).toFixed(3) + ' MB';

    return _size;
  }
}
