/*let x=(0.2*10+0.1*10)/10;
alert(x);*/
// بستن لایه dim هنگام کلیک روی آن
let photoValidExtensions = ['jpg', 'png', 'webp', 'avif'];
let photoValidExtensionsText = photoValidExtensions.join(', '); // یا ', ' 

if ($('.photo-valid-extensions').length) {
   $('.photo-valid-extensions').text(photoValidExtensionsText);
   $('#photo').attr('data-mim-extensions', photoValidExtensionsText);
}

const user = {};
if (document.getElementById(`dim`))
   document.getElementById(`dim`).addEventListener(`click`, function (e) {
      if (e.target === this) {
         console.log('خوش آمدید'); // پیام چاپی
         this.style.display = `none`; // پنهان کردن عنصر
      }
   });


// خوش آمد گویی به کاربر
if (document.querySelector(`#close`))
   document.querySelector(`#enter`).onclick = function () {
      user.fname = document.querySelector(`#fname`).value || `کاربر`;
      user.lname = document.querySelector(`#lname`).value || `مهمان`;
      document.getElementById(`welcome`).innerHTML = `<b>به قناری‌سرا خوش آمدید</b> ${user.fname}  ${user.lname} <i class="bi bi-emoji-heart-eyes"></i>  (<i class="bi bi-feather" id="show-modal"></i>
   <i>برای ویرایش نام و نام‌خانوادگی خود کلیک کنید</i>)`;
      //console.log
      document.querySelector(`#dim`).style.display = `none`;
      document.querySelector(`#show-modal`).onclick = function () {
         document.querySelector(`#dim`).style.display = `block`
         const closeButton = document.querySelector(`#close`);
         const dimElement = document.querySelector(`#dim`);

         closeButton.addEventListener(`click`, function () {
            // مرحله ۱: شروع محو شدن (کاهش opacity به صفر)
            dimElement.classList.add('hidden');

            // مرحله ۲: بعد از اتمام انیمیشن، عنصر را کاملاً پنهان کنید
            dimElement.addEventListener('transitionend', function handleTransitionEnd() {
               dimElement.style.display = 'none'; // کاملاً پنهان می‌شود
               // رویداد را حذف می‌کنیم تا دوباره فعال نشود
               dimElement.removeEventListener('transitionend', handleTransitionEnd);
            }, { once: true });
         });

      }
   };
//Tab
if ($(`#dim`)) {
   $(`#dim`).change(function () {
      let dim = $(this).val();
   });
}

// بستن لایه dim با کلیک روی Close
if (document.querySelector(`#close`))
   document.querySelector(`#close`).onclick = function () {
      document.querySelector(`#dim`).style.display = `none`;
   };
// پرینت کردن محتوا
document.querySelectorAll(`.print`).forEach(function (el) {
   el.onclick = function () {
      window.print();
   }
});

// Accordion
function toggleAcc(element) {
   // پیدا کردن المان والد که کلاس 'mim-accordion-item' را دارد
   const item = element.parentElement;
   // پیدا کردن بخش قابل نمایش (mim-collapse) که هم‌والد است
   const collapse = item.querySelector('.mim-collapse');
   // پیدا کردن فلش (arrow-icon) داخل عنوان
   const arrow = element.querySelector('.arrow-icon');

   // جابجایی کلاس 'active' روی آیتم والد برای اعمال استایل‌های CSS
   item.classList.toggle('active');

   // جابجایی کلاس 'rotate' روی فلش برای انیمیشن چرخش
   if (arrow) {
      arrow.classList.toggle('rotate');
   }
}
//signup
if ($(`#day`)) {
   let months = [
      `فروردین`,
      `اردیبهشت`,
      `خرداد`,
      `تیر`,
      `مرداد`,
      `شهریور`,
      `مهر`,
      `آبان`,
      `آذر`,
      `دی`,
      `بهمن`,
      `اسفند`
   ];
   //use of map
   /*months = months.map(function (x) {
      return `ماه ` +x;
   });*/
   //برای مرتب سازی
   //months.sort();
   for (let i = 1; i <= 31; i++) {
      $(`#day`).append(`<option value="${i}">${i}</option>`);
      if (i <= 12) {
         $(`#month`).append(`<option value="${i}">${months[i - 1]}</option>`);
      }
   }
}
for (let i = 1300; i <= 1405; i++) {
   $(`#year`).append(`<option value="${i}">${i}</option>`);
}
//kod meli
function validateNationalId(nationalId) {
   const cleanedId = nationalId.replace(/\s+/g, '');

   if (!cleanedId || cleanedId.length !== 10) {
      return false;
   }

   for (let i = 0; i < cleanedId.length; i++) {
      let charCode = cleanedId.charCodeAt(i);
      if (!(charCode >= 48 && charCode <= 57)) {
         return false;
      }
   }
   return true;
}

