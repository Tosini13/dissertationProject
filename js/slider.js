
// SLIDER

$(document).ready(function () {
    $(".trainers").slick({
        prevArrow: '<i class="demo-icon icon-ico_arrow-left slick-my-next"></i>',
        nextArrow: '<i class="demo-icon icon-ico_arrow-right slick-my-prev"></i>',
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [{
            breakpoint: 979,
            settings: {
                // centerMode: true,
                dots: true,
                arrows: false
            }
        }]
    });
});