$(function() {

  $('.button-holder').on('click', 'button', function() {
    switch ($(this).text()) {
      
      // when #menu-open button clicked, 
      case "Add Item":
        //menu slides up/down 
        if ($('.dropdown').is(':visible')) {
          $('.dropdown').slideUp();
          $('#menu-open').css('background-color', '#FB9D0B');
        } else {
          $('.dropdown').slideDown();
          $(this).css('background-color', 'gray');
        }
        break;

      // when #add-to-list is pressed 
      case "Add to List":
        addToList($('#item-to-add').val(), $('#important').prop('checked'))
        break;
      // when #list-complete is pressed
      case "Done":
        // if there's a value, add it to the list
        if ($('#item-to-add').val() !== "") {
          addToList($('#item-to-add').val(), $('#important').prop('checked'))
        }
        // close menu
        $('.dropdown').slideUp();
        $('#menu-open').css('background-color', '#FB9D0B');
        break;
      // when delete is pressed, delete any staged
      case "Delete":

        console.log('deleting');
        break;
      default:
        console.log('no match');
    }
  })



  //when item pressed add to delete staging queue



});

function addToList(val, imp) {
  listHTML = '';
  // if important is ticked
  if (imp) {
    // add to top of the list
    listHTML += '<li class="imp-item">' + val + '</li>';
    $('.list').prepend(listHTML);
  // otherwise...
  } else {
    // build html
    listHTML += '<li class="item">' + val + '</li>';
    // check to see if there are already important items
    if ($('.list').children().hasClass('imp-item')) {
      // if so, append after last one
      $('.imp-item').last().after(listHTML);
    } else {
      // otherwise add to top
      $('.list').append(listHTML);
    }
  }
  // // clear text box, menu stays open
  $('#item-to-add').val('');
}