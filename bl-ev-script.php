<?php
    $elimit = 5;
    $eventsHtml = '';
        $rss = new DOMDocument();
        $rss->load('https://chipublib.bibliocommons.com/events/events/rss/all?nocache=');
        $feed = array();
        foreach ($rss->getElementsByTagName('item') as $node) {
            $item = array ( 
                'title' => $node->getElementsByTagName('title')->item(0)->nodeValue,
                'link' => $node->getElementsByTagName('link')->item(0)->nodeValue,
                'loc' => $node->getElementsByTagNameNS('http://bibliocommons.com/rss/1.0/modules/event/', 'name')->item(0)->nodeValue,
                'date' => $node->getElementsByTagNameNS('http://bibliocommons.com/rss/1.0/modules/event/', 'start_date')->item(0)->nodeValue,
                'cat' => $node->getElementsByTagName('category')->item(0)->nodeValue
                );
                if ($node->getElementsByTagName('category')->item(0)->nodeValue == 'History and Genealogy' ||
                    $node->getElementsByTagName('category')->item(1)->nodeValue == 'History and Genealogy' ||
                    $node->getElementsByTagName('category')->item(2)->nodeValue == 'History and Genealogy') 
                {
                    array_push($feed, $item);
                }
        }
        for($x=0;$x<$elimit;$x++) {
            $title = str_replace(' & ', ' &amp; ', $feed[$x]['title']);
            if ($title == '') {break;}
            $link = $feed[$x]['link'];
            $location = $feed[$x]['loc'];
            $locationLink = array_search($location, $LOCATIONLINKS);
            $date = date('M j', strtotime($feed[$x]['date']));
            $time = date('g:iA', strtotime($feed[$x]['date']));
            $eventsHtml .= '<div class="event"> <h3 class="event-title"><a href="' . $link . '" class="event-link">' . $title . '<i class="raquo fa fa-angle-double-right" aria-hidden="true"></i></a></h3><div class="event-location"><a href="' . $locationLink . '" class="event-location-link">' . $location . '</a></div><div class="event-datetime"><div class="event-date">' . $date . '</div><div class="event-time">' . $time . '</div></div></div>';
        }
        file_put_contents('jekyll/assets/html/events.html', $eventsHtml);


    $blimit = 5;
    $blogsHtml = '';

    // if blogs.html is older than 12 hours (60 seconds * 60 minutes * 12), it 
    //     gets the feed
    //     assigns pieces of it to variables
    //     pushes the variables into an array
    //     iterates through all the arrays to put the variables into html
    //     then saves blogs.html
    if ($cache_file && $timedif > $cache_time) {
        $rss = new DOMDocument();
        $rss->load('https://www.chipublib.org/blogs/category/chicago-history/feed/');
        $feed = array();
        foreach ($rss->getElementsByTagName('item') as $node) {
            $item = array ( 
                'title' => $node->getElementsByTagName('title')->item(0)->nodeValue,
                'link' => $node->getElementsByTagName('link')->item(0)->nodeValue,
                'author' => $node->getElementsByTagNameNS('http://purl.org/dc/elements/1.1/', 'creator')->item(0)->nodeValue,
                'date' => $node->getElementsByTagName('pubDate')->item(0)->nodeValue,
                'desc' => $node->getElementsByTagName('description')->item(0)->nodeValue,
                'cat' => $node->getElementsByTagName('category')->item(0)->nodeValue,
                );
                array_push($feed, $item);
        }
        for($x=0;$x<$blimit;$x++) {
            $title = str_replace(' & ', ' &amp; ', $feed[$x]['title']);
            $link = $feed[$x]['link'];
            $author = $feed[$x]['author'];
            $description = $feed[$x]['desc'];
            $pos=strpos($description, ' ', 60);
            $date = date('F j, Y', strtotime($feed[$x]['date']));
            $blogsHtml .= '<dl><dt class="blogpost-title"><a href="' . $link . '" class="blogpost-link">' . $title . '<i class="raquo fa fa-angle-double-right" aria-hidden="true"></i></a></dt><dd class="blogpost-author-date"> By: ' . $author . ', ' . $date . '</dd><dd class="blogpost-description">' . substr($description,0,65 ) . '&hellip;</dd></dl>';
        }
        $blogsHtml = '<div class="blogpost">' . $blogsHtml . '</div>';
        file_put_contents('jekyll/assets/html/blogs.html', $blogsHtml);
    }
?>

