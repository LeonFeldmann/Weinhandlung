$(document).ready(() => {
  loadWinesIntoTable();

  /**
   * When the user does not enter correct input when adding or updating a wine,
   * a message will be displayed and the incorrect fields will be marked.
   * this function takes care of removing the message and the marking if the modal is closed
   * without completing the adding or updating action.
   */
  $('.modal').on('hidden.bs.modal', () => {
    $('.invalidInputMessageContainer').empty();
    $('input').removeClass('invalidInput');
  });
});

function loadWinesIntoTable() {
  let wineArray = [];

  $.get(`${apiServerAddress}/wine`, (data) => {
    wineArray = data;
    wineArray.forEach((wine) => {
      $('#wineTableBody').append(createWineTableEntry(wine));
    });

    // initialising bootstrap DataTable
    $('#wineTable').DataTable({
      scrollY: '350px',
      scrollCollapse: true,
      paging: false,
    });
  });
}

/**
 * function is called after adding, updating or deleting a wine.
 */
function reloadWinesTable() {
  $('#wineTable').DataTable().clear().draw();
  $('#wineTable').DataTable().destroy();
  loadWinesIntoTable();
}

/**
 * Function that builds the html for a row in the wines table.
 * Is called from the loadWinesIntoTable() function for every wine.
 * @param {WineObject} wineObject
 */
function createWineTableEntry(wineObject) {
  const tableEntryHTML = `<tr id="${wineObject.wineID}">
    <td>
    ${wineObject.name}
    </td>
    <td>
    ${wineObject.region}
    </td>
    <td>
    ${wineObject.vintage}
    </td>
    <td>
    ${wineObject.quantity}
    </td>
    <td data-toggle="modal" data-target="#wineDetailsModal" onclick="loadDetailsIntoModal(${wineObject.wineID})"><i class="fas fa-info"></i>
    </td>
    <td data-toggle="modal" data-target="#addToPurchaseListModal" onclick="loadDetailsIntoPurchaseListModal(${wineObject.wineID})"><i class="far fa-plus-square"></i>
    </td>
  </tr>`;

  return tableEntryHTML;
}

/**
 * Function that is triggered when the user clicks on the details field
 * for a particular wine. Fetches the details from the server and displays
 * them in a modal.
 * @param {int} wineId
 */
function loadDetailsIntoModal(wineId) {
  $.get(`${apiServerAddress}/wine/${wineId}`, (wineData) => {
    $('#wineDetailsModalLongTitle').text(wineData.name);
    $('#wineIDField').text(wineData.wineID);
    $('#wineNameInput').val(wineData.name);
    $('#wineRegionInput').val(wineData.region);
    $('#wineLocationInput').val(wineData.location);
    $('#wineOriginCountryInput').val(wineData.originCountry);
    $('#wineYearInput').val(wineData.vintage);
    $('#wineAmountInput').val(wineData.quantity);
    $('#wineBuyingPriceInput').val(wineData.buyingPrice);
    $('#wineSellingPriceInput').val(wineData.sellingPrice);
    $('#wineStorageLocationInput').val(wineData.storageID);
  });

  /**
   * click listeners have to be removed before creating them.
   * Otherwise multiple listeners created if several modals loaded.
   */
  $('#deleteWineButton').off();
  $('#deleteWineButton').on('click', () => {
    deleteWine(wineId);
  });
  $('#updateWineButton').off();
  $('#updateWineButton').on('click', () => {
    updateWine(wineId);
  });
}

/**
 * This function is only for demo purposes. It is not implemented with real data and
 * just uses hard coded data to display how the functionality would look like
 * @param {int} wineId
 */
