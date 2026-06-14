document.addEventListener('DOMContentLoaded', function() {
    // ارجاع به عناصر HTML
    const startInput = document.getElementById('startInput');
    const endInput = document.getElementById('endInput');
    const runBtn = document.getElementById('runBtn');
    const outputPre = document.getElementById('output');
    // تابع اصلی برای تولید و نمایش اعداد
    function generatePaddedNumbers() {
        // گرفتن مقادیر ورودی از اینپوت‌ها
        const start = parseInt(startInput.value);
        const end = parseInt(endInput.value);

        // اعتبارسنجی ورودی‌ها
        if (isNaN(start) || isNaN(end)) {
            outputPre.textContent = "لطفاً هر دو عدد را وارد کنید";
            return;
        }
        if (start > end) {
            outputPre.textContent = "عدد شروع باید کوچکتر یا مساوی عدد پایان باشد";
            return;
        }

        // محاسبه طول بزرگترین عدد (عدد پایان) برای padStart
        // !!! تغییر این خط: maxLength را روی 2 تنظیم می کنیم !!!
        const maxLength = Math.max(end.toString().length, 2); // اطمینان حاصل کنید که حداقل طول 2 باشد
        let outputText = '';

        // حلقه برای تولید اعداد و اضافه کردن به رشته خروجی
        for (let i = start; i <= end; i++) {
            // استفاده از padStart برای اضافه کردن صفر از سمت چپ
            outputText += i.toString().padStart(maxLength, '0') + '\n'; 
        }

        // نمایش رشته خروجی در المنت <pre>
        outputPre.textContent = outputText.trim(); // trim() برای حذف خط جدید اضافی در انتها
    }

    // اتصال تابع به رویداد کلیک دکمه
    runBtn.addEventListener('click', generatePaddedNumbers);

    // (اختیاری) اگر می‌خواهید با زدن Enter در فیلد پایان، تابع اجرا شود:
    endInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            generatePaddedNumbers();
        }
    });
});
