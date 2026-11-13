(function () {
  "use strict";

  var el = document.getElementById('player');
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isMobile = window.matchMedia("(max-width: 600px)").matches;

  var speed = isMobile ? 12 : 20;
  var angle = Math.random() * Math.PI * 2;
  var vx = Math.cos(angle) * speed;
  var vy = Math.sin(angle) * speed;
  var x = 0, y = 0, last = 0, paused = false, resumeTimer = 0;

  function bounds() {
    return {
      maxX: Math.max(0, window.innerWidth - el.offsetWidth),
      maxY: Math.max(0, window.innerHeight - el.offsetHeight)
    };
  }

  function place() {
    el.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0)";
  }

  var b = bounds();
  x = Math.random() * b.maxX;
  y = Math.random() * b.maxY;
  place();

  if (REDUCED) {
    x = b.maxX - 16;
    y = b.maxY - 16;
    place();
    return;
  }

  function loop(t) {
    var dt = last ? Math.min((t - last) / 1000, 0.1) : 0;
    last = t;

    if (!paused) {
      var bb = bounds();
      x += vx * dt;
      y += vy * dt;
      if (x < 0)        { x = 0;       vx = Math.abs(vx); }
      if (x > bb.maxX)  { x = bb.maxX; vx = -Math.abs(vx); }
      if (y < 0)        { y = 0;       vy = Math.abs(vy); }
      if (y > bb.maxY)  { y = bb.maxY; vy = -Math.abs(vy); }
      place();
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  el.addEventListener('mouseenter', function () { paused = true; });
  el.addEventListener('mouseleave', function () { paused = false; });
  el.addEventListener('focusin',    function () { paused = true; });
  el.addEventListener('focusout',   function () { paused = false; });

  el.addEventListener('touchstart', function () {
    paused = true;
    clearTimeout(resumeTimer);
  }, { passive: true });
  el.addEventListener('touchend', function () {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(function () { paused = false; }, 2000);
  }, { passive: true });
})();