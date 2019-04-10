# Simple editing: 

Each landing page (or all, about, etc) exist as individual webpages on the server, so any of them can be downloaded, edited, and reuploaded.  This won't make any persistent changes to the github repository, but it's an easy way to make specific changes if necessary.  

# Introduction and core  

Jekyll is a static site generator, which takes templates that a user provides, combines it with data the user provides, and creates standard HTML, JavaScript, and CSS files that can be uploaded to a server.  Jekyll is written in Ruby, uses Liquid as a templating language, and markdown for formatting.  

Ruby is hardly used at all as a Jekyll user, but it maybe be worth adding in as a keyword in google searches when you encounter a problem. 

Liquid is used widely in Jekyll template pages.  Jekyll templates look like normal HTML pages, but will have Liquid statements in them.  Straightforward Liquid statements will be contained in {{ double curly braces }}, while logical or more programmatic statements will be wrapped in {% curly brace/percent sign %}.  For example:  

    {% for page in site.pages %} 

        <h1>{{ page.title }}</h1> 

        <p>{{ page.description }}</p> 

    {% endfor %} 

This statement would go through all the “pages” in the “site” and will call each one “page”.  It will look at each “page” and put the “title” into &lt;h1> ert tags, and the “desc” into a &lt;p> tag.  (Page, site, 

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

## Structure 

### Jekyll File Structure 

Jekyll is frequently used for blogs, and, rather than reinventing the wheel, the CPLDC site uses Jekyll’s blog feature for its skeleton.  Here is the overview of where each component is. 

#### /

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

#### _layouts

This folder holds the layout files that are referenced in the root *.md files.  Layout files are HTML files with Liquid elements.  

##### _layouts/about.html

The About page is a good example, since it takes content from the *.md file and places it in the HTML, but doesn't dig too deep into any other aspects of Jekyll.

It starts with normal html header, and inserts the title from the root *.md file (line 4 in /about.md or /takedown.md).  

At this point, it invokes our first _include_: a reused file that is stored elsewhere, like a variable that stores html code.  We will address each 'include' file in that section of this guide, but for now, we'll address them briefly as they're used. The first _include_ we use is a file that calls the various external libraries the site uses, since they are repeatedly reused.  These include jQuery, Bootstrap, Font Awesome, and others.

Next we include the header, the sidebar, and then, finally get to placing the about page's specific content.  We place a page title, some top text, show an image (which adds the mpu rights statement), and then the body text.  

After that, the blogs and events are added.  These two still present a substantial problem, which is addressed in their subsections below.

Finally the footer is included.

##### _layouts/all.html

The all.html layout demostrates a page which has no original content, and digs into the collection data.

As with about, we surround our content with the frame: we include the libraries, header, sidebar, blogs/events, and footer.  The center content is the only meaningful difference between this page and the about.html layout (in fact, the two could share that frame, and may, someday).  

In the center content, starting around line 28, we can see that the code that draws the collections list is quite simple.  As mentioned above, we use Jekyll's blogs functionality to store our collections; we will go into detail on what this means later, but for now, understand that we consider a collection a "post." 

First, we sort all the posts, using a built in function.  Line 21: 

    {% assign sortedPosts = site.posts | sort: 'sortname' %}

We "assign" the variable sortedPosts the value of all the posts, after we run the operation called "sort," and we tell that operation to sort our collections using the key "sortname" (we store sortname separately since we have some collections with human names, which we want sorted as Last Name, First Name, but the collection title should be stored as First Name, Last Name).

Then, at line 28, we iterate through each post in the sortedPosts array.  If the post's "type" value is "collection" or "subcollection" (like the pieces of the Northside Clubs/Orgs or the two collections within Theater), then they will be included.  (Naturally we want to exclude type values of "category" or "location".)  We present the (sub)collection's title, and in the case of collections, we link the title to the page.  In the case of the subcollection, we link to the anchor of the parent collection *on this page*.  Then we add the brief description, and then the categories, which have a small logical section because sometimes a collection will have 2 categories.

##### _layouts/cardpage.html

The cardpage is the index page.  It has no sidebar or blogs/events, so it's just libraries, header, and footer.  This page, however, *include*s the cards themselves, so we will address them specifically in that section.  However, note that we're using the Masonry js library (instead of default css masonry) because the library allows for the cards to reposition when the window is resized.  It also enables access to the  "imagesLoaded" javascript sub-library.  When images load after the card is drawn, it can result in the cards lying on top of each other; imagesLoaded prevents that.  I use the jQuery implementation because we're already using jquery all over the place (and it's shorter), but these can be invoked without it.

##### _layouts/content.html

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

##### _layouts/data.html

Because the two data pages handle their databases so differently, this page is just a header/footer frame (no sidebar or blogs/events).

