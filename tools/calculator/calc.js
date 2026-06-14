$('#menu-toggle').click(function () {
    var modeButtons = $('#keypad .mode');
    if (modeButtons.first().css('display') == 'none') {
        modeButtons.css('display', 'block');
    } else {
        modeButtons.css('display', 'none');
    }
});

let a = 0, op = "+";
let input = $('#input');

$('#calculator button').addClass('btn1 btn-outline-secondary');

// دکمه‌های عددی
$('.num').click(function () {
    let inp = input.val();
    let num = $(this).text();
    if (num !== '.' || !inp.includes('.')) {
        input.val(inp + num);
    }
});

// عملگرها
$('.op').click(function () {
    a = input.val();
    op = $(this).text();
    input.val('').focus();

    let num = parseFloat(a);

    switch (op) {

        // x^2
        case "x2":
        case "x²":
        case "x<sup>2</sup>":
            a = Math.pow(num, 2);
            input.val(a);
            break;

        // ریشه
        case "√x":
            a = Math.sqrt(num);
            input.val(a);
            break;

        // 1/x
        case "1/x":
            a = 1 / num;
            input.val(a);
            break;

        // قدرمطلق
        case "|x|":
            a = Math.abs(num);
            input.val(a);
            break;

        // exp → e^x
        case "exp":
            a = Math.exp(num);
            input.val(a);
            break;

        // لگاریتم پایه 10
        case "log":
            a = Math.log10(num);
            input.val(a);
            break;

        // ln
        case "ln":
            a = Math.log(num);
            input.val(a);
            break;

        // 10^x
        case "10x":
        case "10<sup>x</sup>":
            a = Math.pow(10, num);
            input.val(a);
            break;

        // فاکتوریل
        case "n!":
            let fact = 1;
            for (let i = 1; i <= num; i++) fact *= i;
            a = fact;
            input.val(a);
            break;

        // عدد e
        case "e":
            a = Math.E;
            input.val(a);
            break;

        // π
        case "π":
        case "&pi;":
            a = Math.PI;
            input.val(a);
            break;

        // ±
        case "+/-":
            a = -num;
            input.val(a);
            break;

        // mod
        case "mod":
            // در = انجام می‌شود
            break;

        // xy → توان
        case "xy":
        case "x<sup>y</sup>":
            // در مساوی انجام می‌شود
            break;
    }
});

// مساوی
$('#eq').click(function () {

    let b = input.val();
    let numA = parseFloat(a);
    let numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) {
        input.val("error");
        return;
    }

    switch (op) {
        case "+":
            a = numA + numB;
            break;

        case "-":
            a = numA - numB;
            break;

        case "x":
            a = numA * numB;
            break;

        case "÷":
            a = (numB === 0) ? "warning '0'" : numA / numB;
            break;

        case "mod":
            a = numA % numB;
            break;

        case "x<sup>y</sup>":
        case "xy":
            a = Math.pow(numA, numB);
            break;
    }

    input.val(a);
});

// بک‌اسپیس
$('#backspace').click(function () {
    input.val(input.val().slice(0, -1));
});

// پاک کردن
$('#clear').click(function () {
    input.val('');
    a = 0;
    op = '+';
});

input.focus();
