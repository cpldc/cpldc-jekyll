Introduction and core  

Jekyll is a static site generator, which takes templates that a user provides, combines it with data the user provides, and creates standard HTML, JavaScript, and CSS files that can be uploaded to a server.  Jekyll is written in Ruby, uses Liquid as a templating language, and markdown for formatting.  

Ruby is hardly used at all as a Jekyll user, but it maybe be worth adding in as a keyword in google searches when you encounter a problem. 

Liquid is used widely in Jekyll template pages.  Jekyll templates look like normal HTML pages, but will have Liquid statements in them.  Straightforward Liquid statements will be contained in {{ double curly braces }}, while logical or more programmatic statements will be wrapped in {% curly brace/percent sign %}.  For example:  

    {% for page in site.pages %} 

        <h1>{{ page.title }}</h1> 

        <p>{{ page.description }}</p> 

    {% endfor %} 

This statement would go through all the “pages” in the “site” and will call each one “page”.  It will look at each “page” and put the “title” into "    &lt;h1>" tags, and the “desc” into a &lt;p> tag.  (Page, site, 

We make extensive use of if statements in Liquid.  Here’s an example of how we would include the Millennium Park rights statement, which is only included if the “slug” is ‘mpu’. 

    {% if page.slug == ‘mpu’ %}  

        {{ page.rights }} 

    {% endif %} 

Awkwardly, “if not” statements are done by ending the if statement immediately and performing the “not” action in an “else”.  Here’s how we exclude thumbnails from the MRC and Takedown pages:  

    {% if page.slug == 'mrc' %}{% elsif page.link == 'takedown' %}{% else %} 

        --Thumbnail code goes here-- 

    {% endif %} 

Liquid is pretty verbose and inelegant, but it’s the industry standard.  You will see in the content layout how many nested loops and ifs are used to create the pages. 

Markdown is a very common method of formatting online.  It uses common symbols to denote certain formats, such as **bold** and _italics_.  We don’t actually use much of it, because our content was already in rich html from the original version, but we might’ve handled some of our formatting this way.   

More importantly, our content pages are stored in markdown files, in the header of each file (denoted by ---).  The data is stored in key/value pairs in a pretty simple format: 

    title: Philip David Sang Collection 

    sortname: Sang, Philip David Collection 

When you need to nest data, it’s done with dashes and spaces:  

    categoryFull:  

    - African Americans 

    - Civil War 

    CPLRes: 

    - a: http://www.chipublib.org/fa-richard-durham-papers/ 

      dt: Richard Durham Papers 

      dd: Collection includes scripts for radio plays devoted to the Black experience    in America. 

    - a: http://www.chipublib.org/fa-madeline-stratton-morris-papers/ 

      dt: Madeline Stratton Morris Papers 

      dd: Includes manuscripts and clippings relating to slavery. 

This seems extremely similar to a formatting style called YAML (Jekyll is probably using YAML in this context, despite the files being .markdown files – or maybe YAML is always a part of markdown?), so that might be a good way to look if you have questions about it.  In CPLDC content, see the _posts/ folder for examples. 

Structure 

Jekyll File Structure 

Jekyll is frequently used for blogs, and, rather than reinventing the wheel, the CPLDC site uses Jekyll’s blog feature for its skeleton.  Here is the overview of where each component is. 

/

Jekyll starts with markdown files (*.md or *.markdown) located in the root directory.  There, CPLDC has:  

    all.md 
    about.md 
    index.md 
    takedown.md 

Additionally, the caa and city officials files are here: 

    caa.html 
    cityofficials.md 

These files are extremely simple and merely direct jekyll to the layout we’d like to use for the page.  The ‘all.md’ page (the All Collections page) is the smallest, consisting entirely of: 

    ---
    layout: all
    sidebartype: fixed
    ---

This indicates to Jekyll to look for a layout called 'all', and creates a sidebar variable that will be used to disable sidebar hiding/showing when the final page is at full size.  Because this page simply iterates over all collections and lists them in alphabetical order, there is no unique content to be stored here.

The 'about' and 'takedown' pages use the same layout (called 'about'), and, since they are simple, one-off pages, their content is stored in these *.md files.  

The City Officials and CAA pages use a 'data' layout, and merely direct jekyll to the database file used for each.  CAA is not fully implemented at this time, as interest seems to have waned.  City Officials is fully functional and meeets CPL specifications as decided by the August meeting, and is waiting on the MRC department to handle content cleanup and refreshing.

The index page, like the 'all' page, is all iterative code, and so its *.md page is very simple as well.

_layouts

This folder holds the layout files that are referenced in the root *.md files.  Layout files are HTML files with Liquid elements.  

_layouts/about.html

The About page is a good example, since it takes content from the *.md file and places it in the HTML, but doesn't dig too deep into any other aspects of Jekyll.

It starts with normal html header, and inserts the title from the root *.md file (line 4 in /about.md or /takedown.md).  

At this point, it invokes our first _include_: a reused file that is stored elsewhere, like a variable that stores html code.  We will address each 'include' file in that section of this guide, but for now, we'll address them briefly as they're used. The first _include_ we use is a file that calls the various external libraries the site uses, since they are repeatedly reused.  These include jQuery, Bootstrap, Font Awesome, and others.

Next we include the header, the sidebar, and then, finally get to placing the about page's specific content.  We place a page title, some top text, show an image (which adds the mpu rights statement), and then the body text.  

After that, the blogs and events are added.  These two still present a substantial problem, which is addressed in their subsections below.

Finally the footer is included.

_layouts/all.html

The all.html layout demostrates a page which has no original content, and digs into the collection data.

As with about, we surround our content with the frame: we include the libraries, header, sidebar, blogs/events, and footer.  The center content is the only meaningful difference between this page and the about.html layout (in fact, the two could share that frame, and may, someday).  

In the center content, starting around line 28, we can see that the code that draws the collections list is quite simple.  As mentioned above, we use Jekyll's blogs functionality to store our collections; we will go into detail on what this means later, but for now, understand that we consider a collection a "post." 

First, we sort all the posts, using a built in function.  Line 21: 

    {% assign sortedPosts = site.posts | sort: 'sortname' %}

We "assign" the variable sortedPosts the value of all the posts, after we run the operation called "sort," and we tell that operation to sort our collections using the key "sortname" (we store sortname separately since we have some collections with human names, which we want sorted as Last Name, First Name, but the collection title should be stored as First Name, Last Name).

Then, at line 28, we iterate through each post in the sortedPosts array.  If the post's "type" value is "collection" or "subcollection" (like the pieces of the Northside Clubs/Orgs or the two collections within Theater), then they will be included.  (Naturally we want to exclude type values of "category" or "location".)  We present the (sub)collection's title, and in the case of collections, we link the title to the page.  In the case of the subcollection, we link to the anchor of the parent collection *on this page*.  Then we add the brief description, and then the categories, which have a small logical section because sometimes a collection will have 2 categories.

_layouts/cardpage.html

The cardpage is the index page.  It has no sidebar or blogs/events, so it's just libraries, header, and footer.  This page, however, *include*s the cards themselves, so we will address them specifically in that section.  However, note that we're using the Masonry js library (instead of default css masonry) because the library allows for the cards to reposition when the window is resized.  It also enables access to the  "imagesLoaded" javascript sub-library.  When images load after the card is drawn, it can result in the cards lying on top of each other; imagesLoaded prevents that.  I use the jQuery implementation because we're already using jquery all over the place (and it's shorter), but these can be invoked without it.

