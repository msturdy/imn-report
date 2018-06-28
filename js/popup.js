
function getCurrentTabUrl(callback) {
    var queryInfo = {
      active: true,
      currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0];
        var url = tab.url;
        console.assert(typeof url == 'string', 'tab.url should be a string');
        callback(url);
    });
}


document.addEventListener('DOMContentLoaded', function() {

    getCurrentTabUrl(function(url){
        if (url === "https://imn.syniverse.com/MessageAction.do") {
            chrome.tabs.sendMessage(tab.id, {text: 'table_data'}, processTableData);
            var reportData = window.document.querySelector('table#report');
        }
        else {
            console.log("IMN tool only runs on IMN pages.");
        }
    });
});