//just number
$(`#idcard`).on('input', function () {
   let originalValue = $(this).val();
   let numericValue = '';

   for (let i = 0; i < originalValue.length; i++) {
      let char = originalValue[i];
      let charCode = char.charCodeAt(0);
      if (charCode >= 48 && charCode <= 57) {
         numericValue += char;
      }
   }

   if (originalValue !== numericValue) {
      $(this).val(numericValue);
   }


   const currentVal = $(this).val();
   $(this).removeClass(`is-valid is-invalid`);
   if (currentVal.length === 10 && validateNationalId(currentVal)) {
      $(this).addClass(`is-valid`);
   } else if (currentVal.length > 0) {
      $(this).addClass(`is-invalid`);
   }
});

$(`#idcard`).on('change', function () {
   let idcardValue = $(this).val();
   $(this).removeClass(`is-valid is-invalid`);

   if (validateNationalId(idcardValue)) {
      $(this).addClass(`is-valid`);
   } else {
      $(this).addClass(`is-invalid`);
   }
});

//username
if ($(`#username`)) {
   $(`#username`).change(function () {
      let username = $(this).val();
      if (usernameValidation(username))
         $(this).addClass(`is-valid`);
      else
         $(this).addClass(`is-invalid`);
   });
}
//password
if ($(`#password`)) {
   $(`#password`).change(function () {
      let password = $(this).val();
      if (password)
         $(this).addClass(`is-valid`);
      else
         $(this).addClass(`is-invalid`);
   });
}

$(`.farsi`).on({
   change: function () {
      if (!isPersian($(this).val())) {
         alert(`hhhh`);
      }
   },
   input: function () {
      let parsi = $(this).val();
      let lastChar = parsi.at(-1);
      if (!isPersian(lastChar))
         //sonati:text[text.length-1]
         $(this).val(parsi.slice(0, -1));
   }
});
$(`.idcard`).on({
   change: function () {
      if (!isidcard($(this).val())) {
         alert(`hhhh`);
      }
   },
   input: function () {
      let idcard = $(this).val();
      let lastChar = idcard.at(-1);
      if (!isidcard(lastChar))
         //sonati:text[text.length-1]
         $(this).val(idcard.slice(0, -1));
   }
});
$(`.number`).on({
   change: function () {
      if (!isNumber($(this).val())) {
         alert(`hhhh`);
      }
   },
   input: function () {
      let num = $(this).val();
      let lastChar = num.at(-1);
      if (!isNumber(lastChar))
         //sonati:text[text.length-1]
         $(this).val(num.slice(0, -1));
   }
});
$(`.idcard`).on({
   change: function () {
      if (!isidcard($(this).val())) {
         alert(`hhhh`);
      }
   },
   input: function () {
      let idcard = $(this).val();
      let lastChar = idcard.at(-1);
      if (!isidcard(lastChar))
         //sonati:text[text.length-1]
         $(this).val(idcard.slice(0, -1));
   }
});

if ($(`.lower`)) {
   $(`.lower`).change(function () {
      $(this).val($(this).val().toLowerCase());
   });
}
//degree
const degree = [
   "دیپلم",
   "کاردانی",
   "کارشناسی",
   "کارشناسی ارشد",
   "دکترا",
   "دکتری تخصصی"
];
for (let i = 0; i < degree.length; i++) {
   $('#degree').append(`<option value="${degree[i]}">${degree[i]}</option>`);
}
//about idcard
if ($('.digit-en').length || $('.digit-fa').length) {
   $(`.digit-en,.digit-fa`).on({
      change: function () {
         $(this).val(digit($(this).val(), ($(this).hasClass(`digit-en`) ? `en` : `fa`)));
      },
      paste: function () {
         let obj = $(this);
         setTimeout(function () {
            obj.val(digit(obj.val(), (obj.hasClass(`digit-en`) ? `en` : `fa`)));
         }, 1)
      }
   });
}
if ($(`.extension`)) {
   $(`.extension`).change(function () {
      let validExtensions = $(this).attr(`data-mim-extensions`).replace(/ /g, ``).split(`,`);
      //let fileExtensions=$(this).val().split(`.`);
      //fileExtension=fileExtension[fileExtension.length-1]
      let fileExtension = $(this).val().slice($(this).val().lastIndexOf(`.`) + 1);
      if (!validExtensions.includes(fileExtension))
         $(this).addClass(`is-invalid`);
   });
}
//captcha
//num2persian:تبدیل اعداد به حروف
if ($(`.captcha`)) {
   let r = rand(1000, 9999); // تولید عدد 4 رقمی
   // convert number to words
   // حالا num2persian عدد r را به حروف تبدیل می کند
   $(`.captcha`).html(num2persian(r)); // اینجا حروف فارسی نمایش داده می شود
   $(`.captcha+input`).attr(`data-mim-captcha`, r); // عدد اصلی (مثلا 8838) همچنان ذخیره می شود
   $(`.captcha+input`).on(`input`, function () {
      $(this).removeClass(`is-valid is-invalid`);
      // مقایسه ورودی کاربر با عدد اصلی (نه با حروف)
      if ($(this).val() == $(this).attr(`data-mim-captcha`))
         $(this).addClass(`is-valid`);
      else
         $(this).addClass(`is-invalid`);
   });
}

