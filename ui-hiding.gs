/**
 * Adds Hide Toggle UI to Taskboard.
 * The event handler triggered when opening the spreadsheet.
 * @see https://developers.google.com/apps-script/guides/triggers#onopene
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Toggle Hide')
    .addItem('Last Week', 'lastWeek')
    .addItem('Season', 'season')
    .addItem('Personal Row', 'personalRow')
    .addToUi();
}

/**
 * Toggle Hides Last Week's Log for Week-to-Week Comparison.
 */
function lastWeek() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheets()[0];

  var currentDate = new Date();
  var startDate = new Date();
  var startDate = sheet.getRange('C2').getValue();
  var days = Math.floor((currentDate - startDate) /
      (24 * 60 * 60 * 1000));
  
  var weekNum = Math.floor(days / 7);
  var col = 3 * weekNum;

  if (col > 0) {
    if (sheet.isColumnHiddenByUser(col)) {
      sheet.showColumns(col, 3);
      sheet.setActiveRange(sheet.getRange(4, col));
    } else {
      sheet.hideColumns(col, 3);
    }
  }
  
}

/**
 * Toggle Hides The Entire Season except for the Current
 * Week for Default and Seasonal Views.
 */
function season() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheets()[0];

  var currentDate = new Date();
  var startDate = new Date();
  var startDate = sheet.getRange('C2').getValue();
  var days = Math.floor((currentDate - startDate) /
      (24 * 60 * 60 * 1000));
  
  var weekNum = Math.floor(days / 7);
  var col = 3 * weekNum;
  Logger.log(col);

  if (col > 0) {
    if (sheet.isColumnHiddenByUser(col)) {
      sheet.showColumns(3, col);
      sheet.setActiveRange(sheet.getRange(4, 3));
    } else {
      sheet.hideColumns(3, col);
    }
  }
}

/**
 * Toggle Hides the Personal Row for Privacy.
 */
function personalRow() {
  var personalRow = 7;

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheets()[0];
  if (sheet.isRowHiddenByUser(personalRow)) {
    sheet.showRows(personalRow);
  } else {
    sheet.hideRows(personalRow);
  }
}
