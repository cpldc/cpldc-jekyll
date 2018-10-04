
// when the page is finished loading:
    // show/hide sidebar buttons are active
    var viewportWidth = $(window).width();
    $( document ).ready(function() {
		$('.search-input').keypress(function(e){
			if(e.keyCode==13)
                searchContent(this);
		});
        console.log( "ready!" );
        $( "#hideSidebar" ).click(function() {
            hideSidebar();
        });
        $( "#showSidebar" ).click(function() {
            showSidebar();
        });
        if (viewportWidth < 976 ){
            userShrinksWindow();
        }
        if (viewportWidth > 976 ){
            userExpandsWindow();
        }
    });
    function mainContainerSidePadding(modifier) {
        if (modifier === 'shrinkContent' && !($('.main-container').hasClass('fixed'))){
            $('.main-container').addClass('main-container-narrow', 100).removeClass('main-container-wide');
        } else if (modifier === 'enlargeContent' && !($('.main-container').hasClass('fixed'))){
            $('.main-container').addClass('main-container-wide', 100).removeClass('main-container-narrow');
        }
    }
// sidebar show/hide: 
    function hideSidebar(){
        $('#sidebar-toplevel').removeClass('sidebar-wide').addClass('sidebar-gone', 100);
        $('#showSidebar').show();
        mainContainerSidePadding('enlargeContent');
    }
    function showSidebar(){
        $('#showSidebar').hide();
        $('#sidebar-toplevel').addClass('sidebar-wide', 100).removeClass('sidebar-gone');
        mainContainerSidePadding('shrinkContent');
    }
    function switchLayoutC(){
        var sidebar = $('#sidebar').detach();
        $('#sidebar-c-target').prepend(sidebar);
        $('#sidebar').removeClass('col-4 col-lg-4 col-xl-3').addClass('float-left collapsable sidebar-height');
        $('#hideSidebar').removeClass('hidden');
        $('.main-container').removeClass('container fixed');
        $('.main-content').removeClass('col-xl-6 col-8');
    }
    function switchLayoutF(){
        var sidebar = $('#sidebar').detach();
        $('#sidebar-f-target').prepend(sidebar);
        $('.sidebar').addClass('col-4 col-lg-4 col-xl-3').removeClass('float-left collapsable sidebar-height');
        $('.main-container').addClass('container fixed').removeClass('main-container-wide main-container-narrow');
        $('#hideSidebar').addClass('hidden');
        $('.main-content').addClass('col-xl-6 col-8');
    }
    // click search icon to show input field 
    // when on a collection or subject page it also shows the dropdown to select whether to search all or not
    function expandSearch(){
        viewportWidth = $(window).width();
        if (viewportWidth < 976 ){
            console.log('droppding should be happening');
            $('.search').addClass('hidden');
            $('#searchDropper').removeClass('hidden');
            $('#search-input').focus();
        } else {
            $('#searchExpander').removeClass('hidden').addClass('inline-div');
            $('#search-input').focus();
            $('#search-icon').addClass('search-icon-black').removeClass('search-icon-white');
        }
    }
    function hideSearch() {
        $('#searchDropper').addClass('hidden');
        $('.search').removeClass('hidden');
    }
    function expandBrowseDropdown(){
        $('#browseDropdown').toggle();
    }
    function searchContent(a){
        var input;
        // athis = $(athis);
        console.log($(a).siblings('.search-input'));
        if($(a).hasClass('search-input')){
            input = $(a).val();
        } else {
            input = $(a).siblings('input.search-input').val();
        }
        // if ( pagetype === "collection" && selectSearchType < 0) {
        //     var searchUrl = 'http://digital.chipublib.org/digital/collection/' + pagelink + '/search/searchterm/' + input + '/field/all/mode/all/conn/all/order/nosort/ad/asc';
        // } else if ( pagecolls != '' && selectSearchType < 0) {
        //     var searchUrl = 'http://digital.chipublib.org/digital/search/collection/' + pagecolls + '/searchterm/' + input + '/field/all/mode/all/conn/all/order/nosort/ad/asc';
        // } else {
            var searchUrl = 'http://digital.chipublib.org/digital/search/searchterm/' + input;
        // }
        if (input.length > 0 ){
            window.location.href = searchUrl;
        }
    }
    function userExpandsWindow(){
        // the card page index should never change to the fixed layout so, in /layouts/cardpage.html, the <main> tag has a clas called "no-fixed"
        (!$('main').hasClass('no-fixed') ? switchLayoutF() : '');
        $('.header-left').addClass('header-left-bumper');
        $('.search').removeClass('search-bumper-small').addClass('search-bumper-big');
        showSidebar();
    }
    function userShrinksWindow(){
        switchLayoutC();
        $('.header-left').removeClass('header-left-bumper');
        $('.search').removeClass('search-bumper-big').addClass('search-bumper-small');
        hideSidebar();
    }
    $(window).resize(function () {
		var viewportWidth = $(window).width();
		if (viewportWidth < 976) {
            userShrinksWindow();
		}
		if (viewportWidth > 976) {
            userExpandsWindow();
		}
	});