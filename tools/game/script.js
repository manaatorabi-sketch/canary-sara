$(document).ready(function() {
    let gameTimer = 25; // زمان بازی را ۲۵ ثانیه تنظیم می‌کند.
    let gameInterval; // برای نگهداری شناسه تایمر بازی استفاده می‌شود.
    let ballonInterval; // برای نگهداری شناسه زمان‌بندی ایجاد بادکنک‌ها.
    const maxConcurrentBallons = 5; // حداکثر تعداد بادکنک‌هایی که همزمان روی صفحه می‌توانند باشند.



    function getRandomPosition() {
        const maxX = $(window).width() - 80; // حداکثر مختصات X، با در نظر گرفتن عرض بادکنک (۸۰ پیکسل).
        const maxY = $(window).height() - 120; // حداکثر مختصات Y، با در نظر گرفتن ارتفاع بادکنک (۱۲۰ پیکسل).
        const x = Math.floor(Math.random() * maxX); // تولید یک موقعیت تصادفی X.
        const y = Math.floor(Math.random() * maxY); // تولید یک موقعیت تصادفی Y.
        return { x, y }; // یک شیء شامل مختصات x و y برمی‌گرداند.
    }

    function createBallon() {
        if ($('.ballon').length >= maxConcurrentBallons) return; // اگر تعداد بادکنک‌ها به حد مجاز رسید، بادکنک جدیدی ایجاد نمی‌کند.

        const position = getRandomPosition(); // گرفتن یک موقعیت تصادفی برای بادکنک جدید.
        // انتخاب یک رنگ تصادفی از آرایه 'colors' (فرض می‌شود این آرایه از قبل تعریف شده باشد).
        const color = colors[Math.floor(Math.random() * colors.length)];
        // ایجاد یک عنصر div جدید، اضافه کردن کلاس‌های 'ballon' و کلاس رنگ تصادفی.
        const $ballon = $('<div>').addClass('ballon').addClass(color);
        $ballon.css({
            left: position.x + 'px', // تعیین موقعیت افقی بادکنک.
            top: position.y + 'px', // تعیین موقعیت عمودی بادکنک.
            // اعمال انیمیشن CSS به نام 'float' با مدت زمان تصادفی بین ۳ تا ۶ ثانیه، که به صورت نامحدود تکرار می‌شود.
            animation: `float ${(Math.random() * 3 + 3)}s ease-in-out infinite`
        });
        function popBallon() {
            const $this = $(this); // 'this' به عنصر بادکنک کلیک شده اشاره دارد.
            const popSound = $('#pop-sound')[0]; // عنصر صوتی با شناسه 'pop-sound' را پیدا می‌کند.
            popSound.currentTime = 0; // پخش صدا را به ابتدای آن بازنشانی می‌کند.
            popSound.play(); // صدای ترکیدن بادکنک را پخش می‌کند.
    
            $this.addClass('burst'); // کلاس 'burst' را به بادکنک اضافه می‌کند (احتمالا برای افکت انفجار در CSS).
            // بادکنک را پس از ۴۰۰ میلی‌ثانیه از DOM حذف می‌کند.
            setTimeout(() => $this.remove(), 400);
        }
    
    }

    function startGame() {
        $('.timer').text(`زمان: ${gameTimer}`); // نمایش اولیه زمان بازی.
        gameInterval = setInterval(function() { // شروع تایمر اصلی بازی.
            gameTimer--; // شمارش معکوس زمان.
            $('.timer').text(`زمان: ${gameTimer}`); // به‌روزرسانی نمایش زمان.
            if (gameTimer <= 0) { // بررسی تمام شدن زمان.
                clearInterval(gameInterval); // توقف تایمر بازی.
                clearInterval(ballonInterval); // توقف ایجاد بادکنک‌ها.
                $('#lose-message').fadeIn(); // نمایش پیام باخت (فرض می‌شود مخفی است).
                // حذف event listener کلیک روی بادکنک‌ها برای جلوگیری از ادامه بازی.
                $('.game-container').off('click', '.ballon');
            }
        }, 1000); // هر ۱ ثانیه اجرا می‌شود.

        ballonInterval = setInterval(createBallon, 1500); // شروع زمان‌بندی برای ایجاد بادکنک‌ها هر ۱.۵ ثانیه.
        // خط اصلی کد:
        // $('.ballon').on('click', '.ballon', popBallon);
        // این خط مشکل دارد چون بادکنک‌ها دینامیک اضافه می‌شوند. باید از event delegation استفاده کرد:
         $('.game-container').on('click', '.ballon', popBallon); // روش صحیح برای مدیریت کلیک روی بادکنک‌های اضافه شده به صورت دینامیک.
    }

    function winGame() {
        clearInterval(gameInterval); // توقف تایمر بازی.
        clearInterval(ballonInterval); // توقف ایجاد بادکنک‌ها.
        $('#win-message').fadeIn(); // نمایش پیام برد (فرض می‌شود مخفی است).
        $('.ballon').off('click', '.ballon'); // حذف event listener کلیک.
    }

    // اضافه کردن یک event listener که فقط یک بار اجرا می‌شود.
    $('.ballon').one('click', function() {
        startGame(); // با کلیک روی اولین بادکنک، بازی شروع می‌شود.
    });

    // جلوگیری از انتخاب متن در کل صفحه هنگام بازی.
    $('body').on('selectstart', () => false);
});

