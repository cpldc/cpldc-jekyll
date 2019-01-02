    <div class="blogs-title">
        <h2>Chicago History Blog</h2>
    </div>
<?php
    $cache_time = 60 * 60 * 12;
    // $cache_time = 1;
    $cache_file = 'blogs.html';
    $timedif = (time() - filemtime($cache_file));
    $limit = 3;
    $htmlStr = '';

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
        for($x=0;$x<$limit;$x++) {
            $title = str_replace(' & ', ' &amp; ', $feed[$x]['title']);
            $link = $feed[$x]['link'];
            $author = $feed[$x]['author'];
            $description = $feed[$x]['desc'];
            $pos=strpos($description, ' ', 60);
            $date = date('F j, Y', strtotime($feed[$x]['date']));
            $htmlStr .= '<dl><dt class="blogpost-title"><a href="' . $link . '" class="blogpost-link">' . $title . '<i class="raquo fa fa-angle-double-right" aria-hidden="true"></i></a></dt><dd class="blogpost-author-date"> By: ' . $author . ', ' . $date . '</dd><dd class="blogpost-description">' . substr($description,0,65 ) . '&hellip;</dd></dl>';
        }
        $htmlStr = '<div class="blogpost">' . $htmlStr . '</div>';
        file_put_contents('blogs.html', $htmlStr);
    }
    include $cache_file;
?>
<div class="blogs-viewmore"><a href="https://www.chipublib.org/blogs/category/chicago-history/" aria-label="View More Blog Posts">View More <i class="rsaquo fa fa-angle-right"  aria-hidden="true"></i></a></div>
