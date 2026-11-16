$(window).load(function () {
    $('.loading').fadeOut('fast');
    $('.container').fadeIn('fast');
});
$('document').ready(function () {
    var vw;
    // Xếp 7 quả bóng thành hàng ngang, co giãn theo bề rộng màn hình
    function lineUpBalloons() {
        var w = $(window).width();
        var step = Math.min(100, (w - 16) / 7);
        // đặt hàng bóng ngay dưới tên (không che chữ)
        var name = $('#ten_xoai');
        var top = name.length ? name.offset().top + name.outerHeight() - 10 : (w < 600 ? 150 : 240);
        vw = w / 2;
        ['#b11', '#b22', '#b33', '#b44', '#b55', '#b66', '#b77'].forEach(function (id, k) {
            $(id).animate({ top: top, left: vw + (k - 3.5) * step }, 500);
        });
    }
    $(window).resize(function () {
        $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
        lineUpBalloons();
    });

    $('#turn_on').click(function () {
        $('#bulb_yellow').addClass('bulb-glow-yellow');
        $('#bulb_red').addClass('bulb-glow-red');
        $('#bulb_blue').addClass('bulb-glow-blue');
        $('#bulb_green').addClass('bulb-glow-green');
        $('#bulb_pink').addClass('bulb-glow-pink');
        $('#bulb_orange').addClass('bulb-glow-orange');
        $('body').addClass('peach');
        $(this)
            .fadeOut('slow')
            .delay(5000)
            .promise()
            .done(function () {
                $('#play').fadeIn('slow');
            });
    });
    $('#play').click(function () {
        var audio = $('.song')[0];
        audio.play();
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
        $('#bulb_red').addClass('bulb-glow-red-after');
        $('#bulb_blue').addClass('bulb-glow-blue-after');
        $('#bulb_green').addClass('bulb-glow-green-after');
        $('#bulb_pink').addClass('bulb-glow-pink-after');
        $('#bulb_orange').addClass('bulb-glow-orange-after');
        $('body').css('backgroud-color', '#FFF');
        $('body').addClass('peach-after');
        $(this)
            .fadeOut('slow')
            .delay(6000)
            .promise()
            .done(function () {
                $('#bannar_coming').fadeIn('slow');
            });
    });

    $('#bannar_coming').click(function () {
        $('.bannar').addClass('bannar-come');
        $(this)
            .fadeOut('slow')
            .delay(6000)
            .promise()
            .done(function () {
                $('#balloons_flying').fadeIn('slow');
            });
    });

    function loopOne() {
        var randleft = Math.max(0, $(window).width() - 100) * Math.random();
        var randtop = Math.max(0, $(window).height() - 250) * Math.random();
        $('#b1').animate(
            { left: randleft, bottom: randtop },
            10000,
            function () {
                loopOne();
            }
        );
    }
    function loopTwo() {
        var randleft = Math.max(0, $(window).width() - 100) * Math.random();
        var randtop = Math.max(0, $(window).height() - 250) * Math.random();
        $('#b2').animate(
            { left: randleft, bottom: randtop },
            10000,
            function () {
                loopTwo();
            }
        );
    }
    function loopThree() {
        var randleft = Math.max(0, $(window).width() - 100) * Math.random();
        var randtop = Math.max(0, $(window).height() - 250) * Math.random();
        $('#b3').animate(
            { left: randleft, bottom: randtop },
            10000,
            function () {
                loopThree();
            }
        );
    }
    function loopFour() {
        var randleft = Math.max(0, $(window).width() - 100) * Math.random();
        var randtop = Math.max(0, $(window).height() - 250) * Math.random();
        $('#b4').animate(
            { left: randleft, bottom: randtop },
            10000,
            function () {
                loopFour();
            }
        );
    }
    function loopFive() {
        var randleft = Math.max(0, $(window).width() - 100) * Math.random();
        var randtop = Math.max(0, $(window).height() - 250) * Math.random();
        $('#b5').animate(
            { left: randleft, bottom: randtop },
            10000,
            function () {
                loopFive();
            }
        );
    }

    function loopSix() {
        var randleft = Math.max(0, $(window).width() - 100) * Math.random();
        var randtop = Math.max(0, $(window).height() - 250) * Math.random();
        $('#b6').animate(
            { left: randleft, bottom: randtop },
            10000,
            function () {
                loopSix();
            }
        );
    }
    function loopSeven() {
        var randleft = Math.max(0, $(window).width() - 100) * Math.random();
        var randtop = Math.max(0, $(window).height() - 250) * Math.random();
        $('#b7').animate(
            { left: randleft, bottom: randtop },
            10000,
            function () {
                loopSeven();
            }
        );
    }

    $('#balloons_flying').click(function () {
        $('.balloon-border').animate({ top: -500 }, 8000);
        $('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
        $('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
        // $('#b3').addClass('balloons-rotate-behaviour-two');
        // $('#b4').addClass('balloons-rotate-behaviour-one');
        // $('#b5').addClass('balloons-rotate-behaviour-one');
        // $('#b6').addClass('balloons-rotate-behaviour-two');
        // $('#b7').addClass('balloons-rotate-behaviour-one');
        loopOne();
        loopTwo();
        loopThree();
        loopFour();
        loopFive();
        loopSix();
        loopSeven();

        $(this)
            .fadeOut('slow')
            .delay(5000)
            .promise()
            .done(function () {
                $('#cake_fadein').fadeIn('slow');
            });
    });

    $('#cake_fadein').click(function () {
        $('.cake').fadeIn('slow');
        $(this)
            .fadeOut('slow')
            .delay(3000)
            .promise()
            .done(function () {
                $('#light_candle').fadeIn('slow');
            });
    });

    $('#light_candle').click(function () {
        $('.cake .flame').fadeIn('slow');
        $(this)
            .fadeOut('slow')
            .promise()
            .done(function () {
                $('#blow_hint').fadeIn('slow');
                $('#blow_candle').fadeIn('slow');
                window.HPBD && HPBD.candlesLit();
            });
    });

    $('#wish_message').click(function () {
        vw = $(window).width() / 2;

        $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
        $('#b1').attr('id', 'b11');
        $('#b2').attr('id', 'b22');
        $('#b3').attr('id', 'b33');
        $('#b4').attr('id', 'b44');
        $('#b5').attr('id', 'b55');
        $('#b6').attr('id', 'b66');
        $('#b7').attr('id', 'b77');
        lineUpBalloons();
        window.HPBD && HPBD.confetti(220);
        $('.balloons').css('opacity', '0.9');
        $('.balloons h2').fadeIn(3000);
        $(this)
            .fadeOut('slow')
            .delay(3000)
            .promise()
            .done(function () {
                $('#story').fadeIn('slow');
            });
    });

    $('#story').click(function () {
        $(this).fadeOut('slow');
        // mở thiệp chứa nguyên văn lời chúc (bỏ chuỗi câu chạy lần lượt)
        if (window.HPBD) { HPBD.openCard(); return; }
        $('.cake')
            .fadeOut('fast')
            .promise()
            .done(function () {
                $('.message').fadeIn('slow');
            });

        var i;
        var total = $('#texts-container p').length;

        function msgLoop(i) {
            $('#texts-container p:nth-child(' + i + ')')
                .fadeOut('slow')
                .delay(800)
                .promise()
                .done(function () {
                    i = i + 1;
                    $('#texts-container p:nth-child(' + i + ')')
                        .fadeIn('slow')
                        .delay(1800);
                    if (i == total + 1) {
                        $('#texts-container p:nth-child(' + total + ')')
                            .fadeOut('slow')
                            .promise()
                            .done(function () {
                                $('.cake').fadeIn('fast');
                                $('.love_text').css('display', 'block');
                                window.HPBD && HPBD.finale();
                                setTimeout(function () { $('#open_letter').fadeIn('slow'); }, 2500);
                            });
                    } else {
                        msgLoop(i);
                    }
                });
            // body...
        }

        msgLoop(0);
    });
});

