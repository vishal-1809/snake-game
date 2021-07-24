document.addEventListener('DOMContentLoaded', () => {
    const box = document.querySelectorAll('.grid div');
    const start = document.querySelector('.newgame');
    const over = document.querySelector('.gameover');
    let snake = [2, 1, 0];
    let head = 2;
    let tail = 0;
    let apple = 18;
    let direction = 1;
    let score = 0;
    let speed = 0.1;
    let time = 1000;
    let interval = 0;
    const len = 20;
    let pre = 37;


    function newgame() {
        snake.forEach(index => box[index].classList.remove('snake'));
        for (let index = 0; index < box.length; index++) {
            box[index].classList.remove('apple');
        }
        clearInterval(interval);
        snake = [2, 1, 0];
        head = 2;
        tail = 0;
        apple = 18;
        direction = 1;
        score = 0;
        document.getElementById('score').innerHTML = `${score}`;
        speed = 0.9;
        time = 1000;
        pre = 37;
        apple = generate_apple();
        snake.forEach(index => box[snake[index]].classList.add('snake'));
        interval = setInterval(gameon, time);
    }

    function gameon() {
        // console.log('called');
        if (
            (snake[0] + len >= (len * len) && direction === len) ||
            (snake[0] % len === len - 1 && direction === 1) ||
            (snake[0] % len === 0 && direction === -1) ||
            (snake[0] - len < 0 && direction === -len) ||
            box[snake[0] + direction].classList.contains('snake')
        ) {
            // console.log('over');
            over.classList.add('disp');
            over.classList.add('header');
            return clearInterval(interval);
        }

        // console.log('hello');
        tail = snake.pop();
        box[tail].classList.remove('snake');
        box[snake[0]].classList.remove('round');
        snake.unshift(snake[0] + direction);
        // box[snake[0]+direction].classList.add('snake');

        if (box[snake[0]].classList.contains('apple')) {
            box[snake[0]].classList.remove('apple');
            // box[snake[0]].classList.add('snake');
            box[tail].classList.add('snake');
            snake.push(tail);
            generate_apple();
            score++;
            document.getElementById('score').innerHTML = `${score}`;
            clearInterval(interval);
            time = time * speed;
            interval = setInterval(gameon, time);
        }
        box[snake[0]].classList.add('snake');
        box[snake[0]].classList.add('round');
        
    }

    function generate_apple() {
        do {
            apple = Math.floor(Math.random() * box.length);
        } while (box[apple].classList.contains('snake'));
        box[apple].classList.add('apple');
    }


    function control(e) {
        if (e.keyCode === 39 && pre !== 37) { // right
            direction = 1;
            // console.log(e.keyCode,pre);
            pre = 39;
            box[tail].classList.remove('snake');
        } else if (e.keyCode === 38 && pre !== 40) { // up
            direction = -len;
            // console.log(e.keyCode,pre);
            pre = 38;
            box[tail].classList.remove('snake');
        } else if (e.keyCode === 37 && pre !== 39) { // left
            direction = -1;
            // console.log(e.keyCode,pre);
            pre = 37;
            box[tail].classList.remove('snake');
        } else if (e.keyCode === 40 && pre !== 38) { // down
            direction = +len;
            // console.log(e.keyCode,pre);
            pre = 40;
            box[tail].classList.remove('snake');
        }
    }

    document.addEventListener('keyup', control)
    start.addEventListener('click', newgame);

})