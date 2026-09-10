(function () {
  var toggle = document.getElementById('navToggle');
  var closeBtn = document.getElementById('sidebarClose');
  var sidebar = document.getElementById('sidebar');
  var scrim = document.getElementById('sidebarScrim');

  function openNav() {
    sidebar.classList.add('open');
    scrim.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }
  function closeNav() {
    sidebar.classList.remove('open');
    scrim.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }
  if (toggle) toggle.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (scrim) scrim.addEventListener('click', closeNav);
})();
