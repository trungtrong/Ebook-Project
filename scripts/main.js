
/*
- Get the closest matching element up the DOM tree.

https://api.jquery.com/closest/#closest-selector
https://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
*/
  /*
    For Mobile
  */

  let nav = {
    $collapser: null,
    $allCollapseBtn: null,
    dataTransition: null
  }

  let dropdown = {
    $container: null,
    $dropdownList: null,
    $allCollapseBtn: null,
    dataTransition: null
  }

  let searchForm = {
    $container: null,
    $form: null,
    dataTransition: null
  }

  const $searchBtn = $('.toggle-search');
  const $menuBtn = $('.toggle-menu');
  const $dropdownMobile = $('.toggle-dropdown');
  const $dropdownDesktop = $('.dropdown');

  // $(document).on('click', toggleCollapser);
  $(document).on('mouseup', focusout);

  $searchBtn.on('click', toggleSearchForm);
  
  $menuBtn.on('click', {
    "data-toggle": "e-collapse"
  }, toggleCollapser);

  $dropdownMobile.on('click', toggleDropdownMobile);
  
  $dropdownDesktop.on('mouseenter', openDropdown);
  $dropdownDesktop.on('mouseleave', closeDropdown);

  function ebookWidth() {
    /* - JQuery: $(window).width() */
    return document.documentElement.offsetWidth;
  }

  /*----------------------------------------------- */
  function toggleSearchForm(event) {
    const targetId = $(this).attr('data-target');
    
    const $form = $(targetId);
    searchForm.$form = $form;

    const dataTransition = 'search-form-transition';
    $form.toggleClass(dataTransition);
    searchForm.dataTransition = dataTransition;
    /*
      - find { search-form-container } to add focusout effect
    */

    searchForm.$container = $form.closest('[aria-label="search-form-container"]');

    /* UX design
      - when user click on searchBtn 
      => input field have blinking cursor
    */
    /* 
    - $form has { search input }
    - using .children() only travels a single level down the DOM tree
    */
    const $searchField = $form.children('input[type="search"]');
    $searchField.focus();
  }

  function toggleDropdownMobile(event) {
    const targetId = $(this).attr('data-target');

    const $dropdownList = $(targetId);
    dropdown.$dropdownList = $dropdownList;

    const dataTransition = 'dropdown-container-transition';

    $dropdownList.toggleClass(dataTransition);

    dropdown.dataTransition = dataTransition;

    dropdown.$container = $dropdownList.closest('[aria-label="dropdown-container"]');

    const ariaExpanded = $(this).attr('aria-expanded');
    ariaExpanded === 'false' ? $(this).attr('aria-expanded', 'true')
          : $(this).attr('aria-expanded', 'false');

  }

  function toggleCollapser(event) {
    const dataToggle = event.data["data-toggle"];

    const $target = $(event.target); // <svg>
    /* $target = <svg> element */
    /* -  target Button must have
    + data-toggle ="e-toggle"   // it's custom collapse
    + data-target ="#id"
    + aria-expanded= "false"
       - collapser is collapsed
    + class="dropdown-menu"
    + id="id"
    + aria-expanded
    */
    const $button = $target.closest(`[data-toggle="${dataToggle}"]`);

    if ($button.length) {
        onToggle($button, nav);
    }
  }

  function onToggle($button, object) {
    const targetId = $button.attr('data-target');
    object.dataTransition = $button.attr('data-transition');
    
    object.$collapser = $(targetId);

    object.$allCollapseBtn = $(`[data-target="${targetId}"]`);
    
    object.$collapser.toggleClass(object.dataTransition);

    const ariaExpanded = $button.attr('aria-expanded');

    if (ariaExpanded === 'false') {
      object.$allCollapseBtn.attr('aria-expanded', 'true');
      object.$collapser.attr('aria-expanded', 'true');
    } else if (ariaExpanded === 'true') {
      object.$allCollapseBtn.attr('aria-expanded', 'false');
      object.$collapser.attr('aria-expanded', 'false');
    }
  }

  function focusout(event) {
    const $target = $(event.target);
    /* 
    - In mobile, when dropdownMobile is open 
      =>  dropdown is over the nav
      =>  we make dropdown in the order of priority 
    */
    if (dropdown.$dropdownList) {
      if (!$target.closest(dropdown.$container).length && !$target.is(dropdown.$container)) {
        dropdown.$dropdownList.removeClass(dropdown.dataTransition);
        dropdown = {};
        return;
      }
    }

    if (nav.$collapser) {
      if (!$target.closest(nav.$collapser).length && !$target.is(nav.$collapser)) {
        hideCollapser(nav);
        nav = {};
        return;
      }
    }

    if (searchForm.$container) {     
      if (!$target.closest(searchForm.$container).length && !$target.is(searchForm.$container)) {
        searchForm.$form.removeClass(searchForm.dataTransition);
        searchForm = {};
        return;
      }
    }
  }

  function hideCollapser(object) {
    object.$collapser.removeClass(object.dataTransition);
    object.$collapser.attr('aria-expanded', 'false');
    object.$allCollapseBtn.attr('aria-expanded', 'false');    
  }

    /*
  - mouseenter and mouseleave dropdown 
  */

  function openDropdown(event) {
    const $dropdownBtn = $(this).find('[data-toggle="dropdown"]');

    const targetId = $dropdownBtn.attr('id');
    const $dropdownMenu = $(`[aria-labelledby="${targetId}"]`);
    
    $dropdownMenu.addClass('show');
    $(this).addClass('show');
    $dropdownBtn.attr('aria-expanded', 'true');
  }

  function closeDropdown(event) {
    const $dropdownBtn = $(this).find('[data-toggle="dropdown"]');
    const targetId = $dropdownBtn.attr('id');

    const $dropdownMenu = $(`[aria-labelledby="${targetId}"]`);
    
    $dropdownMenu.removeClass('show');
    $(this).removeClass('show');
    $dropdownBtn.attr('aria-expanded', 'false');
  }

