function checkNetwork() {
    if (!navigator.onLine) {
        window.location.href = "/offline.html";
    }
}

checkNetwork();

window.addEventListener('offline', function() {
    window.location.href = "/offline.html";
});