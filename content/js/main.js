;$(function() {

  $('#impress').on('impress:stepenter', function(ev) {
    var targetStep = ev.target;
    var swappedItems = $(targetStep).find('.array .swapped');

    // if (swappedItems.length)
    //   swapItems(swappedItems[0], swappedItems[1]);
  });

  function swapItems(item1, item2) {
    var animationMargin = 25; // nao passar em cima dos indices
    var delay = 500;

    item1 = $(item1);
    item2 = $(item2);
    var array = item1.parent();

    if (array.hasClass('ordered')) return;

    var items = array.children('li');

    var item1Idx = items.index(item1);
    var item2Idx = items.index(item2);
    var gap = items
      // pega os itens entre os itens a seren tricadis
      .slice(item1Idx + 1, item2Idx)
      // seleciona as larguras (com margem)
      .map(function(i, e) { return $(e).outerWidth(true); }).toArray()
      // soma o tamanho de todos eles
      .reduce(function(pValue, cValue) { return pValue + cValue; }, 0);

    item1.animate({
      top: item1.outerHeight() + animationMargin
    }, delay)
    .animate({
      left: item1.outerWidth(true) + gap
    }, delay)
    .animate({
      top: 0
    }, delay);

    item2.animate({
      bottom: item2.outerHeight() + animationMargin
    }, delay)
    .animate({
      right: item2.outerWidth(true) + gap
    }, delay)
    .animate({
      bottom: 0
    }, delay, function onAnimationComplete() {
      setTimeout(function(){
        var aux = item1.text();
        item1.text(item2.text());
        item2.text(aux);

        $(item1).add(item2).css({ top: 0, bottom: 0, left: 0, right: 0 });

        array.addClass('ordered');
      }, delay / 4);
    });
  }

  function generateArrays() {
    $('.array[data-items]').each(function() {
      var $el = $(this);

      var items = $el.data('items')
        .split(',')
        .map(function(el, idx) {
          var splitted = $.trim(el).split(':');
          var item = splitted[0];
          var li = $('<li>');

          switch(splitted[1]) {
            case 'h':
              li.addClass('highlighted');
              break;
            case 's':
              li.addClass('swapped');
              break;
          }

          return li.text(item);
        });
      
      $el.append(items);
    });
  }

  generateArrays();

  window.swapItems = swapItems;
}());