##### _includes

The _includes folder contains html files that are expected to be included into full html pages, so these are all partial (no html header, no outer tags, etc).

##### _includes/blogs.html

The blogs and events are finally handled in JavaScript.  

The jqxhrBlogs() function uses an AJAX call to get the blog RSS.  In development, it's important to have the CORS-anywhere url added to the beginning of the URL ("https://cors-anywhere.herokuapp.com/"), but it should be taken out before uploading to the ContentDM custom pages.  It then calls the blogerizer() function, which inserts the blog content into the HTML template, on each entry in the RSS until the returned html array has 3 entries (length of 2, because arrays start counting at 0).  

Events are handled the same way, but with 5 of them (length = 4) instead of 3.

If the AJAX call receives an error message or otherwise fails to get the RSS, the error message will be printed to the console.

##### _includes/caa.html

See separate guide for CAA and City Officials.

##### _includes/cards.html

Collections that should have a card drawn have a number value in their 'flag' key, which is the order in which they will be sorted.  One could easily implement a _data solution to put the card orders in one file (see _data/cardflags.yml), but the collections already had their  flags in their data, so this implementation was simpler.

The cards use the core Bootstrap 'card' class css.  Images are handled the same way as "main images" except with slightly different key/value pairs, and no lightbox.  Again, we look at the image path for the string 'mpu' to determine whther to add the rights 'i'.  Slightly interestingly, if the category value is an array, we iterate over the array; otherwise, we just spit out the one. It might seem logical to make all categories arrays and just iterate once, but it's slightly less complex this way, because the category presentation requires a pipe between items on the list (which is actually a css border, to match Bibliocommons).  Then it's just collection title and "textshort".

##### _includes/cityofficials.html

See separate guide for CAA and City Officials.

##### _includes/events.html

See _includes/blogs.html

##### _includes/footer.html

The footer html is pretty straightforward.  It uses Font Awesome for the social media icons (matching Bibliocommons, who appears to use the same icons, but doesn't credit FA, maybe a unique license?)  The sections of the footer should stack as the browser window shrinks, using Bootstrap responsive classes.

##### _includes/header.html

The header is a bit more complex.  It includes a few javascript/jquery elements: 

Show/Hide the search input
Activate the search
Browse Dropdown
Hotkeys
Responsive...responses.

###### Show/Hide the search input:

Pretty simply, if you click on the search area, the input form appears.  When the window is "lg" or larger (width >= 970), it remains in the header.  Like in Bibliocommons, there's no way to close/hide it.  in "md" or smaller (width < 970), clicking the search div drops an input form.  On content pages, both include a selection to limit your search to that page's content, or all content.  This should not appear on the index, about, all, takedown, etc, pages.

###### Activate the search:

Takes the search input (if length > 0) and appends it to the search results string in contentdm.  When you search in contentDM, the url pattern is either: 

http://digital.chipublib.org/digital/search/collection/[COLLECTION]/searchterm/[SEARCHINPUT]/field/all/mode/all/conn/all/order/nosort/ad/asc

or 

http://digital.chipublib.org/digital/search/searchterm/[SEARCHINPUT]

so the function simply inserts the user's input into those structures.  The former searches one or many collections (collection strings delimited with !, eg mpu!ChicagoParks, similar to the Browse button of the content pages), the latter searches all content.  

###### Browse Dropdown: 

Drops the Browse menu on click.  The Bibliocommons version disappears when you click off of the menu; I prefered to make it disappear when you click on the menu, but not on a link.

This becomes a modal menu under 970px, like in bibliocommons.

###### Hotkeys:

There are event listeners for:
    Pressing enter when the search div is focused
        Expands the search input, calls the show/hide function
        (Used for a11y)
    Pressing enter when the search input field is focused
        Activates the search 
    Pressing escape when the Browse menu is visible 
        Hides the browse menu

###### Responsive elements: 

Normal responsive elements are used: under a certain size, the CPL logo changes and the browse/events buttons change, matching Bibliocommons.  These use Bootstrap's responsive classes (eg hidden-md-down). In addition to these Bootstrap responses, there are javascript listeners for window resizing.

When a user resizes the window and crosses the 970px threshold, the browse dropdown will hide, and the search inputs, when visible, will hide again.  (The modal version of the browse menu is not responsive; it seemed too disorienting when it disappeared on resize.  This is in line with Bibliocommons.)


##### _includes/libraries.html

The libraries file just adds the external libraries and frameworks that we use, including our own CSS and js files.

##### _includes/sidebar.html

The sidebar has a couple of important functions.  The show/hide buttons are pretty straightforward, but there are also two types of sidebars, the collapsable one that can be seen on the home page, and the fixed one that can be seen on the landing pages.  However, when the page width gets to a certain breakpoint (970px), the fixed sidebar becomes collapsable.  This is handled in the switchLayoutF() and switchLayoutC() functions.  It is important to recognize that in the fixed layout, the sidebar is a part of the main frame (the bootstrap container); the collapsable sidebar is outside of the main frame.  The result is the entire sidebar has to be removed (.detach()) and placed somewhere else in the DOM, rather than just changing some of its CSS.

The lists of subjects and locations are automagically created by iterating over the posts (see _posts/ section).  This was initially done because of how it was handled in the PHP version, but given how infrequently subjects and locations will be added, it's probably just as good to remove that complexity and make a standard HTML list.

#### _posts/

This folder contains the landing pages.

Jekyll is primarily used for blogs, so the easiest way to give it content is to pretend they're blog posts.  (It can also be done with arrays in the _data folder, but it's much more time consuming and provides no benefit other than conceptual cleanliness.)

