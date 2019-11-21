(function ($) {
    $(function () {

        $('.examples__round-wrap_one').viewportChecker({
            classToAdd: 'round-one',
            offset: 400
        });

        $('.examples__round-wrap_two').viewportChecker({
            classToAdd: 'round-two',
            offset: 340
        });

        $('.examples__round-wrap_three').viewportChecker({
            classToAdd: 'round-three',
            offset: 280
        });

        $('.examples__round-wrap_four').viewportChecker({
            classToAdd: 'round-four',
            offset: 220
        });

        $('.examples__line_one').viewportChecker({
            classToAdd: 'line-one',
            offset: 400
        });

        $('.examples__line_two').viewportChecker({
            classToAdd: 'line-two',
            offset: 340
        });

        $('.examples__line_three').viewportChecker({
            classToAdd: 'line-three',
            offset: 280
        });

        $('.examples__line_four').viewportChecker({
            classToAdd: 'line-four',
            offset: 220
        });

        // Smooth scrolling
        $('.anchor').on('click', e => {
            e.preventDefault();

            const link = $(e.target).attr('href');

            let top = $(link).offset().top;
            setTimeout(() => {
                $('body, html').animate({scrollTop: top}, 1000);
            }, 1000)
        })

    });
})(jQuery);
