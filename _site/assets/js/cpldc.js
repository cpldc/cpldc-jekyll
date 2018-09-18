
// when the page is finished loading:
    // show/hide sidebar buttons are active
$( document ).ready(function() {
    console.log( "ready!" );
    $( "#hideSidebar" ).click(function() {
        hideSidebar();
    });
    $( "#showSidebar" ).click(function() {
        showSidebar();
    });
    if (viewportWidth < 976 ){
        hideSidebar();
        switchLayoutC();
    }
});
// sidebar show/hide: 
    function hideSidebar(){
        $('#sidebar-toplevel').animate(
            {width: 'toggle'},
            {duration: 100,
                // showing the button before the animation is complete looks jarring
            complete: function () {
                    $('#showSidebar').show();
                }});
        $('.main-container').animate(
            {'padding-left': '5px'},
            {duration: 100});
        // $('.main-content').removeClass('col-xl-6 col-8').addClass('col-xl-9 col-lg-8 col');
        // $('.sidebar').removeClass('col-4 col-lg-4 col-xl-3');
        // col-xl-6 col-8
    }
    function showSidebar(){
        $('#showSidebar').toggle();
        $('#sidebar-toplevel').animate(
            {width: 'toggle'},
            {duration: 100});
        $('.main-container').animate(
            {'padding-left': '235px'},
            {duration: 100});
        // $('.main-content').removeClass('col-xl-9 col-lg-8 col').addClass('col-xl-6 col-8');
        // $('.sidebar').addClass('col-4 col-lg-4 col-xl-3');
    }
    function switchLayoutC(){
        // $('main > .container').removeClass('container').addClass('container-fluid');
    }
    // click search icon to show input field 
    // when on a collection or subject page it also shows the dropdown to select whether to search all or not
    function expandSearch(){
        $('#search-input').show().focus();
        $('#search-icon').addClass('search-icon-black').removeClass('search-icon-white');
    }
    function expandBrowseDropdown(){
        $('#browseDropdown').toggle();
    }
    function searchContent(){
        var input = $('#search-input').val();
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
    // media queries: 
// if page opens at :
    // sm, md: run hideSidebar()
// if page shrinks/grows to:
    // xs, sm, md: run hideSidebar()
    // lg, xl: 