document.querySelector('.btn2').addEventListener('click', function() {
    // با کلیک روی btn2، به فایل index.html در دو پوشه بالاتر می‌رود.
    window.location.href = '../../index.html';
  });
  document.querySelector('#startButton').addEventListener('click', function() {
    // بررسی می‌کنیم که آیا بازی قبلاً شروع شده است یا خیر
    if (!isGameStarted) {
      startGame(); // تابع شروع بازی را فراخوانی می‌کنیم
      isGameStarted = true; // وضعیت بازی را به شروع شده تغییر می‌دهیم
      // می‌توانید در اینجا ظاهر دکمه را هم تغییر دهید (مثلا به آیکن مکث)
      const button = document.querySelector('#startButton');
      button.innerHTML = '<i class="bi bi-pause"></i> مکث'; // یا هر متن دیگری
    }
  });
  const startButton = document.getElementById('startButton');
  const buttonIcon = document.getElementById('buttonIcon');
  
  startButton.addEventListener('click', function() {
      if (buttonIcon.classList.contains('bi-play')) {
          buttonIcon.classList.remove('bi-play');
          buttonIcon.classList.add('bi-stop');
          startButton.innerHTML = '<i class="bi bi-pause"></i> توقف بازی';
      } else {
          buttonIcon.classList.remove('bi-stop');
          buttonIcon.classList.add('bi-play');
          startButton.innerHTML = '<i class="bi bi-play"></i> شروع بازی';
      }
  });  

if(document.querySelector('.btn btn1')) // چک می‌کند آیا عنصری با کلاس‌های 'btn' و 'btn1' وجود دارد.
document.querySelector('.btn btn1').addEventListener('click', function() {
    // با کلیک روی btn1، به مسیر 'timer' می‌رود (مثلاً صفحه یا بخشی دیگر).
    window.location.href = 'timer';
  });
  document.addEventListener('DOMContentLoaded', function() { // اطمینان از بارگذاری کامل DOM قبل از اجرای کد.

    const settingsBtn = document.querySelector('.settings-btn'); // دکمه تنظیمات.
    const settingsModal = document.querySelector('#settings-modal'); // پنجره مودال تنظیمات.
    const closeSettingsBtn = document.querySelector('#close-settings'); // دکمه بستن (X) مودال.
    const saveSettingsBtn = document.querySelector('#save-settings'); // دکمه ذخیره تنظیمات.
    const cancelSettingsBtn = document.querySelector('#cancel-settings'); // دکمه لغو تنظیمات.

    // تابع برای باز کردن مودال تنظیمات
    function openSettingsModal() {
        if (!settingsModal) return; // اگر عنصر مودال وجود نداشت، خارج شو.
        settingsModal.style.display = 'block'; // مودال را قابل نمایش می‌کند.
        // استفاده از requestAnimationFrame برای اطمینان از اینکه مودال قبل از حذف کلاس 'hidden' رندر شده است،
        // تا انیمیشن fade-in فعال شود.
        requestAnimationFrame(() => {
             settingsModal.classList.remove('hidden');
        });
    }

    // تابع برای بستن مودال تنظیمات
    function closeSettingsModal() {
        if (!settingsModal) return;
        settingsModal.classList.add('hidden'); // کلاس 'hidden' را اضافه می‌کند تا انیمیشن fade-out شروع شود.

        // منتظر پایان انیمیشن CSS می‌ماند، سپس display را 'none' می‌کند.
        settingsModal.addEventListener('transitionend', function handleTransitionEnd() {
            settingsModal.style.display = 'none';
            // حذف event listener پس از یک بار اجرا شدن برای جلوگیری از نشت حافظه.
            settingsModal.removeEventListener('transitionend', handleTransitionEnd);
        }, { once: true }); // { once: true } باعث می‌شود شنونده فقط یک بار اجرا شود.
    }

    // اطمینان از اینکه مودال در زمان بارگذاری اولیه صفحه مخفی است.
    function ensureModalIsHiddenOnLoad() {
        if (settingsModal) {
            settingsModal.style.display = 'none';
            if (!settingsModal.classList.contains('hidden')) {
                settingsModal.classList.add('hidden');
            }
        }
    }

    // Event listener برای دکمه اصلی تنظیمات
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openSettingsModal);
    }

    // Event listener برای دکمه بستن (X)
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', closeSettingsModal);
    }

    // Event listener برای دکمه لغو
    if (cancelSettingsBtn) {
        cancelSettingsBtn.addEventListener('click', closeSettingsModal);
    }
    
    // Event listener برای دکمه ذخیره تنظیمات
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            // گرفتن مقادیر از ورودی‌های تنظیمات
            const difficulty = document.querySelector('#difficulty').value;
            const volume = document.querySelector('#volume').value;
            const showTips = document.querySelector('#show-tips').checked;
            
            console.log('تنظیمات ذخیره شد:', { difficulty, volume, showTips }); // ثبت تنظیمات در کنسول مرورگر.
            alert('تنظیمات بازی با موفقیت ذخیره شد!'); // نمایش پیام تایید.
            
            closeSettingsModal(); // بستن مودال پس از ذخیره.
        });
    }
    
    // بستن مودال با کلیک در خارج از آن
    window.addEventListener('click', function(event) {
        // بررسی می‌کند که آیا مودال نمایش داده شده است (display: 'block') و آیا هدف کلیک، خودِ پس‌زمینه مودال است (نه محتوای داخل آن).
        if (settingsModal && settingsModal.style.display === 'block' && event.target === settingsModal) {
            closeSettingsModal();
        }
    });
    
    // اجرای تابع برای اطمینان از مخفی بودن مودال هنگام بارگذاری اولیه صفحه.
    ensureModalIsHiddenOnLoad();

}); // پایان DOMContentLoaded


