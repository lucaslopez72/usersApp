import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular';

import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSpinner,
    IonList,
    IonItem,
    IonLabel,
    CommonModule,
    FormsModule
  ]
})
export class UsersPage implements OnInit {

  users: User[] = [];
  loading = false;

  constructor(
    private usersService: UsersService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    try {
      this.loading = true;

      this.users = await this.usersService.getActiveUsers();

    } catch (error) {
      console.error('Error:', error);

    } finally {
      this.loading = false;

      this.cdr.detectChanges();
    }
  }
}