//برای اینکه بگیم ارایه است حتما اینجوری باید بگیم
const users = [];
//اطمینان می‌دهد که هر کاربر جدید id متفاوتی دارد.userIdCounter
let userIdCounter = 0;

//signup(province,city)
if ($(`#signup`)) {
   $(`#signup`).submit(function (e) {
      e.preventDefault(); // جلوگیری از ارسال فرم به روش سنتی

      const newUsername = $(`#username`).val();
      const newPassword = $(`#password`).val();
      const newFname = $(`#fname`).val();
      const newLname = $(`#lname`).val();

      // بررسی کنید که آیا مقادیر خالی نیستند (اختیاری اما توصیه می‌شود)
      if (!newUsername || !newFname || !newLname) {
         alert("لطفا نام کاربری، نام و نام خانوادگی را وارد کنید.");
         return false;
      }

      // اضافه کردن کاربر جدید به آرایه users با شناسه منحصربه‌فرد
      users.push({
         id: userIdCounter++, // اضافه کردن شناسه منحصربه‌فرد
         username: newUsername,
         password: newPassword,
         fname: newFname,
         lname: newLname,
      });

      // بازخوانی تابع نمایش جدول برای به‌روزرسانی لیست
      renderUserTable();

      // پاک کردن فیلدهای فرم پس از ثبت نام (اختیاری)
      $(`#username`).val('');
      $(`#password`).val('');
      $(`#fname`).val('');
      $(`#lname`).val('');
   });
}

// تابعی برای نمایش جدول کاربران
function renderUserTable() {
   let content = '';
   if (users.length === 0) {
      content = '<p>هنوز کاربری ثبت نشده است.</p>';
   } else {
      content += `<table class="table">`;
      //مخفف “table head” است و در زبان HTML برای تعریف سربرگ جدول
      content += `<thead><tr>`;
      content += `<th>نام کاربری</th>`;
      content += `<th>نام</th>`;
      content += `<th>نام خانوادگی</th>`;
      content += `<th>عملیات</th>`; // ستون برای دکمه حذف
      content += `</tr></thead>`;
      content += `<tbody>`;

      users.forEach(function (el) {
         content += `<tr data-id="${el.id}">`; // اضافه کردن data-id به هر ردیف
         content += `<td>${el.username}</td>`;
         content += `<td>${el.fname}</td>`;
         content += `<td>${el.lname}</td>`;
         // اضافه کردن ستون عملیات با آیکون سطل زباله
         content += `<td><i class="bi bi-trash3 delete-icon" style="cursor: pointer;"></i></td>`;
         content += `</tr>`;

      });
      content += `</tbody></table>`;
   }
   $(`#user-list`).html(content);
}

// تابعی برای حذف کاربر
function deleteUser(userId) {
   // پیدا کردن ایندکس کاربر در آرایه users
   const userIndex = users.findIndex(user => user.id === userId);

   if (userIndex !== -1) {
      // حذف از آرایه users
      users.splice(userIndex, 1);
      // به‌روزرسانی جدول در صفحه
      renderUserTable();
      console.log(`User with ID ${userId} deleted.`);
   }
}
$(document).ready(function () {
   $(`#user-list`).on('click', '.delete-icon', function () {
      const $row = $(this).closest('tr');
      const userId = $row.data('id');
      if (userId !== undefined) {
         deleteUser(userId);
      }
   });
});

if ($(`#quick-access`)) {
   $(`#quick-access`).on(`input`, function () {
      let text = $(this).val();
      $(`#nav-item ul li`).each(function () {
         if ($(this).text().includes(text)) {
            //برای حذف انیمیشن موقع سرچ
            $(this).css({
               'visibility': 'inherit',
               'height': 'auto'
            });
         }
         else {
            $(this).css({
               'visibility': 'hidden',
               'height': '0'
            });
         }
      });
   });
}

$(document).ready(function () {
   $('.drop > a, .dropdown > a').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var submenu = $(this).next('ul');
      submenu.slideToggle();

      $('.mim-dropmenu1, .mim-dropmenu').not(submenu).slideUp();
   });

   $(document).on('click', function () {
      $('.mim-dropmenu1, .mim-dropmenu').slideUp();
   });

   $('.mim-dropmenu1, .mim-dropmenu').on('click', function (e) {
      e.stopPropagation();
   });
});



// Undefined
/*let y = {};
alert(y.test)*/