_layouts/content.html

The content page is probably the largest and most complex page, but it's not that challenging to understand from a conceptual perspective.  The complexity comes from handling the corner cases for when some content is there and other content is not.  

There are a few pieces of content that are presented in the collections pages: 

    Title
    Top Text (textlong)
    Main Image
    Thumbnails
    Rich Text (textrich)
    Highlights
    More CPL Resources (CPLRes)
    External Resources (ExRes)

Title, Top Text, and Main Image were deemed as mandatory, so they are always there; the rest are optional.  Note that when there are thumbnails, we decided there should always be no less than 3 and no more than 4.

Main Image.

Because older browsers (IE) don't support css-based image cropping, we present each image as the background of an <img> element.  The actual image is a one-pixel transparent image, presented like this: 

    data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7

The cropping is handled by inline styling.  The "mainimage" element of a collection's data is an array that holds: 
    
    url *record number*
    collection
    size
    alignment ("align")
    text
    alt text

To address the possibility of URL changes (as happened when the responsive site launched), the image URLs are stored simply as the record number, and the actual URLs are constructed by a function (starting on line 19).  

    {% if page.mainimage.url contains '.jpg' %}
        {% assign mainimage = 'assets/images/' | append: page.mainimage.url %}
        {% assign mainimageUrl = page.mainimage.coll %}
    {% else %}
        {% assign mainimage = 'http://digital.chipublib.org/digital/api/singleitem/image/' | append: coll | append: '/' | append: page.mainimage.url | append: '/default.jpg' %}
        {% assign mainimageUrl = 'https://cdm16818.contentdm.oclc.org/digital/collection/' | append: coll | append: '/id/' | append: page.mainimage.url %}
    {% endif %}

