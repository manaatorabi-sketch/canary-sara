
function rand(min, max) {
  
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function () {
    $(document).on('click', '#quran', function(e) {
        e.preventDefault(); 

        if (typeof quran === 'undefined' || !Array.isArray(quran) || quran.length === 0) {
            console.error("آرایه quran تعریف نشده، خالی است یا آرایه نیست!");
            // نمایش یک پیام به کاربر در صورت نبودن داده
            $('#result').html('<div class="text-center text-danger">خطا: داده‌های استخاره در دسترس نیست.</div>');
            return;
        }

        let r = rand(0, quran.length - 1);
        
        if (!quran[r] || typeof quran[r].total_verses === 'undefined' || typeof quran[r].verses === 'undefined') {
            console.error("ساختار داده در آرایه quran نامعتبر است.");
             $('#result').html('<div class="text-center text-danger">خطا: ساختار داده استخاره نامعتبر است.</div>');
            return;
        }

        let htmlContent = 
            '<h2 class="text-center">' + quran[r].total_verses + '</h2>' +
            '<div class="text-center">' + quran[r].verses.replace(/\n/g, "<br>") + '</div>';

        $('#result')
            .html(htmlContent)
            .hide() // مخفی کردن قبل از نمایش با انیمیشن
            .fadeIn(300); // نمایش با افکت
    });
});

