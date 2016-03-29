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
      // when delete is pressed
      case "Delete":
        // find items for deletion
        // remove them
        $('.complete').slideUp(500, function() {
          $(this).remove();
        });
        break;
      default:
        console.log('Mama?...sumthang goin wrong ere...');
    }
  });
  //when item pressed add to delete staging queue
  $('.list').on('click', 'li', function() {
    // check if already staged
    if ($(this).hasClass('imp-item') || $(this).hasClass('item')) {
      // var $item = $(this).clone().attr('class', 'complete');
      $(this).slideUp(500, function() {
        var $item = $(this).detach().attr('class', 'complete');
        $('.list').append($item);
        $('.list').children().last().slideDown();
      });
      // $item;
      // console.log($item);
      // 
      // 
    }
  });
});

function addToList(val, imp) {
  // check textbax has value
  if (val !== "") {
    listHTML = '';
    // if important is ticked
    if (imp) {
      // add to top of the list
      listHTML += '<li class="imp-item">' + val + '</li>';
      $('.list').prepend(listHTML);
      $('.imp-item:first').slideDown();
      $('#important').prop('checked', false);
    // otherwise...
    } else {
      // build html
      listHTML += '<li class="item">' + val + '</li>';
      // check to see if there are already important items
      if ($('.list').children().hasClass('imp-item')) {
        // if so, append after last one
        $('.imp-item').last().after(listHTML).slideDown();
        $('.item:first').slideDown();
      } else {
        // otherwise add to top
        $('.list').prepend(listHTML);
        $('.list li:first').slideDown();
      }
    }
  }
  // // clear text box, menu stays open
  $('#item-to-add').val('');
}