function loadDetailsIntoPurchaseListModal(wineId) {
  const currentWine = {
    id: '12345',
    amount: 10,
    name: 'Guter Roter',
    year: 2018,
    origin: 'Germany',
    region: 'Baden',
    buyingPrice: 5.1,
    sellingPrice: 10.5,
    storageLocation: 'R125',
    picture: Blob,
  };

  $('#wineNameField').text(currentWine.name);
  $('#wineAmountPurchaseList').val(1);
  $('#customerSelected').text($('#dropdown-1').text());
}

function addNewWine() {
  const newWineData = {
    name: '',
    quantity: -1,
    description: '',
    vintage: -1,
    location: '',
    originCountry: '',
    region: '',
    buyingPrice: -1,
    sellingPrice: -1,
    storageID: '',
    image: 'N/A',
  };

  newWineData.name = $('#newWineNameInput').val();
  newWineData.quantity = parseInt($('#newWineAmountInput').val(), 10);
  newWineData.description = $('#newWineAmountInput').val();
  newWineData.vintage = parseInt($('#newWineYearInput').val(), 10);
  newWineData.location = $('#newWineLocationInput').val();
  newWineData.originCountry = $('#newWineOriginCountryInput').val();
  newWineData.region = $('#newWineRegionInput').val();
  newWineData.buyingPrice = parseFloat($('#newWineBuyingPriceInput').val());
  newWineData.sellingPrice = parseFloat($('#newWineSellingPriceInput').val());
  newWineData.storageID = $('#newWineStorageLocationInput').val();
  newWineData.image = 'a nice image';

  const inputValidationMessage = validateInput(newWineData);

  if (inputValidationMessage === 'valid') {
    const settings = {
      url: `${apiServerAddress}/wine`,
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(newWineData),
    };

    $.ajax(settings).done((response) => {
      if (response === 'Entry was created') {
        reloadWinesTable();
      }
    });
    $('#wineAddModal').modal('toggle');
  } else {
    /**
     * else is run if some input is not valid.
     * A message will be displayed to the user and he can correct his mistake.
     */
    $('.invalidInputMessageContainer').empty();
    $('.invalidInputMessageContainer').append(inputValidationMessage);
  }
}

function updateWine(wineID) {
  const updateWineData = {
    wineID,
    name: '',
    quantity: -1,
    description: '',
    vintage: -1,
    location: '',
    originCountry: '',
    region: '',
    buyingPrice: -1,
    sellingPrice: -1,
    storageID: '',
    image: 'N/A',
  };
  updateWineData.name = $('#wineNameInput').val();
  updateWineData.quantity = parseInt($('#wineAmountInput').val(), 10);
  updateWineData.description = $('#updateWineDataAmountInput').val();
  updateWineData.vintage = parseInt($('#wineYearInput').val(), 10);
  updateWineData.location = $('#wineLocationInput').val();
  updateWineData.originCountry = $('#wineOriginCountryInput').val();
  updateWineData.region = $('#wineRegionInput').val();
  updateWineData.buyingPrice = parseFloat($('#wineBuyingPriceInput').val());
  updateWineData.sellingPrice = parseFloat($('#wineSellingPriceInput').val());
  updateWineData.storageID = $('#wineStorageLocationInput').val();
  updateWineData.image = 'a nice image';

  const inputValidationMessage = validateInput(updateWineData);

  if (inputValidationMessage === 'valid') {
    const settings = {
      url: `${apiServerAddress}/wine/${wineID}`,
      method: 'PUT',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(updateWineData),
    };

    $.ajax(settings).done((response) => {
      if (response === 'Successful update') {
        reloadWinesTable();
      }
    });
    $('#wineDetailsModal').modal('toggle');
  } else {
    /**
     * else is run if some input is not valid.
     * A message will be displayed to the user and he can correct his mistake.
     */
    $('.invalidInputMessageContainer').empty();
    $('.invalidInputMessageContainer').append(inputValidationMessage);
  }
}

