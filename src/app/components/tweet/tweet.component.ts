import { Component } from '@angular/core';

@Component({
  selector: 'app-tweet-component',
  template: `
    <div [innerHTML]="timeline"></div>
  `
})

export class TweetComponent {
  // eslint-disable-next-line max-len
  public timeline = '<h1>Hallo</h1>';
}
