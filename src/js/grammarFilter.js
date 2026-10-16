(function () {
  function initPanel(panel) {
    var listSel = panel.getAttribute('data-grammar-filter');
    var countSel = panel.getAttribute('data-grammar-count');
    var list = listSel ? document.querySelector(listSel) : null;
    var countEl = countSel ? document.querySelector(countSel) : null;
    var emptySel = panel.getAttribute('data-grammar-empty');
    var emptyEl = emptySel ? document.querySelector(emptySel) : null;
    if (!list) return;
    var chips = panel.querySelectorAll('.grammar-chip');
    var resetBtn = panel.querySelector('.grammar-filter-reset');
    var order = ['any', 'include', 'exclude'];

    function apply() {
      var active = [];
      chips.forEach(function (c) {
        var state = c.getAttribute('data-state') || 'any';
        if (state !== 'any') active.push({ prop: c.getAttribute('data-prop'), state: state });
      });
      var cards = list.querySelectorAll('.text-card');
      var shown = 0;
      cards.forEach(function (card) {
        var visible = true;
        for (var i = 0; i < active.length; i++) {
          var f = active[i];
          var truthy = card.dataset[f.prop] === 'true';
          if (f.state === 'include' && !truthy) { visible = false; break; }
          if (f.state === 'exclude' && truthy) { visible = false; break; }
        }
        card.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      list.querySelectorAll('.author-block').forEach(function (block) {
        var anyVisible = Array.prototype.some.call(block.querySelectorAll('.text-card'), function (c) {
          return c.style.display !== 'none';
        });
        block.style.display = anyVisible ? '' : 'none';
      });
      if (countEl) countEl.textContent = shown;
      if (emptyEl) emptyEl.style.display = shown === 0 ? 'block' : 'none';
    }

    chips.forEach(function (c) {
      c.setAttribute('data-state', 'any');
      c.addEventListener('click', function () {
        var cur = c.getAttribute('data-state') || 'any';
        var next = order[(order.indexOf(cur) + 1) % order.length];
        c.setAttribute('data-state', next);
        apply();
      });
    });
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        chips.forEach(function (c) { c.setAttribute('data-state', 'any'); });
        apply();
      });
    }
    apply();
  }

  document.querySelectorAll('[data-grammar-filter]').forEach(initPanel);
})();
