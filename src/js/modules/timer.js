const timer = (id, deadline) => {
    function getTimeRemaning(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
              
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // function getZero(num){
    //     if(num >= 0 && num <10){
    //         return `0${num}`;
    //     } else {
    //         return num;
    //     }
    // }

    function addZero(num){
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock(){
            const t = getTimeRemaning(endtime);

            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            // количество секунд котрое есть в тотале
            if (t.total <= 0){
                clearInterval(timerInterval);
            }
        }
    }

    setClock(id, deadline);
};

export default timer;