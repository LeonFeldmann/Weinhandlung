$(document).ready(() => {
  loadWinzersIntoTable();
  $('#winzerTable').DataTable({
    scrollY: '350px',
    scrollCollapse: true,
    paging: false,
  });
});

function loadWinzersIntoTable() {
  // $.get(apiServerAddress + "/winzer", (data) => {

  var currentWinzer = {
    id: '12345',
    name: 'Maier',
    vorname: 'Marvin',
    email: 'marvin.maier@gmx.de',
    telefon: '028392839',
  };

  // later forEachloop over Array
  for (let i = 0; i < 10; i++) {
    $('#winzerTableBody').append(createWinzerTableEntry(currentWinzer));
  }

  // })
}

function createWinzerTableEntry(winzerObject) {
  let tableEntryHTML =
    '<tr>' +
    '<td>' +
    winzerObject.id +
    '</td>' +
    '<td>' +
    winzerObject.name +
    '</td>' +
    '<td>' +
    winzerObject.vorname +
    '</td>' +
    '<td>' +
    winzerObject.email +
    '</td>' +
    '<td>' +
    winzerObject.telefon +
    '</td>' +
    '<td data-toggle="modal" data-target="#winzerDetailsModalCenter" onclick="loadDetailsIntoModal(' +
    winzerObject.id +
    ')"><i class="fas fa-info"></i></td>';
  ('</tr>');

  return tableEntryHTML;
}

function loadDetailsIntoModal(winzerId) {
  //         $.get(apiServerAddress + "/winzer{id}", (data) => {

  // }

  var currentWinzer = {
    id: '12345',
    name: 'Maier',
    vorname: 'Marvin',
    email: 'marvin.maier@gmx.de',
    telefon: '028392839',
    straße: 'Bergstraße 5',
    plz: '71123',
    ort: 'Shire',
  };

  $('#winzerNameInput').val(currentWinzer.name);
  $('#winzerVornameInput').val(currentWinzer.vorname);
  $('#winzerEmailInput').val(currentWinzer.email);
  $('#winzerTelefonInput').val(currentWinzer.telefon);
  $('#winzerStraßeInput').val(currentWinzer.straße);
  $('#winzerPLZInput').val(currentWinzer.plz);
  $('#winzerOrtInput').val(currentWinzer.ort);
}

function loadAddToPurchaseListPopUp() {}
