const Board = (_ => {
    let livesLeft = null;

    let canvas;
    let context;

    const init = _ => {
        canvas = document.querySelector('.hangman__board');
        context = canvas.getContext('2d');
        context.lineWidth = 2;
        context.strokeStyle = 'white';
        base();
    }

    const drawLine = (startX, startY, endX, endY) => {
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
    }

    const base = _ => {
        line1();
        line2();
        line3();
        rope();
        line4();
        line5();
        line6();
    }
    const head = _ => {
        context.beginPath();
        context.arc(80, 35, 15, 0, Math.PI * 2);
        context.stroke();
    }
    const face = _ => {
        mouth();
        eyes();
    }
    const mouth = _ => {
        context.beginPath();
        context.arc(80, 45, 6, Math.PI * 1, 0);
        context.stroke();
    }
    const eyes = _ => {
        line7();
        line8();
        line9();
        line10();
    }

    const line1 = _ => drawLine(15, 145, 130, 145);
    const line2 = _ => drawLine(40, 10, 40, 145);
    const line3 = _ => drawLine(25, 10, 90, 10);
    const line4 = _ => drawLine(40, 120, 55, 145)
    const line5 = _ => drawLine(40, 120, 25, 145)
    const line6 = _ => drawLine(40, 25, 60, 10)
    const rope = _ => drawLine(80, 10, 80, 20);

    const torso = _ => drawLine(80, 50, 80, 95);
    const rightArm = _ => drawLine(80, 60, 100, 70);
    const leftArm = _ => drawLine(80, 60, 60, 70);
    const rightLeg = _ => drawLine(80, 95, 100, 125);
    const leftLeg = _ => drawLine(80, 95, 60, 125);

    const line7 = _ => drawLine(73, 30, 78, 33);
    const line8 = _ => drawLine(78, 30, 73, 33);
    const line9 = _ => drawLine(83, 30, 88, 33);
    const line10 = _ => drawLine(88, 30, 83, 33);

    const parts = [face, rightLeg, leftLeg, rightArm, leftArm, torso, head]

    const render = _ => {
        parts[livesLeft]();
    }
    const setLives = newLives => {
        livesLeft = newLives;
        render();
    }

    return {
        init,
        setLives
    }
})();

export default Board;