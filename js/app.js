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
        listHTML = '';
        // check for important
        if ($('#important').prop('checked')) {
        // create html
          listHTML += '<li class="imp-item">';
          listHTML += $('#item-to-add').val() + '</li>';
          $('.list').prepend(listHTML);
        } else {
          listHTML += '<li class="item">';
          listHTML += $('#item-to-add').val() + '</li>';
        }
        // clear text box, menu stays open
        $('#item-to-add').val('');
        

        break;
      case "Done":
        console.log('list complete');
        break;
      case "Delete":
        console.log('deleting');
        break;
      default:
        console.log('no match');
    }
  })



    // when .list-complete is pressed - checks for value (if blank, don't add) - close menu



  //when item pressed add to delete staging queue


  // when delete is pressed, delete any staged

});