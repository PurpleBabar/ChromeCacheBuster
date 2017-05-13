document.addEventListener("DOMContentLoaded", function(event) {
    if (localStorage["cacheBusterCss"] == 'true') {
        document.getElementById('css').checked = localStorage["css"];
    }
    if (localStorage["cacheBusterJs"] == 'true') {
        document.getElementById('js').checked = localStorage["js"];
    }

    var form = document.getElementById('config');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // don't submit
        localStorage["cacheBusterCss"] = document.getElementById('css').checked;
        localStorage["cacheBusterJs"] = document.getElementById('js').checked;
    })
});
