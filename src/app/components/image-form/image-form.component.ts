import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css'],
})
export class ImageFormComponent implements OnInit {
  image = '';
  imgURL = 'assets/no-image.png';

  constructor(private imageService: ImagesService) {}

  ngOnInit(): void {}

  selectImage(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgURL = event.target.result;
      };
      this.image = file;
      reader.readAsDataURL(file);
      console.log(this.image);
    }
  }

  uploadImage(
    title: HTMLInputElement,
    descriptionImage: HTMLTextAreaElement
  ): boolean {
    this.imageService
      .createImage(title.value, descriptionImage.value, this.image)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    return false;
  }
}
