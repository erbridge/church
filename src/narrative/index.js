import { Story } from 'inkjs';
import sleep from 'mz-modules/sleep';

import { addParagraph, setImage } from '../store/actions/story';

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

      const knotTags =
        this.story.state.currentPath &&
        this.story.TagsForContentAtPath(
          this.story.state.currentPath.head._name,
        );

      if (knotTags && knotTags.length) {
        knotTags.forEach(tag => {
          if (tag.startsWith('image:')) {
            this.store.dispatch(
              setImage({ image: tag.split(':').slice(1).join(':').trim() }),
            );
          }
        });
      }

      this.store.dispatch(addParagraph({ text }));

      await sleep(1000);

      await this._processStory();
    }
  }
}
