function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let chances = [
    ` 20% کرست‌ قناری`,
    `پوچ`,
    `15٪ یلو فکتور`,
    `15٪ ردفکتور`,
    `15٪وایت‌فکتور `,
    `پوچ`,
    `20٪ رازا`,
    `پوچ`,
    `دو تا بخر یکی ببر!`,
    ` تخفیف ویژه `,
];

let textRotationDegree = -72;
for (let i = 0; i < chances.length; i++) {
    $(`#circle`).append(`<div style="transform: rotate(${textRotationDegree}deg) translateY(-50%)">${chances[i]}</div>`);
    textRotationDegree += 36;
}

// Flag to track if the user has already spun
let hasSpun = false;

$(`#chance`).click(function () {
    if (!hasSpun) {
        $(`#circle`).removeClass(`rotate`);
        let chance = rand(0, 9);
        let rotationDegree = (chance * 36 + (360 * 3) + 18); // برای چرخش گردونه ی شانس
        $('body').append(`
            <style>
            @keyframes rotate{
        to{
            transform: rotate(${-rotationDegree}deg);
        }
    }
    .rotate{
        animation: rotate 3s ease forwards;
    }
            </style>
     `);
        $(`#circle`).addClass(`rotate`);

        // Set the flag to true after the first spin
        hasSpun = true;
    } else {
        alert("فقط یک بار میتونی شانستو امتحان کنی");
    }
});

$(`#refreshBtn`).on(`click`, function () {
    $(`#myDiv`).load(`tools/chance/index.html #myDiv>*`);
    // Reset the flag when the roulette is refreshed
    hasSpun = false;
});




//document.querySelector(`#circle`).style.backgroundColor
//.css(`background`)
//.css(`border`,`1px solid back`)
/* .css({
        'border':'1px solid black',
        'background-color':'red'
})*/

/* .animate({
    marginLeft:'20px',
    width:'200px'
},2000)*/
