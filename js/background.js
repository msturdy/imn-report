

chrome.browserAction.onClicked.addListener(function (tab) {

    var imnUrl = "https://imn.syniverse.com/MessageAction.do";

    if (tab.url === imnUrl) {
        chrome.tabs.sendMessage(tab.id, {text: 'get_table_data'});
    }
});