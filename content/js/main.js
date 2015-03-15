;$(function() {
  $('#impress').on('impress:stepenter', function(ev) {
    var targetStep = $(ev.target);
    var swappedItems = targetStep.find('.array .swapped');

    if (targetStep.hasClass('auto')) {
      var delay = !!swappedItems.length ? 2000 : 1000;
      setTimeout(function() {
        var activeStep = $('.step.active')[0];
        // só muda sozinho se o step que iniciou o timeout
        // ainda estiver ativo
        if (ev.target == activeStep)
          impress().next();
      }, delay);
    }

    if (swappedItems.length)
      swapItems(swappedItems[0], swappedItems[1]);
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

    var items1And2 = $(item1).add(item2);
    // colocar itens acima dos outros enquanto se animam
    items1And2.css('z-index', 2);

    // pixels necessarios para chegar ao meio dos itens a serem trocados
    var halfWayWidth = (item1.outerWidth(true) + gap) / 2;
    item1.animate({
      top: item1.outerHeight(true) + animationMargin,
      left: halfWayWidth
    }, delay)
    .animate({
      left: halfWayWidth * 2,
      top: 0
    }, delay);

    var halfWayWidth = (item2.outerWidth(true) + gap) / 2;
    item2.animate({
      bottom: item2.outerHeight(true) + animationMargin,
      right: halfWayWidth
    }, delay)
    .animate({
      right: halfWayWidth * 2,
      bottom: 0
    }, delay, function onAnimationComplete() {
      setTimeout(function(){
        var aux = item1.text();
        item1.text(item2.text());
        item2.text(aux);

        // reseta tudo
        items1And2.css({
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          'z-index': 0
        });

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
