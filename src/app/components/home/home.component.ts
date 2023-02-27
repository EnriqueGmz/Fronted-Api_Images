import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userLogged = '';
  public logged!: boolean;
  images: any = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private imageService: ImagesService
  ) {}

  ngOnInit(): void {
    this.logged = false;
    this.userService.sesion().subscribe({
      next: (res: any) => {
        this.logged = true;
        this.userLogged = `${res.name}`;
        this.mostrarImagen();
      },
      error: () => {
        this.router.navigate(['/']);
      },
    });
  }

  mostrarImagen() {
    this.imageService.getImages().subscribe(
      (res) => {
        (this.images = res), console.log(res);
      },
      (err) => console.log(err)
    );
  }
}
