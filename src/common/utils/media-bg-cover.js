module.exports = function (el, container, hAlign, vAlign) {

  hAlign = hAlign || 0.5;
  vAlign = vAlign || 0.5;

  var elAspect, elWidth, elHeight, elPosTop, elPosLeft;

  var w = (container === window) ? container.innerWidth : container.clientWidth;
  var h = (container === window) ? container.innerHeight : container.clientHeight;
  var contAspect = w / h;

  if (el instanceof HTMLVideoElement) {
    elAspect = el.videoWidth / el.videoHeight;
  } else if (el instanceof HTMLImageElement) {
    elAspect = (el.naturalWidth !== undefined) ? (el.naturalWidth / el.naturalHeight) : (el.width / el.height);
  } else {
    elAspect = el.clientWidth / el.clientHeight;
  }

  if (contAspect > elAspect) {
    elWidth = w;
    elHeight = w / elAspect;
    elPosTop = -(elHeight - h) * vAlign;
    elPosLeft = 0;
  } else {
    elWidth = h * elAspect;
    elHeight = h;
    elPosTop = 0;
    elPosLeft = -(elWidth - w) * hAlign;
  }

  el.parentNode.style.overflow = 'hidden';

  el.style.position = 'absolute';
  el.width = elWidth;
  el.height = elHeight;
  el.style.width = elWidth + 'px';
  el.style.height = elHeight + 'px';
  el.style.top = elPosTop + 'px';
  el.style.left = elPosLeft + 'px';
};