Some images aren't pulled from ContentDM (like MRC's image), so these are identified by having '.jpg' in the data, in which case, the full value is assigned to the mainimage variable with jekyll's asset path.  If there is no .jpg, we look for a value for the 'coll' key - locations and categories pull pictures from various collections, so I indicate the collection the image is from in this key; if there is no value for the 'coll' key, then the page should be a collection, so the function will use the page's top level 'coll' value.

Note that the image location and the link are different, since we want to link users to the ContentDM image page, not to the image itself.

(All images are handled in a variant of this method: card images and thumbnails.)

The <img> is wrapped in an <a> element to enable the lightbox.  The lightbox we're using takes a data-alt element from the <a> element and presents that as a caption.  In order to make the caption a link to the contentDM page for the image, I've embedded HTML directly in the data-alt element (so be careful with " ' ` ' ").

The <img> itself is just a 1px transparent data element: 

    data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7

This means no actual 1px transparent image is actually stored anywhere.

If the mainimage variable contains the string 'mpu' then the rights "i" will show up.

For thumbnails, once you understand the main image logic, the thumbnails are basically just an interative presentation of the same logic.  Bootstrap will auto-hide the 4th and even 3rd thumbnails based on window width; see line 69: 

    <div class="col{% if counter == 3 %} hidden-sm-down{% endif %}{% if counter == 4 %} hidden-xs-down{% endif %}">

(I will probably change this to use the array index rather than an explicit counter variable.  Remember array indexes start counting at 0.)

After the images, the content section is a set of if statements determining what content is present and placing it appropriately.  Many elements are sorted, but some are partially sorted (eg when More CPL Resources are present, Finding Aids will always appear at the top of the list, and and the list after that will be alphabetized; the FAs themselves will be alphabetized as well).

Additionally there are minor language tweaks depending on what the collection is; for example, in the Civil War category page, there is language appended to the Sang Collection Finding Aid description to clarify that some of the Sang content is from the CW era.  (if page.title contains "Civil War" and findingaid.title contains "Sang", then add "blah blah blah".)

_layouts/data.html

Because the two data pages handle their databases so differently, this page is just a header/footer frame (no sidebar or blogs/events).

_includes

The _includes folder contains html files that are expected to be included into full html pages, so these are all partial (no html header, no outer tags, etc).

_includes/blogs.html

