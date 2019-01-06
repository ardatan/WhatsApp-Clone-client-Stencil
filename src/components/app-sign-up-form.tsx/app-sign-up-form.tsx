import { Component, State } from "@stencil/core";
import { signUp } from "../../helpers/auth-service";

@Component({
  tag: 'app-sign-up-form'
})
export class SignUpForm {
  @State() name: string;
  @State() username: string;
  @State() oldPassword: string;
  @State() password: string;
  @State() error: string;
  updateName = ({ target }) => {
    this.error = '';
    this.name = target.value;
  }
  updateUsername = ({ target }) => {
    this.error = '';
    this.username = target.value;
  }
  updateOldPassword = ({ target }) => {
    this.error = '';
    this.oldPassword = target.value;
  }
  updateNewPassword = ({ target }) => {
    this.error = '';
    this.password = target.value
  }
  maySignUp() {
    return !!(this.name && this.username && this.oldPassword && this.oldPassword === this.password);
  }
  handleSignUp = async () => {
    try {
      await signUp({
        username: this.username,
        password: this.password,
        name: this.name
      });
      document.querySelector('ion-router').push('/sign-in');
    } catch (error) {
      this.error = error.message || error;
    }
  }
  handleSignIn = () => {
    document.querySelector('ion-router').push('/sign-in');
  }
  render() {
    return [
      <ion-list>
        <ion-list-header>
          Sign Up
        </ion-list-header>
        <ion-item>
          <ion-label position='floating'>
            Name
          </ion-label>
          <ion-input
            class="auth-screen-text-field" autocomplete='off' value={this.name} onIonChange={this.updateName} />
        </ion-item>
        <ion-item>
          <ion-label position='floating'>
            Username
          </ion-label>
          <ion-input
            class="auth-screen-text-field" autocomplete='off' value={this.username} onIonChange={this.updateUsername} />
        </ion-item>
        <ion-item>
          <ion-label position='floating'>
            Old password
          </ion-label>
          <ion-input
            class="auth-screen-text-field" autocomplete='off' type='password' value={this.oldPassword} onIonChange={this.updateOldPassword} />
        </ion-item>
        <ion-item>
          <ion-label position='floating'>
            New password
          </ion-label>
          <ion-input
            class="auth-screen-text-field" autocomplete='off' type='password' value={this.password} onIonChange={this.updateNewPassword} />
        </ion-item>
      </ion-list>
    ];
  }
}