Each subject, location, colletion, and subcollection gets a file here. 

The formatting of these files is very specific; new lines and tabs are vital to how Jekyll processes the data, so if things don't appear as expected, check that first.

Also note that the date field and the date in the filename are required by Jekyll; they aren't used in any way, but they need to be real dates.  They don't have to be accurate, just real.

Each piece of these files is used in the content page, so see the _layouts/content.html section for details.

#### _sass/, _sass/main.scss

Jekyll uses a Sass processor to handle CSS by default.  Sass simply extends the capabilities of CSS, enabling, for example, nesting, so, instead of: 

    .big-box {
        background-color: blue;
    }
    .big-box > .little-box {
        background-color: orange;
    }

You can write:

    .big-box {
        background-color: blue;
        .little-box {
            background-color: orange;
        }
    }

Given that all of the CSS was already written for the PHP version, which didn't use Sass, Sass features aren't actually used at all.  

#### _site/

When you "build" a jekyll site, all of the layouts and included content are processed and straightforward .html, .css, and .js files are created.  _site/ is where that content will go.  When you make changes, and run 'jekyll build', and upload the output to the ContentDM custom pages, these files are the ones to upload.

All of these files will be overwritten, so don't bother to make changes to them.

One note: when you upload the content, ContentDM does not understand tree structures in an upload, so you have to upload all of the HTML files first (the files in /site_), and then, in ContentDM, you have to navigate to assets/js/ and upload the contents of _site/assets/js/ there, then assets/css/ & _site/assets/css, etc.  All files have to be uploaded to the correct folder.

#### .sass-cache/

This is for the sass processing.  Ignore/don't touch.

#### assets/

All collateral content is stored here.

##### _assets/css/

The simpleLightbox that handles the images on the landing pages came with css; that file is here.  No need to mess with it unless you're updating simpleLightbox.

It's also the location of the core .scss file, which simply tells Jekyll & Sass what to process.  

##### _assets/images/

Several images that we use aren't actually in ContentDM; they're here.  You shouldn't have any trouble undertanding what they are by looking at them.

The aldermen images are also here, in the Officials folder.

##### _assets/js/

This is where our javascript files are located.

_aldermen-db.js_ & _caa-db.js_ are simply the data, not the actual functions that are used in the pages.  When updating the data via excel export, this is where those files should be placed.

_content.js_ was recently split from cpldc.js to prevent large, heavyweight functions being called unnecessarily.  (The blogs and events were the main problem; you don't need to go and get a 10,000 line events rss file when you aren't using it, like on the home page or the city officials page.)

_cpldc.js_ is the primary js file; almost all functions are here.  The code is explained in comments in the file, so there's no need to go through it here.

_simpleLightbox.js_ is worth mentioning because it's been modified.  In line 286, we've added 

    onload="rightsInsertion(this)" 

which adds the little (i) on the MPU images in the lightbox.  These will probably be removed, however, because the event listeners for the image load have to be refreshed every time the user clicks, and this is expensive and complex behavior that's offers information that's redundant.  The rights (i) appears on the image before it's opened in the lightbox, which is adequate.

#### /_config.yml

This is the core config file for Jekyll.  While there are a number of minor options, the most important aspect is the 'baseurl' which is the string that needs to be in every link.  While the field is called baseurl, it's really the appended part of the url, so the url is actually:

    url/baseurl

#### /_about.md, all.md, caa.md, etc

All the *.md files at the top level are the files which indicate what should be built.  Each unique page should have one. As you will see from looking at them, some are very simple pages; their core content is elsewhere.  Others have their content written in markdown in the file.  

Jekyll will, by default, process all *.md files in the root directory, so any new, unique pages you would like to add should be handled that way.  New collections, subjects, locations, etc, should be treated like the others, in the _posts/ folder.