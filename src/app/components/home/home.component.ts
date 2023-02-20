import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userLogged = '';
  public logged!: boolean;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.logged = false;
    this.userService.sesion().subscribe({
      next: (res: any) => {
        this.logged = true;
        this.userLogged = `${res.name}`;
      },
      error: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
