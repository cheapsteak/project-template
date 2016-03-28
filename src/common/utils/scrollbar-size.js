var scrollbarWidth;

export default {

  init() {
    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'scrollbar-measure';
    document.body.appendChild(scrollDiv);
    scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
  },

  get() {
    return scrollbarWidth;
  }

}
