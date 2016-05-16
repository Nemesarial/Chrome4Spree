console.log(chrome.storage)

// Saves options to chrome.storage.sync.
function save_options() {
    var enable_github_integration = document.getElementById('enable_github_integration').checked;
    chrome.storage.sync.set({
        enable_github_integration: enable_github_integration
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        enable_github_integration: true
    }, function (items) {
        document.getElementById('enable_github_integration').checked = items.enable_github_integration;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click', save_options);