function deleteWine(wineID) {
  const settings = {
    url: `${apiServerAddress}/wine/${wineID}`,
    method: 'DELETE',
    timeout: 0,
  };

  $.ajax(settings).done((response) => {
    // Displaying error message not implemented yet.
    if (response === 'Successful delete') {
      reloadWinesTable();
      $('#wineDetailsModal').modal('toggle');
    }
  });
}

/**
 * Function for purchase list modal. Not implemented yet.
 */
function updateCustomerSelected() {
  const newCustomerId = event.target.id;
  const newCustomerName = $(`#${newCustomerId}`).text();
  $('#customerSelected').text(newCustomerName);
}

/**
 * Function that checks whether the user input is valid.
 * If not, a message will be displayed and the incorrect field will be marked.
 * @param {wineObject} newWine
 */
function validateInput(newWine) {
  $('input').removeClass('invalidInput');
  let invalidInputMessage = '';

  if (newWine.name === '') {
    $('#newWineNameInput').addClass('invalidInput');
    invalidInputMessage
      += '<p class="invalidInputMessage">Bitte tragen Sie einen Namen für den Wein ein</p>';
  }
  if (newWine.region === '') {
    $('#newWineRegionInput').addClass('invalidInput');
    invalidInputMessage
      += '<p class="invalidInputMessage">Bitte tragen Sie eine Region für den Wein ein</p>';
  }
  if (newWine.location === '') {
    $('#newWineLocationInput').addClass('invalidInput');
    invalidInputMessage
      += '<p class="invalidInputMessage">Bitte tragen Sie eine Lage für den Wein ein</p>';
  }
  if (newWine.originCountry === '') {
    $('#newWineOriginCountryInput').addClass('invalidInput');
    invalidInputMessage
      += '<p class="invalidInputMessage">Bitte tragen Sie ein Herkunftsland für den Wein ein</p>';
  }

  if (newWine.vintage === '-1') {
    $('#newWineYearInput').addClass('invalidInput');
    invalidInputMessage
      += '<p class="invalidInputMessage">Bitt tragen Sie den Jahrgang des Weines ein</p>';
  } else if (!Number.isInteger(newWine.vintage)) {
    $('#newWineYearInput').addClass('invalidInput');
    invalidInputMessage
      += '<p class="invalidInputMessage">Der Jahrgang muss eine Zahl sein</p>';
  }

  if (!isDecimal(newWine.buyingPrice)) {
    $('#newWineBuyingPriceInput').addClass('invalidInput');
    invalidInputMessage
      += '<p class="invalidInputMessage">Der EinkaufsPreis muss eine Dezimalzahl sein</p>';
  }

  if (!isDecimal(newWine.sellingPrice)) {
    $('#newWineSellingPriceInput').addClass('invalidInput');
    invalidInputMessage
      += '<p class="invalidInputMessage">Der Verkaufspreis muss eine Dezimalzahl sein</p>';
  }

  if (newWine.quantity === '-1') {
    $('#newWineAmountInput').addClass('invalidInput');
    invalidInputMessage
      += '<p class="invalidInputMessage">Bitte tragen Sie die Anzahl der Flaschen für den Wein ein</p>';
  } else if (!Number.isInteger(newWine.quantity)) {
    $('#newWineAmountInput').addClass('invalidInput');
    invalidInputMessage
      += '<p class="invalidInputMessage">Die Anzahl muss eine Zahl sein</p>';
  }

  if (newWine.storageID === '') {
    $('#newWineStorageLocationInput').addClass('invalidInput');
    invalidInputMessage
      += '<p class="invalidInputMessage">Bitte tragen Sie den Lagerort für den Wein ein</p>';
  }

  if (invalidInputMessage === '') {
    return 'valid';
  }
  return invalidInputMessage;
}

function isDecimal(inputNumber) {
  const inputString = `${inputNumber}`;
  const decimal = '^(-?)(0|([1-9][0-9]*))(\\.[0-9]+)?$';
  if (inputString.match(decimal)) {
    return true;
  }
  return false;
}
