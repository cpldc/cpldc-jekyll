
// when the page is finished loading:
    // show/hide sidebar buttons are active
    var viewportWidth = $(window).width();
    $( document ).ready(function() {
		$('.search-input').keypress(function(e){
			if(e.keyCode==13)
                searchContent(this, beelzebub);
        });
        $('.textblock').css('bottom-border','1px solid #ccc');
        $('.rights-i').click(function(e){
            e.preventDefault();
            rightsI(this);
        });
        $('.rights-close').click(function(e){
            e.preventDefault();
            rightsClose(this);
        });
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
        $('.main-container').removeClass('fixed');
        // $('.main-content').removeClass('col-xl-6 col-8');
    }
    function switchLayoutF(){
        var sidebar = $('#sidebar').detach();
        $('#sidebar-f-target').prepend(sidebar);
        $('.sidebar').addClass('col-4 col-lg-4 col-xl-3').removeClass('float-left collapsable sidebar-height');
        $('.main-container').addClass('container fixed').removeClass('main-container-wide main-container-narrow');
        $('#hideSidebar').addClass('hidden');
        $('.main-content').addClass('col-xl-6 col-lg-8 col-12');
    }
    // click search icon to show input field 
    // when on a collection or subject page it also shows the dropdown to select whether to search all or not
    var searchTracker = 0;
    function expandSearch(){
        // if ($('#searchDropper').is(':visible') || $('#searchExpander').is(':visible')){
        //     return false;
        // }
        if (searchTracker === 1){
            return false;
        }
        searchTracker = 1;
        viewportWidth = $(window).width();
        if (viewportWidth < 976 ){
            $('.search').hide();
            $('#searchDropper').removeClass('hidden');
            $('#search-input-dropped').focus();
            $('.search-icon-white').hide();
        } else {
            $('#searchExpander').removeClass('hidden').addClass('inline-div');
            $('#search-input-exp').focus();
            $('#search-icon').addClass('search-icon-black').removeClass('search-icon-white');
        }
    }
    function hideSearch() {
        searchTracker = 0;
        $('#searchExpander').addClass('hidden');
        $('#search-icon').removeClass('search-icon-black').addClass('search-icon-white');
        $('#searchDropper').addClass('hidden');
        $('.search').show();
        $('.search-icon-white').show();
    }
    function expandBrowseDropdown(){
        $('#browseDropdown').toggle();
    }
    function searchContent(a, pagecolls){
        var input;
        if ( a === 'exp'){
            input = $('#search-input-exp').val();
        } else if ( a === 'drop') {
            input = $('#search-input-dropped').val();
        } else {
            input = $(a).val();
        }
        var searchType = $('#searchType').val();
        if ( pagecolls && searchType.indexOf('This') > -1 ){
            var searchUrl = 'http://digital.chipublib.org/digital/search/collection/' + pagecolls + '/searchterm/' + input + '/field/all/mode/all/conn/all/order/nosort/ad/asc';
        } else {
            var searchUrl = 'http://digital.chipublib.org/digital/search/searchterm/' + input;
        }
        if (input.length > 0 ){
            window.location.href = searchUrl;
            // console.log('searching ' + searchType + ' which is ' + pagecolls + ' for ' + input + ' and well go ' + searchUrl );
        }
    }
    function userExpandsWindow(){
        // the card page index should never change to the fixed layout so, in /layouts/cardpage.html, the <main> tag has a clas called "no-fixed"
        (!$('main').hasClass('no-fixed') ? switchLayoutF() : '');
        footerWide();
        $('.header-left').addClass('header-left-bumper');
        $('.search').removeClass('search-bumper-small').addClass('search-bumper-big');
        showSidebar();
        hideSearch();
        if ($('#searchDropper').is(':visible')){
            expandSearch();
        }
    }
    function userShrinksWindow(){
        switchLayoutC();
        footerNarrow();
        $('.header-left').removeClass('header-left-bumper');
        $('.search').removeClass('search-bumper-big').addClass('search-bumper-small');
        hideSidebar();
        hideSearch();
        if ($('#searchExpander').is(':visible')){
            expandSearch();
        }
    }
    // footer funkiness
    function footerNarrow() {
        if(!$('.footer-social').hasClass('footer-social-horiz')){
            $('.footer-social').addClass('footer-social-horiz');
        }
        if ($(".footer-list").hasClass("footer-floatright")){
            $(".footer-list").removeClass("footer-floatright");
            $(".footer-contactinfo").removeClass("footer-floatright");
        }
    }
    function footerWide() {
        if ($(".footer-social").hasClass("footer-social-horiz")){
            $(".footer-social").removeClass("footer-social-horiz");
        }
        if (!$(".footer-list").hasClass("footer-floatright")){
            $(".footer-list").addClass("footer-floatright");
            $(".footer-contactinfo").addClass("footer-floatright");
        }
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
    
    // MPU rights 'i'
        // rightsInsertion is called by simple lightbox (I edited the js at line 286); 
        //     whenever an image is loaded (onload), it looks at whether 'mpu' is in url; 
        //     if it is, it wraps the image in a div (so it's separate from SLB's caption) 
        //     and then attaches the "rightsdiv" after it
       	function RefreshEventListener() {
               // https://stackoverflow.com/questions/1359018/in-jquery-how-to-attach-events-to-dynamic-html-elements
               // turns off the event listeners for the MPU rights "i" and turn them back on again; happens when lightbox loads an image, otherwise the event listener won't notice the new image
               $(".rights-i").off(); 
               $(".rights-close").off(); 
               console.log("refresher");

            $('.rights-i').on('click', function(e){
                console.log('rights i this')
                e.preventDefault();
                rightsI(this);
            });
            $('.rights-close').click(function(e){
                e.preventDefault();
                rightsClose(this);
            });
        }
        function rightsInsertion(loc) {
            if (loc.src.indexOf("mpu") >= 0) {
                var rightsDiv = '<div class="rights-block">' +
                        // '<i class="rights-i rights-i-lightbox fa fa-info-circle"></i>' + 
                        '<div class="rights-overlay rights-overlay-lightbox">' + 
                            '<div class="rights-guts">' + 
                                '<span class="rights-statement">' + 
                                    'Courtesy of U.S. Equities Realty and the men and women who built Millennium Park' + 
                                '</span>' + 
                            '</div>' + 
                            '<div class="rights-close">' + 
                                '<i class="rights-close-icon fa fa-times"></i>' + 
                            '</div>' + 
                        '</div>' + 
                    '</div>';
                $(loc).wrap('<div id="rightsWrapper"></div>');
                $(loc).after(rightsDiv);
                RefreshEventListener();
            }
        }
        // rightsI and rightsClose handle the user interacting
        function rightsI(item) {
            $(item).toggle();
            $(item).siblings('.rights-overlay').toggle();
        }
        function rightsClose(item){
            $(item).parents('.rights-overlay').toggle();
            $(item).parents('.rights-overlay').siblings('.rights-i').toggle();
        }
        // rather than using a docready or a event refresher, 
        // this (body) method doesn't need to be dynamically altered when the page adds a new mpu image 
        // (as is the case with the lightbox)
        // inexplicably, this doesnt work on the cards so .card .rights-i is in docready
        $('body').on('click', '.rights-i', function(e) {
            console.log("rights click");
            rightsI(this);
        });
        $('body').on('click', '.rights-close', function(e) {
            RefreshEventListener();
        });
// events
    function eventerizer(eventNode, returnEventsHtml){
        var title = $(eventNode).find('title').text(),
            loc = $(eventNode).find('bc\\:location').find('bc\\:name').text(),
            link = $(eventNode).find('link').text(),
            date = moment($(eventNode).find('bc\\:start_date').text()).format("MMM D");
            time = moment($(eventNode).find('bc\\:start_date').text()).format("h:mmA");
            loclink = 'https://www.chipublib.org/locations/' + $(eventNode).find('bc\\:location').find('bc\\:id').text();
        returnEventsHtml.push(
            '<div class="event">' + 
                '<h3 class="event-title">' +
                '<a href="' + link + '">' + title + "</a>" +
                '</h3>' +
                '<div class="event-location"><a href="' + loclink + '">' + loc + '</a></div>' +
                '<div class="event-datetime">' +  
                    '<div class="event-date">' + date + '</div>' +
                    '<div class="event-time">' + time + '</div>' +
                '</div>' +
        ' </div>'
        );
        return returnEventsHtml;
    }
    var eventsHtml = [];
    var jqxhrEvents = $.get( "https://chipublib.bibliocommons.com/events/events/rss/all?nocache=", function() {
            console.log( "events success" );
        })
        .done(function(data) {
            var returnEventsHtml = [];
            $(data).find("item").each(function () { 
                if (returnEventsHtml.length > 4){
                    return false;
                } 
                var el = $(this);
                $.each($(el).find('category'), function(k, v){
                    if (v.textContent === 'History and Genealogy'){
                        eventerizer(el, returnEventsHtml);
                    }
                })
            });
            eventsHtml = returnEventsHtml;
        })
        .fail(function(xhr, status, error) {
            console.log("events: An AJAX error occured: " + status + "\nError: " + error);
        })
        .always(function() {
            console.log( "events finished" );
    });
    jqxhrEvents.always(function() {
        $('#bcEvents').append(eventsHtml);
    });
// blogs
    function blogerizer(blogNode, returnBlogsHtml){
        var title = $(blogNode).find('title').text(),
            link = $(blogNode).find('link').text(),
            author = $(blogNode).find('dc\\:creator').text(),
            date = $(blogNode).find('pubDate').text(),
            desc = $(blogNode).find('description').text();
        returnBlogsHtml.push(
            '<dl class="blogpost">' + 
                '<dt class="blogpost-title">' + 
                    '<a href="' + link + '" class="blogpost-link">' + 
                        title + 
                        '<i class="raquo fa fa-angle-double-right" aria-hidden="true"></i>' +
                    '</a>' +
                '</dt>' +
                '<dd class="blogpost-author-date"> By: ' + author + ', ' + date.substr(0,17) + '</dd>' +
                '<dd class="blogpost-description">' + desc.substr(0,65) + '&hellip;</dd>' +
            '</dl>'
        )
    }
    var blogsHtml = [];
    var jqxhrBlogs = $.get( "https://cors-anywhere.herokuapp.com/https://www.chipublib.org/blogs/category/chicago-history/feed/", function() {
        console.log( "blogs success" );
        })
        .done(function(data) {
            var returnBlogsHtml = [];
            $(data).find("item").each(function () { 
                if (returnBlogsHtml.length > 2){
                    return false;
                } 
                var el = $(this);
                blogerizer(el, returnBlogsHtml);
            });
            blogsHtml = returnBlogsHtml;
        })
        .fail(function(xhr, status, error) {
            console.log("blogs: An AJAX error occured: " + status + "\nError: " + error);
        })
        .always(function() {
            console.log( "blogs: finished" );
    });
    jqxhrBlogs.always(function() {
        $('#bcBlogs').append(blogsHtml);
    });