The blogs and events are still handled with php.  There are two reasons for this: 

    1. The Bibliocommons RSS feeds upon which these depend do not have the correct CORS headers, so when they are pulled, they trip the cross-site scripting attack alarms within JavaScript.  This is a Bibliocommons problem; it is a simple fix, but I wouldn't count on them fixing it - and I wouldn't bother, because regardless, problem #2 would exist unless they overhaul their entire way of handling events.

    2. Because the events RSS feed is so large, any JavaScript that has to wait on it will cause a ~5 second page load.  Usiung Javascript, there's no way to avoid the 5 second wait. Using PHP, we are able to get around this by having the PHP code grab the RSS and create the tiny HTML file that we use, and save that file for 24 hours.  This means that only one page load, every 24 hours, has to wait the 5 second load time. There is no JavaScript equivalent of PHP's file_put_contents().  (Node.js has writeFile(), but that requires a nodeJS server, which we don't have.)

If the PHP implementation stops working, it is my feeling that, rather than force users to experience a 5 second page load, we should remove the events from the page.  (The blogs are not a problem and can be implemented with vanilla JavaScript without any trouble.)

_includes/caa.html

See separate guide.

_includes/cards.html

Collections that should have a card drawn have a number value in their 'flag' key, which is the order in which they will be sorted.  One could easily implement a _data solution to put the card orders in one file (see _data/cardflags.yml), but the collections already had their  flags in their data, so this implementation was simpler.

The cards use the core Bootstrap 'card' class css.  Images are handled the same way as "main images" except with slightly different key/value pairs, and no lightbox.  Again, we look at the image path for the string 'mpu' to determine whther to add the rights 'i'.  Slightly interestingly, if the category value is an array, we iterate over the array; otherwise, we just spit out the one. It might seem logical to make all categories arrays and just iterate once, but it's slightly less complex this way, because the category presentation requires a pipe between items on the list (which is actually a css border, to match Bibliocommons).  Then it's just collection title and "textshort".

_includes/cityofficials.html

See separate guide.

_includes/events.html

see _includes/blogs.html

_includes/footer.html

The footer html is pretty straightforward.  It uses Font Awesome for the social media icons (matching Bibliocommons, who appears to use the same icons, but doesn't credit FA, maybe a unique license?)  The sections of the footer should stack as the browser window shrinks, using Bootstrap responsive classes.

_includes/header.html

The header is a bit more complex.  It includes a few javascript/jquery elements: 

Show/Hide the search input
Activate the search
Browse Dropdown
Hotkeys
Responsive...responses.

Show/Hide the search input:

Pretty simply, if you click on the search area, the input form appears.  When the window is "lg" or larger (width > 970), it remains in the header.  Like in Bibliocommons, there's no way to close/hide it.  in "md" or smaller (width < 970), clicking the search div drops an input form.  On content pages, both include a selection to limit your search to that page's content, or all content.  This should not appear on the index, about, all, takedown, etc, pages.

Activate the search:

Takes the search input (if length > 0) and appends it to the search results string in contentdm.  When you search in contentDM, the url pattern is either: 

http://digital.chipublib.org/digital/search/collection/[COLLECTION]/searchterm/[SEARCHINPUT]/field/all/mode/all/conn/all/order/nosort/ad/asc

or 

http://digital.chipublib.org/digital/search/searchterm/[SEARCHINPUT]

so our function simply inserts the user's input into those structures.  The former is searching one or many collections (collection strings delimited with !, eg mpu!ChicagoParks, similar to the Browse button of the content pages), the latter is searching all content.  

Browse Dropdown: 

drops the Browse menu on click.  The Bibliocommons version disappears when you click off of the menu; I prefered to make it disappear when you click on the menu, but not on a link.

Hotkeys:

There are event listeners for:
    Pressing enter when the search div is focused
        Expands the search input, calls the show/hide function
        (Used for a11y)
    Pressing enter when the search input field is focused
        Activates the search 
    Pressing escape when the Browse menu is visible 
        Hides the browse menu

Responsive responses: 

Normal responsive elements are at work: under a certain size, the CPL logo changes and the browse/events buttons change, matching Bibliocommons.  These use Bootstrap's responsive classes. In addition to these Bootstrap responses, there are javascript listeners for window resizing.

When a user resizes the window and crosses the 970px threshold, the browse dropdown will hide, and the search inputs, when visible, will change to their larger or smaller selves.  (The modal version of the browse menu is not responsive; it seemed too disorienting when it disappeared on resize.)
