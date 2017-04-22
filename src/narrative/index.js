import { Story } from 'inkjs';
import sleep from 'mz-modules/sleep';

import { addParagraph } from '../store/actions/story';

import story from '../assets/story/main.ink.json';

export default class Narrative {
  constructor(store) {
    this.store = store;
    this.story = new Story(story);
  }

  start() {
    this.story.ResetState();

    return this._processStory();
  }

  async _processStory() {
    if (this.story.canContinue) {
      const text = this.story.Continue();

      this.store.dispatch(addParagraph({ text }));

      await sleep(1000);

      await this._processStory();
    }
  }
}
