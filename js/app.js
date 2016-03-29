var toDelete = [];

$(function() {
  $('.button-holder').on('click', 'button', function(e) {
    switch ($(this).text()) {     
      // when #menu-open button clicked, 
      case "Open Menu":
        // animate hr
        $this = $(this);
        $('hr').animate({ 
          width: '78%'
          // 'margin-left': "11%"
        }, 200, function() {
          //menu slides down
          $('.dropdown').slideDown();
          $($this).text('Close Menu');
          $('#item-to-add').focus();
        });
        break;
      case "Close Menu":
        // menu slides up
        $(this).text('Open Menu');
        $('.dropdown').slideUp(200, function() {
          $('hr').animate({
            width: '3%'
            // 'margin-left': '50%'
          }, 200);
        });
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
        // clear toDelete array
        toDelete = [];
        break;
      default:
        console.log('Mama?...sumthang goin wrong ere...');
    }
  });
  //when item pressed add to delete staging queue
  $('.list').on('click', 'li', function() {
    // check if already staged
    if ($(this).hasClass('imp-item') || $(this).hasClass('item')) {
      // create an object holding cuttent properties for 'undeletion'
      var imp = $(this).hasClass('imp-item');
      var props = {name: $(this).text(), important: imp};
      toDelete.push(props);
      // remove and add to the bottom of the list
      $(this).slideUp(500, function() {
        var $item = $(this).detach().attr('class', 'complete');
        $('.list').append($item);
        $('.list').children().last().slideDown();
      });
      // if item is already complete - add back
    } else if ($(this).hasClass('complete')) {
      var item;
      for (var i = 0; i < toDelete.length; i++) {
        if (toDelete[i].name === $(this).text()) {
          item = toDelete[i];
          toDelete.splice(i,1);
        }
      }
      $(this).slideUp();
      addToList(item.name, item.important);
    }
  });
});

// function addToList(val, imp)
  function addToList(val) {
  // check textbax has value
  if (val !== "") {
    var imp = val[val.length - 1] === "!" ? true : false;
    // create element to escape HTML tags
    var itemText = document.createTextNode(val);
    var listEl = document.createElement('li');
    listEl.appendChild(itemText);
    // if important is ticked
    if (imp) {
      // add to top of the list
      listEl.className = 'imp-item';
      $('.list').prepend(listEl);
      $('.imp-item:first').slideDown();
      $('#important').prop('checked', false);
    // otherwise...
    } else {
      // build html
      listEl.className = 'item';
      // check to see if there are already important items
      if ($('.list').children().hasClass('imp-item')) {
        // if so, append after last one
        $('.imp-item').last().after(listEl).slideDown();
        $('.item:first').slideDown();
      } else {
        // otherwise add to top
        $('.list').prepend(listEl);
        $('.list li:first').slideDown();
      }
    }
  }
  // clear text box, menu stays open
  $('#item-to-add').val('');
}