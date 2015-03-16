;$(function() {
  var classMap = {
    'h': 'highlighted',
    's': 'swapped',
    'o': 'ordered',
    'p': 'pivot',
    'b': 'blurred',
    'm': 'moved'
  };
  var defaultAnimationDelay = 500;

  $('#impress').on('impress:stepenter', function(ev) {
    var targetStep = $(ev.target);
    var arrayEl = targetStep.find('.array');
    var swappedItems = arrayEl.find('.swapped');
    var movedItem = arrayEl.find('.moved');

    if (targetStep.hasClass('auto')) {
      var delay = !!(swappedItems.length || movedItem.length) ? 2000 : 1000;
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
    if (movedItem.length)
      moveItem(movedItem[0], arrayEl.data('targetIndex'));
  });

  $(document).on('click', '#step-nav li a', function(ev) {
    var liClass = $(ev.target).parent().attr('class');
    impress()[liClass]()
    return false;
  });

  function swapItems(item1, item2) {
    var animationMargin = 25; // nao passar em cima dos indices

    item1 = $(item1);
    item2 = $(item2);
    var arrayEl = item1.parent();

    if (arrayEl.hasClass('swap-done')) return;

    var items = arrayEl.children('li');

    var item1Idx = items.index(item1);
    var item2Idx = items.index(item2);
    var gap = getItemDistanceWidth(arrayEl, item1Idx, item2Idx);

    var items1And2 = $(item1).add(item2);
    // colocar itens acima dos outros enquanto se animam
    items1And2.css('z-index', 2);

    // pixels necessarios para chegar ao meio dos itens a serem trocados
    var halfWayWidth = (item1.outerWidth(true) + gap) / 2;
    item1.animate({
        top: item1.outerHeight(true) + animationMargin,
        left: halfWayWidth
      }, defaultAnimationDelay)
      .animate({
        left: halfWayWidth * 2,
        top: 0
      }, defaultAnimationDelay);

    var halfWayWidth = (item2.outerWidth(true) + gap) / 2;
    item2.animate({
        bottom: item2.outerHeight(true) + animationMargin,
        right: halfWayWidth
      }, defaultAnimationDelay)
      .animate({
        right: halfWayWidth * 2,
        bottom: 0
      }, defaultAnimationDelay, function onAnimationComplete() {
        setTimeout(function(){
          if(item1.hasClass('pivot')) {
            item2.addClass('pivot');
            item1.removeClass('pivot');
          } else if(item2.hasClass('pivot')) {
            item1.addClass('pivot');
            item2.removeClass('pivot');
          }

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

          arrayEl.addClass('swap-done');
        }, defaultAnimationDelay / 4);
      });
  }

  function moveItem(item, position) {
    var animationMargin = 25; // nao passar em cima dos indices

    item = $(item);
    var arrayEl = item.parent();
    if (arrayEl.hasClass('move-done')) return;

    var items = arrayEl.find('li');
    var itemIdx = items.index(item);
    var itemsToMove = [],
      gap = 0;

    var moveDelta = position - itemIdx;
    // se moveDelta for positivo, o item vai mover pra direita, se não vai pra
    // esq (se 0 ele deve ficar onde está)
    if (moveDelta == 0)
      return;
    else if (moveDelta > 0) {
      itemsToMove = items.slice(itemIdx + 1, position + 1);
      gap = getItemDistanceWidth(arrayEl, itemIdx + 1, position + 1);
    } else {
      gap = getItemDistanceWidth(arrayEl, position, itemIdx);
      itemsToMove = items.slice(position, itemIdx);
    }

    item.css('z-index', 1);

    itemsToMove.animate({
      left: moveDelta > 0 ? -item.outerWidth(true) : item.outerWidth(true)
    }, defaultAnimationDelay * 2); // multiply by 2 because of the other element

    var halfWayWidth = (item.outerWidth(true) + gap) / 2;
    item.animate({
      top: item.outerHeight(true) + animationMargin,
      right: moveDelta > 0 ? -halfWayWidth : halfWayWidth
    }, defaultAnimationDelay)
    .animate({
      right: halfWayWidth * (moveDelta > 0 ? -2 : 2),
      top: 0
    }, defaultAnimationDelay, function onAnimationComplete() {
      setTimeout(function(){
        // reset positions
        itemsToMove.css('left', 0);
        item.css({
          'z-index': 0,
          right: 0
        });

        // insert item at correct position
        if (moveDelta > 0)
          item.insertAfter(items.eq(position));
        else
          item.insertBefore(items.eq(position));

        arrayEl.addClass('move-done');
      }, defaultAnimationDelay / 4);
    });
  }

  function getItemDistanceWidth(arrayElement, fromIdx, toIdx) {
    return arrayElement.children('li')
      // pega os itens ENTRE os itens a serem trocados
      .slice(fromIdx + 1, toIdx)
      // seleciona as larguras (com margem)
      .map(function(i, e) { return $(e).outerWidth(true); }).toArray()
      // soma a largura de todos eles
      .reduce(function(pValue, cValue) { return pValue + cValue; }, 0);
  }

  function generateArrays() {
    $('.array[data-items]').each(function() {
      var $el = $(this);

      var items = $el.data('items')
        .split(',')
        .map(function(el, idx) {
          var valueAndFlags = $.trim(el).split(':');
          var item = valueAndFlags[0];
          var li = $('<li>');

          // se tem alguma flag...
          if (valueAndFlags[1]) {
            valueAndFlags[1].split('').forEach(function(item) {
              li.addClass(classMap[item]);
            });
          }

          return li.text(item);
        });

      $el.append(items);
    });
  }

  generateArrays();

  window.swapItems = swapItems;
}());
