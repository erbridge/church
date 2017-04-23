export const getImage = state => state.story.image;
export const getMoment = state => state.story.moment;
export const getParagraphs = state => state.story.paragraphs;
export const getVisitedMoments = state => state.story.visitedMoments;
export const getWaitingForInput = state => state.story.waitingForInput;

export default {
  getImage,
  getMoment,
  getParagraphs,
  getVisitedMoments,
  getWaitingForInput,
};
