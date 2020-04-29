$(document).ready(() => {
  $('#currentPurchaseListTable').DataTable({
    scrollY: '350px',
    scrollCollapse: true,
    paging: false,
    searching: false,
  });

  $('.customerListEntry').on('click', (event) => {
    let clickedId = event.target.id;

    $('.customerListEntry').removeClass('selected');
    $(event.target).addClass('selected');
  });
});
