window.addEventListener("load", event => {

    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    var today = new Date();
    var newdate = new Date();



    setTimeout(() => {
        let countDown = new Date(newdate.setDate(today.getDate() + 60)).getTime(),
            x = setInterval(function () {

                let now = new Date().getTime(),
                    distance = countDown - now;

                document.getElementById('days').innerText = Math.floor(distance / (day)),
                    document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
                    document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
                    document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

            }, second)


    }, 500);

    if (window.innerWidth < 799) {
        document.querySelector('.wrapper').style.height = window.innerHeight + "px";
    }

});