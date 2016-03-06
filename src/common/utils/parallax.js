import Tween from 'gsap';

const defaults = {
  autoEnable: true,
  limitX: 50,
  limitY: 50,
  duration: 3,
  easing: Expo.easeOut
};

export default (scene, opts) => {
  var layers;
  var currLayer;

  opts = Object.assign(defaults, opts);

  updateLayers();
  if (opts.autoEnable) enable();

  document.addEventListener('mouseout', _handleWindowMouseOut);


  function _handleWindowMouseOut(e) {
    // reset parallax when mouse left window
    e = e ? e : window.event;
    var from = e.relatedTarget || e.toElement;
    if (!from || from.nodeName == 'HTML') reset();
  }

  function _handleMouseMove(e) {
    for (let i = 0; i < layers.length; i++) {
      currLayer = layers[i];

      const vector = _getLayerVector();
      const distance = _calculateDistance(e.clientX, e.clientY);
      const depth = _calculateLayerDepth(distance);

      const x = depth * opts.limitX * vector[0];
      const y = depth * opts.limitY * vector[1];
      _setLayerPosition(x, y);
    }
  }

  function _getLayerVector() {
    if (!currLayer.dataset.vector) return [1, 1];

    const vector = currLayer.dataset.vector.split(',');
    vector.forEach((v) => {
      if (v > 1) v = 1;
      else if (v < -1) v = -1;
    });
    return vector;
  }

  function _calculateDistance(mouseX, mouseY) {
    const centerX = currLayer.getBoundingClientRect().left + currLayer.offsetWidth * 0.5;
    const centerY = currLayer.getBoundingClientRect().top + currLayer.offsetHeight * 0.5;
    return Math.sqrt((mouseX - centerX) * (mouseX - centerX) + (mouseY - centerY) * (mouseY - centerY));
  }

  function _calculateLayerDepth(distance) {
    const depth = currLayer.dataset.depth;
    const windowAverage = (window.innerWidth + window.innerHeight) / 2;
    const baseDepth = (distance / windowAverage - 1);
    return Math.min(Math.abs(baseDepth), 1) * depth;
  }

  function _setLayerPosition(x = 0, y = 0, applyToAllLayers) {
    const target = applyToAllLayers ? layers : currLayer;
    Tween.to(target, opts.duration, {x: x, y: y, ease: opts.easing, overwrite: 'all'});
  }

  function updateLayers() {
    layers = scene.querySelectorAll('.parallax-layer');
    if (!layers.length) console.warn('No parallax layers');
    console.log('parallax.updateLayers');
  }

  function enable() {
    scene.addEventListener('mousemove', _handleMouseMove);
  }

  function disable() {
    scene.removeEventListener('mousemove', _handleMouseMove);
  }

  function reset() {
    _setLayerPosition(0, 0, true);
  }

  function destroy() {
    disable();
    document.removeEventListener('mouseout', _handleWindowMouseOut);
  }

  return {updateLayers, enable, disable, reset, destroy}

};
