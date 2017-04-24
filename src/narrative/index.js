import { Story } from 'inkjs/dist/ink';
import sleep from 'mz-modules/sleep';

import {
  addParagraph,
  clearParagraphs,
  setImage,
  waitForInput,
} from '../store/actions/story';

import story from '../assets/story/main.ink.json';

export default class Narrative {
  shouldDelayContent = true;
  processLoopIndex = 0;

  constructor(store) {
    this.store = store;
    this.story = new Story(story);
  }

  start(moment) {
    this.story.ResetState();

    return this.chooseMoment(moment);
  }

  getMoments() {
    return Object.keys(this.story.mainContentContainer.namedContent)
      .filter(key => key !== 'start' && key !== 'end')
      .map(key => {
        const knotTags = this.story.TagsForContentAtPath(key);

        const tag = knotTags.find(tag => tag.startsWith('name:'));

        let name;

        if (tag) {
          name = tag.split(':').slice(1).join(':').trim();
        } else {
          name = key.replace(/_/g, ' ');
        }

        return { name, key };
      });
  }

  chooseMoment(moment) {
    if (this.story.state.currentPath === moment) {
      return;
    }

    this.shouldDelayContent = true;

    this.store.dispatch(clearParagraphs());

    this.story.ChoosePathString(moment);

    this.processLoopIndex++;

    return this._processStory(this.processLoopIndex);
  }

  fastForward() {
    this.shouldDelayContent = false;

    if (this.story.canContinue) {
      this.processLoopIndex++;

      return this._processStory(this.processLoopIndex);
    }
  }

  async _processStory(processLoopIndex) {
    if (processLoopIndex !== this.processLoopIndex) {
      return;
    }

    if (this.story.canContinue) {
      let text = this.story.Continue();

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

      if (this.shouldDelayContent) {
        await sleep(1000);
      }

      await this._processStory(processLoopIndex);
    } else {
      this.store.dispatch(waitForInput());
    }
  }
}
