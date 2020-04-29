$(document).ready(() => {
  loadCustomersIntoTable();
  $('#customerTable').DataTable({
    scrollY: '350px',
    scrollCollapse: true,
    paging: false,
  });
});

function loadCustomersIntoTable() {
  let customerArray = [];

  $.get(apiServerAddress + '/customer', (data) => {
    customerArray = data;
    customerArray.forEach((customer) => {
      $('#customerTableBody').append(createCustomerTableEntry(customer));
    });
  });
}

function createCustomerTableEntry(customerObject) {
  let tableEntryHTML =
    '<tr>' +
    '<td>' +
    customerObject.customerID +
    '</td>' +
    '<td>' +
    customerObject.lastName +
    '</td>' +
    '<td>' +
    customerObject.firstName +
    '</td>' +
    '<td>' +
    customerObject.email +
    '</td>' +
    '<td>' +
    customerObject.telefone +
    '</td>' +
    '<td data-toggle="modal" data-target="#customerDetailsModalCenter" onclick="loadDetailsIntoModal(' +
    customerObject.customerID +
    ')"><i class="fas fa-info"></i></td>';
  ('</tr>');

  return tableEntryHTML;
}

function loadDetailsIntoModal(customerId) {
  //         $.get(apiServerAddress + "/customer{id}", (data) => {

  // }

  var currentCustomer = {
    id: '12345',
    name: 'Maier',
    vorname: 'Marvin',
    email: 'marvin.maier@gmx.de',
    telefon: '028392839',
    straße: 'Bergstraße 5',
    plz: '71123',
    ort: 'Shire',
  };

  $('#customerNameInput').val(currentCustomer.name);
  $('#customerVornameInput').val(currentCustomer.vorname);
  $('#customerEmailInput').val(currentCustomer.email);
  $('#customerTelefonInput').val(currentCustomer.telefon);
  $('#customerStraßeInput').val(currentCustomer.straße);
  $('#customerPLZInput').val(currentCustomer.plz);
  $('#customerOrtInput').val(currentCustomer.ort);
}

function loadAddToPurchaseListPopUp() {}
