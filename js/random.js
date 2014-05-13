
function Random() {

    function randomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.getRandomInt = randomInt;

    function randomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    this.getRandomColor = randomColor;
}

var Random = new Random();
