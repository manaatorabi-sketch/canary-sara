$("#fal").click(function () {
    let r = rand(0, hafez.length - 1);
    $("#result")
        .html(
            `<h2 class="text-center">${hafez[r].Title}</h2>
             <div class="text-center">${hafez[r].Poem.replaceAll("\n", "<br>")}</div>`
        )
        .fadeIn(300);
});
let dailyFal = [
    "امروز فرصت خوبی برای شروع کار جدید داری.",
    "از یک خبر خوشحال‌کننده باخبر خواهی شد.",
    "در رابطه با تصمیمی مهم آرامش داشته باش."
];

let monthlyFal = [
    "این ماه مسیرهای تازه‌ای برای تو باز می‌شود.",
    "در مسائل مالی بهبود قابل توجهی خواهی داشت.",
    "رابطه‌ات با اطرافیان بهتر می‌شود."
];

let weeklyFal = [
    "سال پیش رو برایت پر از تغییرات مثبت خواهد بود.",
    "به یک موفقیت مهم دست پیدا خواهی کرد.",
    "در این سال یک آشنایی جدید برایت تاثیرگذار می‌شود."
];
function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

$("#daily").click(function() {
    $("#result")
        .html(`<h2 class="text-center">فال روزانه</h2>
               <div class="text-center">${randomItem(dailyFal)}</div>`)
        .fadeIn(300);
});

$("#weekly").click(function() {
    $("#result")
        .html(`<h2 class="text-center">فال هفتگی</h2>
               <div class="text-center">${randomItem(weeklyFal)}</div>`)
        .fadeIn(300);
});

$("#monthly").click(function() {
    $("#result")
        .html(`<h2 class="text-center">فال ماهانه</h2>
               <div class="text-center">${randomItem(monthlyFal)}</div>`)
        .fadeIn(300);
});
$("#fal").click(function () {
    let r = rand(0, hafez.length - 1);
    let gh = hafez[r];
    });


