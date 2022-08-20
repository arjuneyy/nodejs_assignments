(function () {
    function StopWatch() {
        let startTime = 0;
        let endTime = 0;
        let duration = 0;
        let running = false;

        Object.defineProperty(this, "startTime", {
            get: function () {
                return startTime;
            },
            set: function (value) {
                startTime = value;
            }
        });
        Object.defineProperty(this, "endTime", {
            get: function () {
                return endTime;
            },
            set: function (value) {
                endTime = value;
            }
        });
        Object.defineProperty(this, "duration", {
            get: function () {
                if (this.running) {
                    throw new Error("Watch not running");
                }
                return duration;
            },
            set: function (value) {
                duration = value;
            }
        });
        Object.defineProperty(this, "running", {
            get: function () {
                return running;
            },
            set: function (value) {
                running = value;
            }
        });


        this.start = function () {
            running = true;
        }

        this.stop = function () {
            if (!running) {
                message = "Watch is not running.";
                alert(message);
                throw new Error(message);
            }
            duration += startTime;
            running = false;
        }

        this.reset = function () {
            startTime = 0;
            endTime = 0;
            duration = 0;
            running = false;
        }
    }

    const watch = new StopWatch();
    let [second, millisecond] = [0, 0];
    let interval = null;
    let timerEl = document.getElementById("timer");
    let durationEl = document.getElementById("duration");

    document.getElementById("start").addEventListener('click', () => {
        if (!watch.running) {
            watch.start();
            interval = setInterval(() => {
                millisecond += 10;
                if (millisecond % 1000 === 0) {
                    millisecond = 0;
                    second += 1;
                }
                watch.startTime = parseFloat(`${second}.${millisecond}`);
                timerEl.innerHTML = `${second}.${millisecond}`;
            }, 10);
        } else {
            message = "Watch is already running.";
            alert(message)
            throw new Error(message);
        }
    });

    document.getElementById("stop").addEventListener('click', () => {
        clearInterval(interval);
        watch.stop();
        durationEl.innerHTML = watch.duration;

    });

    document.getElementById("reset").addEventListener('click', () => {
        clearInterval(interval);
        watch.reset();
        timerEl.innerHTML = "0.00";
        durationEl.innerHTML = "0";
    });

})();