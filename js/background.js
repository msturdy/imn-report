

chrome.browserAction.onClicked.addListener(function (tab) {

    var imnUrl = "https://imn.syniverse.com/imn/MessageAction.do";

    if (tab.url === imnUrl) {
        chrome.tabs.sendMessage(tab.id, {text: 'get_table_data'});
    }
});