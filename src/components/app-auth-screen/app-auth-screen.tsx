import { Component, Prop } from "@stencil/core";

@Component({
  tag: 'app-auth-screen',
  styleUrl: 'app-auth-screen.scss'
})
export class AuthScreen {
  @Prop() subScreen: 'sign-in' | 'sign-up';
  render() {
    return (
      <ion-content>
        <div class='auth-screen-intro'>
          <ion-img src="assets/whatsapp-icon.png" class='auth-screen-icon' />
          <h2 class='auth-screen-title'>WhatsApp Clone</h2>
        </div>
        {this.subScreen !== 'sign-up' && <app-sign-in-form />}
        {this.subScreen === 'sign-up' && <app-sign-up-form />}
      </ion-content>
    )
  }
}
