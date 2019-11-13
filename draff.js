
/*
- Get the closest matching element up the DOM tree.

https://api.jquery.com/closest/#closest-selector
https://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
*/
let $collapser;
let $allCollapseBtn;
let isCollapserFocusin = false;
let dataTransition;

let navCollapser = {
  $collapser: null,
  $allCollapseBtn: null,
  dataTransition: null
}

let navCollapser = {
  searchFormMobile: {
    $collapser: null,
    $allCollapseBtn: null,
    dataTransition: null,
  },
  navbarListMobile: {
    $collapser: null,
    $allCollapseBtn: null,
    dataTransition: null,
  },
  dropdownCategoryMobile: {
    $collapser: null,
    $allCollapseBtn: null,
    dataTransition: null,
  }
}

function ebookWidth() {
  /*
  - JQuery: $(window).width()
  */
  return document.documentElement.offsetWidth;
}

$('.nav-container').on('click', toggleCollapser);
$(document).on('focusout', focusOutCollapser);

function eventHandler(event) {
  
}


function toggleCollapser(event) {
  event.stopPropagation();
  event.preventDefault();
  
  console.log('collapser click first', $collapser);
  const $target = $(event.target); // <svg>
  const a = $(event.target);
  console.log('8888', a);
  /*
    $target = <svg> element
  */
   
  /* -  target Button must have
  + data-toggle ="dropdown-toggle"   // it's custom collapse
  + data-target ="#id"
  + aria-expanded= "false"
     - collapser is collapsed
  + class="dropdown-menu"
  + id="id"
  + aria-expanded
  */
  console.log('target-click', $target);

  const $button = $target.closest(`[data-toggle="e-collapse"]`);

  if ($button.length) {
    const targetId = $button.attr('data-target');
    dataTransition = $button.attr('data-transition');
    
    $collapser = $(targetId);

    $allCollapseBtn = $(`[data-target="${targetId}"]`);
    
    if ($collapser.hasClass('e-collapse')) { 
      // toggle transition
      console.log('dataTransition', dataTransition);

      $collapser.toggleClass(dataTransition).focus();

      console.log('collapser', $collapser);
      const ariaExpanded = $button.attr('aria-expanded');

      // flat indicate that 
      isCollapserFocusin = !isCollapserFocusin;
      console.log('isCollapserFocusin',isCollapserFocusin);

      if (ariaExpanded === 'false') {
        $allCollapseBtn.attr('aria-expanded', 'true');
        $collapser.attr('aria-expanded', 'true');
      } else if (ariaExpanded === 'true') {
        $allCollapseBtn.attr('aria-expanded', 'false');
        $collapser.attr('aria-expanded', 'false');
      }

      /* UX design
        - when user click on searchBtn 
        => input field have blinking cursor
      */
      /* 
      - $collapser has { search input }
      - using .children() only travels a single level down the DOM tree
      */
      const $searchField = $collapser.children('input[type="search"]');
      if ($searchField) {
        $searchField.focus();
      }
    }
  } else {
  }
}

function focusOutCollapser() {
    event.stopPropagation();
    event.preventDefault();

    console.log('target focusout', event.target);
    console.log('collapser focusout', $collapser);

    const $target = $(event.target);

    console.log('dk1', $collapser.has($target).length);
    console.log('dk2', $target.is($collapser));

    if (!$target.closest($collapser).length && !$target.is($collapser)) {
      console.log('laallalalalla');

      $collapser.removeClass(dataTransition);
      $collapser.attr('aria-expanded', 'false');
      $allCollapseBtn.attr('aria-expanded', 'false');    
    }
  }
  

  function func() {
    /* mobile device
    
    */
    if (ebookWidth() < 992) {

    }
  }

