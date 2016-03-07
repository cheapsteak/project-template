var Tween = require('gsap');

var Parallax = function (scene, opts) {
  var layers;
  var currLayer;

  var defaults = {
    autoEnable: true,
    mouseProximityMode: false, // useful for grid items etc. when required individual behaviour of each piece in the scene scope
    limitX: 50,
    limitY: 50,
    duration: 3,
    easing: Expo.easeOut
  };
  opts = Object.assign(defaults, opts);

  updateLayers();

  if (opts.autoEnable) enable();


  /**
   * Reset layers position when mouse leaves window
   * @private
   */
  function _handleWindowMouseOut(e) {
    e = e ? e : window.event;
    var from = e.relatedTarget || e.toElement;
    if (!from || from.nodeName === 'HTML') reset();
  }

  /**
   *
   * @private
   */
  function _handleMouseMove(e) {
    for (var i = 0; i < layers.length; i++) {
      currLayer = layers[i];
      var mouseX = e.clientX;
      var mouseY = e.clientY;
      var depth, x, y;

      var vector = _getLayerVector();

      if (opts.mouseProximityMode) {
        var distance = _calcDistanceToCentre(mouseX, mouseY);
        depth = _calculateLayerDepth(distance);
        x = depth * opts.limitX * vector[0];
        y = depth * opts.limitY * vector[1];
      } else {
        depth = currLayer.dataset.depth;
        var relX = (scene.offsetWidth / 2 - mouseX);
        var relY = (scene.offsetHeight / 2 - mouseY);
        x = _normalizeValue(relX, opts.limitX, -opts.limitX) * depth * vector[0];
        y = _normalizeValue(relY, opts.limitY, -opts.limitY) * depth * vector[1];
      }

      _setLayerPosition(x, y);
    }
  }

  /**
   * Normalize value to a range
   * @param value
   * @param min
   * @param max
   * @returns {*}
   * @private
   */
  function _normalizeValue(value, min, max) {
    if (value > max) value = max;
    else if (value < min) value = min;
    return value;
  }

  /**
   * Extract vectors values from 'data-vector' and normalize them
   * @returns {number[]}
   * @private
   */
  function _getLayerVector() {
    var vector = [1, 1];
    if (currLayer.dataset.vector) {
      vector = currLayer.dataset.vector.split(',');
      vector.forEach(function (v) {
        _normalizeValue(v, -1, 1);
      });
    }
    return vector;
  }

  /**
   * Calculate distance between mouse pointer and layer centre for 'mouseProximityMode' mode
   * @param mouseX
   * @param mouseY
   * @returns {number}
   * @private
   */
  function _calcDistanceToCentre(mouseX, mouseY) {
    var centerX = currLayer.getBoundingClientRect().left + currLayer.offsetWidth * 0.5;
    var centerY = currLayer.getBoundingClientRect().top + currLayer.offsetHeight * 0.5;
    return Math.sqrt((mouseX - centerX) * (mouseX - centerX) + (mouseY - centerY) * (mouseY - centerY));
  }

  /**
   * Calculate and normalize layer depth for 'mouseProximityMode' mode
   * @param distance
   * @returns {number}
   * @private
   */
  function _calculateLayerDepth(distance) {
    var depth = currLayer.dataset.depth;
    var windowAverage = (window.innerWidth + window.innerHeight) / 2;
    var baseDepth = (distance / windowAverage - 1);
    return Math.min(Math.abs(baseDepth), 1) * depth;
  }

  /**
   * Tween layer position with specified duration and easing
   * @param x
   * @param y
   * @param applyToAllLayers
   * @private
   */
  function _setLayerPosition(x, y, applyToAllLayers) {
    var target = applyToAllLayers ? layers : currLayer;
    Tween.to(target, opts.duration, {
      x: x || 0,
      y: y || 0,
      ease: opts.easing,
      overwrite: 'all'
    });
  }

  /**
   * Update scene's children. It's called automatically only once upon initialization
   * Needs to be called manually with every DOM update within the scene
   */
  function updateLayers() {
    layers = scene.querySelectorAll('.parallax-layer');
    if (!layers.length) console.warn('No parallax layers');
  }

  /**
   * Update move limits along the axes
   * Needs to be called manually whenever needed (e.g. on scene resize)
   * @param limitX
   * @param limitY
   */
  function updateLimits(limitX, limitY) {
    opts.limitX = limitX || opts.limitX;
    opts.limitY = limitY || opts.limitY;
  }

  function enable() {
    scene.addEventListener('mousemove', _handleMouseMove);
    document.addEventListener('mouseout', _handleWindowMouseOut);
  }

  function disable() {
    scene.removeEventListener('mousemove', _handleMouseMove);
    document.removeEventListener('mouseout', _handleWindowMouseOut);
  }

  /**
   * Reset all layers position at a time with specified duration and easing
   */
  function reset() {
    _setLayerPosition(0, 0, true);
  }

  function destroy() {
    disable();
    Parallax = null;
  }

  return {
    updateLayers: updateLayers,
    updateLimits: updateLimits,
    enable: enable,
    disable: disable,
    reset: reset,
    destroy: destroy
  }

};

module.exports = Parallax;
