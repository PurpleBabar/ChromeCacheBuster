document.addEventListener("DOMContentLoaded", function(event) {
  var cacheBuster = JSON.parse(localStorage.cacheBuster);

  document.getElementById('css').checked = cacheBuster.css;
  document.getElementById('js').checked = cacheBuster.js;

  var form = document.getElementById('config');
  form.addEventListener('submit', function(e) {
      e.preventDefault(); // don't submit
      
      var cacheBuster = JSON.parse(localStorage.cacheBuster);
      
      cacheBuster.css = document.getElementById('css').checked;
      cacheBuster.js = document.getElementById('js').checked;
      
      localStorage.cacheBuster = JSON.stringify(cacheBuster)
  })
});
