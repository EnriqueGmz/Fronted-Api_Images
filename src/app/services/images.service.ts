import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../interfaces/image';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private URI: string = 'http://localhost:4000/api/v1/images';

  constructor(private http: HttpClient) {}

  createImage(title: string, descriptionImage: string, image: string) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('descriptionImage', descriptionImage);
    formData.append('image', image);

    return this.http.post(this.URI, formData);
  }

  getImages(): Observable<any> {
    return this.http.get<Image[]>(this.URI);
  }
}
