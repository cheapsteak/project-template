import Tween from 'gsap';

const parallax = (scene, opts = {}) => {
  var layers;

  updateLayers();
  if (opts.autoEnable) enable();

  function updateLayers() {
    layers = scene.querySelectorAll('.parallax-layer');
    if (!layers.length) console.warn('No parallax layers');
    console.log('parallax.updateLayers');
    //console.log('parallax layers:', layers);
  }

  function enable() {
    scene.addEventListener('mousemove', handleMouseMove);
  }

  function disable() {
    scene.removeEventListener('mousemove', handleMouseMove);
  }

  function handleMouseMove(e) {
    //console.log(e.clientX, e.clientY, layers)
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];

      const distance = calculateDistance(layer, e.clientX, e.clientY);
      const depth = calculateLayerDepth(distance, layer.dataset.depth);

      TweenMax.to(layer, 3, {
        x: depth * opts.limitX,
        y: depth * opts.limitY,
        ease: Expo.easeOut,
        overwrite: 'all'
      });
    }
  }

  function calculateDistance(layer, mouseX, mouseY) {
    const centerX = layer.getBoundingClientRect().left + layer.offsetWidth * 0.5;
    const centerY = layer.getBoundingClientRect().top + layer.offsetHeight * 0.5;
    return Math.sqrt((mouseX - centerX) * (mouseX - centerX) + (mouseY - centerY) * (mouseY - centerY));
  }

  function calculateLayerDepth(distance, depth) {
    const windowAverage = (window.innerWidth + window.innerHeight) / 2;
    const baseDepth = (distance / windowAverage - 1);
    return Math.min(Math.abs(baseDepth), 1) * depth;
  }

  function reset() {
    TweenMax.to(layers, 3, {
      x: 0,
      y: 0,
      ease: Expo.easeOut,
      overwrite: 'all'
    });
  }

  return {updateLayers, enable, disable, reset}

};

module.exports = parallax;
