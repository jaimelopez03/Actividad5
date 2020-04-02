import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(private afa: AngularFireAuth,
              private navCtrl: NavController) {

    this.afa.authState.subscribe((user) => {
      if (user) {
        this.setUser(user);
        this.navCtrl.navigateRoot(['home']);
      } else {
        this.navCtrl.navigateRoot(['']);
      }
    });
  }

  setUser(user): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  cleanUser(): void {
    localStorage.removeItem('user');
    this.user = null;
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    console.log(user);
    return (user !== null && user !== undefined);
  }

  login(email: string, password: string): void {
    this.afa.auth.signInWithEmailAndPassword(email, password).then((credentials) => {
      this.setUser(credentials.user);
      this.navCtrl.navigateRoot(['home']);
    }).catch((error) => {
      console.log(error);
    });
  }

  signup(email: string, password: string) {
    return this.afa.auth.createUserWithEmailAndPassword(email, password);

  }

  logout(): void {
    this.afa.auth.signOut().then(() => {
      this.cleanUser();
      this.navCtrl.navigateRoot(['']);
    }).catch((error) => {
      console.log(error);
    });
  }
}
