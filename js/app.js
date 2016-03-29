$(function() {

  $('.button-holder').on('click', 'button', function(e) {
    switch ($(this).text()) {     
      // when #menu-open button clicked, 
      case "Open Menu":
        //menu slides down 
        $('.dropdown').slideDown();
        $(this).text('Close Menu');
        break;
      case "Close Menu":
        // menu slides up
        $('.dropdown').slideUp();
        $(this).text('Open Menu');
        break;
      // when #add-to-list is pressed 
      case "Add to List":
        e.preventDefault();
        addToList($('#item-to-add').val(), $('#important').prop('checked'));
        $('#item-to-add').focus();
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