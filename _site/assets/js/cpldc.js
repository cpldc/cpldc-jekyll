
            $( "#hideSidebar" ).click(function() {
                console.log('clicked to hide');
                $('#sidebar-toplevel').hide();
                $('#showSidebar').show();
                $('.grid').width('100%');
            });
            $( "#showSidebar" ).click(function() {
                console.log('clicked to hide');
                $('#sidebar-toplevel').show();
                $('#showSidebar').hide();
            });