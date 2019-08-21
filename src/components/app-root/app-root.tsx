import { Component, Prop, Listen, h } from '@stencil/core';
import apolloClient from '../../helpers/apollo-client';
import { getAuthHeader } from '../../helpers/auth-service';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss'
})
export class AppRoot {

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement;

  /**
   * Handle service worker updates correctly.
   * This code will show a toast letting the
   * user of the PWA know that there is a
   * new version available. When they click the
   * reload button it then reloads the page
   * so that the new service worker can take over
   * and serve the fresh content
   */
  @Listen('window:swUpdate')
  async onSWUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'New version available',
      showCloseButton: true,
      closeButtonText: 'Reload'
    });
    await toast.present();
    await toast.onWillDismiss();
    window.location.reload();
  }

  render() {
    return (
      <apollo-provider client={apolloClient}>
        <ion-app>
          <ion-router useHash={false}>
            {
              getAuthHeader() ?
                [
                  <ion-route-redirect from='/' to='/chats' />,
                  <ion-route url='/chats' component={'app-chats-list-screen'} />,
                  <ion-route url='/settings' component={'app-settings'} />,
                  <ion-route url='/chats/:chatId' component={'app-chat-screen'} />,
                  <ion-route url='/new-chat' component={'app-new-chat-screen'} />,
                  <ion-route url='/new-chat/group' component={'app-new-group-screen'} />,
                  <ion-route url='/new-chat/group/details' component={'app-group-details-screen'} />,
                  <ion-route url='/chats/:chatId/details' component={'app-group-details-screen'} />
                ]
                : [
                  <ion-route-redirect from='/*' to='/sign-in' />,
                  <ion-route url='/sign-in' component='app-auth-screen' componentProps={{ subScreen: 'sign-in ' }} />,
                  <ion-route url='/sign-up' component='app-auth-screen' componentProps={{ subScreen: 'sign-up' }} />,
                ]
            }
          </ion-router>
          <ion-nav />
        </ion-app>
      </apollo-provider>
    );
  }
}
