function addDataToTextarea(data) {

    // check if there is an existing table:
    var dataDivExisting = document.querySelector('div.imn-extension-copiable-results');
    if (dataDivExisting) {
        dataDivExisting.parentElement.removeChild(dataDivExisting);
    }

    var div = document.createElement('div'),
        textBox = document.createElement('textarea'),
        selectAllButton = document.createElement('button'),
        reportData = "";

    // comma-separated values and a new line for each record.
    for (var i = 0; i < data.length; i ++ ) {
        reportData = reportData + data[i].join() + "\n";
    }

    textBox.textContent = reportData;
    textBox.rows = data.length + 1;
    textBox.setAttribute('readonly', 'readonly');
    textBox.setAttribute('wrap', 'off');

    selectAllButton.className = 'imn-extension-select-all';
    selectAllButton.innerText = 'Select All Table Data';
    selectAllButton.addEventListener('click', selectAllText);

    div.className = "imn-extension-copiable-results";
    div.appendChild(textBox);
    div.appendChild(selectAllButton);

    document.body.insertBefore(div, document.body.children[4]);
}

function getDataFromTable() {
    var tableReport = document.querySelector('table#report').children[0],
        rows = tableReport.children,
        tableData = [];

    tableData.push([
        '"Status"',                 '"Recipient"',
        '"Recipient Operator"',     '"Sender"',
        '"Sender Operator"',        '"Tracking ID"',
        '"Requested DR"',           '"Message Type"',
        '"Time"',                   '"Retry Count"',
        '"UDH Headers"',            '"UDH Sent to Carrier/Aggregator"',
        '"Gateway Tracking ID"',    '"Site ID"',
        '"Site Tracking ID"',       '"Gateway Notification"',
        '"Cross Site Retry Count"', '"Replaced ShortCode"',
        '"Customer Tracking ID"'
    ]);

    for (var i = 0; i < rows.length; i++) {

        var row = rows[i], 
            rowClass = row.className,
            rowData  = [];

        if (/MsgSearchResultsRow/.test(rowClass)) {

            var columns = row.children;

            for (var j = 1; j < columns.length; j++) {

                var columnText = '"'+columns[j].innerText+'"';
                columnText = columnText.replace('\n', ' ');
                rowData.push(columnText);
            }
            tableData.push(rowData);
        }
    }
    return tableData;
}

function selectAllText() {
    document.querySelector('div.imn-extension-copiable-results textarea').select();
}


chrome.runtime.onMessage.addListener(function (msg, sender) {

    if (msg.text === 'get_table_data') {
        var tableData = getDataFromTable();
        addDataToTextarea(tableData);
    }
});