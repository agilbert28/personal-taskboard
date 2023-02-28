/**
 * The event handler triggered when editing the spreadsheet.
 * Adds Minute-Logging Functionality to Personal Taskboard.
 */
function onEdit() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var range = spreadsheet.getActiveRange();
  var col = range.getColumn();
  var cell = range.getDisplayValue();
  var value = parseFloat(cell.match('^[0-9,\.]*'));
  Logger.log('Column: ' + col)
  Logger.log('Display Value ' + cell)
  Logger.log('Value: ' + value);
  
  if (Number.isInteger((col-2.0)/3.0)) {
    if (cell.includes('m')) {
      value = parseInt(value);
      if (value == 1) {
        range.setNumberFormat('\"' + value + ' min\"');
        range.setValue(value/60.0);
      } else if(value >= 60) {
        range.setValue(Math.round(value/60.0*2.0)/2.0).toFixed(1);
      } else {
        range.setNumberFormat('\"' + value + ' mins\"');
        range.setValue(value/60.0);
      }
    } else if (!isNaN(value)) {
      range.setValue(value);
    } else {
      range.setValue(cell);
    }
  }
}