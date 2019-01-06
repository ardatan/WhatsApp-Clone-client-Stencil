import { Component, State } from "@stencil/core";
import { signIn } from "../../helpers/auth-service";

@Component({
  tag: 'app-sign-in-form'
})
export class SignInForm {
  @State() username: string;
  @State() password: string;
  @State() error: string;
  onUsernameChange = ({ target }) => {
    this.error = '';
    this.username = target.value;
  }
  onPasswordChange = ({ target }) => {
    this.error = '';
    this.password = target.value;
  }
  maySignIn() {
    return !!(this.username && this.password);
  }
  handleSignIn = async () => {
    try {
      await signIn({ username: this.username, password: this.password });
      document.querySelector('ion-router').push('/chats');
    } catch (error) {
      this.error = error.message || error;
    }
  }
  render() {
    return [
        <ion-list>
          <ion-list-header>
            Sign In
          </ion-list-header>
          <ion-item>
            <ion-label position='floating'>
              Username
              </ion-label>
            <ion-input
              class="auth-screen-text-field"
              value={this.username}
              onIonChange={this.onUsernameChange}
              placeholder="Enter your username"
            />
          </ion-item>
          <ion-item>
            <ion-label position='floating'>
              Password
            </ion-label>
            <ion-input
              class="auth-screen-text-field"
              type="password"
              value={this.password}
              onIonChange={this.onPasswordChange}
              placeholder="Enter your password"
            />
          </ion-item>
        </ion-list>,
        <ion-button color="secondary" disabled={!this.maySignIn()} onClick={this.handleSignIn}>Sign in</ion-button>,
        <div class="auth-screen-error">{this.error}</div>,
        <span class="auth-screen-alternative">Don't have an account yet? <a href='/sign-up'>Sign up!</a></span>
      ];
  }
}
