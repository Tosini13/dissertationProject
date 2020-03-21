<div id="scrollup" class="fas fa-caret-square-up mt-5 mt-md-0 mb-md-5">
</div>
<script>
    function scrollup() {

        if ($(document).scrollTop() < 120) {
            $('#scrollup').hide();
        } else {
            $('#scrollup').show();
        }

        $(document).scroll(function () {
            if ($(document).scrollTop() < 120) {
                $('#scrollup').fadeOut();
            } else {
                $('#scrollup').fadeIn();
            }
        });


        $('#scrollup').click(function () {
            $('html, body').animate({
                scrollTop: $('#index_content').offset().top
            }, 1000);
        });


        var bool = false;
        $('#scrollup').each(function () {
            $(this).mouseover(function () {
                if (!bool) {
                    $(this).animate({
                        width: '-=10px',
                        paddingLeft: '-=5px'
                    });
                    bool = true;
                }
            });
            $(this).mouseleave(function () {
                if (bool) {
                    $(this).animate({
                        width: '+=10px',
                        paddingLeft: '+=5px'
                    });
                    bool = false;
                }
            });
        });
    }
</script>
<style>
    #scrollup{
        display: block;
        position: fixed;
        top: 80vh;
        right: 2vw;
        height: 204px;
        width: 50px;
        z-index: 1;
        text-decoration: none;
        color: #2d2a2a;
        text-align: center;
        font-size: 30px;
        height: 50px;
        width: 50px;
        cursor: pointer;
    }

    #scrollup:hover{
        color: rgba(45, 42, 42,0.5);
    }
</style>