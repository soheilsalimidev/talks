---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
glowSeed: 4
title: هشدار دهنده مصرف انرژی در زمان قطعی برق 
remoteAssets: false
fonts:
  sans: Inter
  serif: Robot Slab
  mono: Fira Code
---

---
layout: intro
class: pl-30
glowSeed: 14
---

<h1 flex="~ col">
<!-- <div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'"> -->
  <!-- <span >پروژه درس IoT , استاد باطنی</span> -->
<!-- </div> -->
<div mt1 forward:delay-300 v-click> هشدار دهنده مصرف انرژی در زمان قطعی برق </div>
</h1>

<div abs-br mx-10 mb-10 flex="~ col gap-4 items-end" text-left v-click="1">
  <div text-sm opacity-75 mt--4>Ordibehesht 13, 1404</div>
</div>



---
---

# مقدمه

<div flex="~ col gap-4" py6>
  <span v-click>
    <div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>زمینه</div><br>
    <span text-blue2>رشد سیستم‌های هوشمند در منازل/محیط‌های کاری نیاز به راهکارهای پیشرفته برای افزایش امنیت، راحتی و کارایی را برجسته کرده است</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>چالش</div><br>
    <span text-rose2>قطع برق شهری باعث عدم آگاهی از وضعیت درها/پنجره‌ها و افزایش خطر خسارات مالی یا تهدیدات امنیتی می‌شود</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-yellow mr2 px2 rounded bg-yellow:10>هدف</div><br>
    <span text-yellow2>طراحی سیستم هوشمند برای تشخیص وضعیت درها/پنجره‌ها، ارسال هشدار و بستن خودکار آن‌ها در شرایط اضطراری</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-green mr2 px2 rounded bg-green:10>راهکار</div><br>
    <span text-green2>ترکیب سنسورها، کنترلرهای الکترونیکی و موتورهای مکانیکی برای افزایش ایمنی و آسایش ساکنین</span>
  </span>
</div>

---
---

# طراحی محصول

<div grid grid-cols-2 gap3 h-full>
  <!-- Main Architecture -->
  <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg" grid-span-1>
    <div flex="~ items-center gap-2" bg-blue:10 px4 py2 rounded>
      <div i-solar-cube-minimalistic-broken text-xl invert-100 text-blue-4 />
      ساختار کلی سیستم
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="2">
        <div flex gap2><div text-blue4>•</div>سیستم ماژولار با ترکیب سخت‌افزار/نرم‌افزار</div>
        <div flex gap2><div text-blue4>•</div>مرکزیت برد ESP32 برای پردازش و تحلیل داده</div>
        <div flex gap2><div text-blue4>•</div>توسعه در Arduino IDE با پشتیبانی گسترده</div>
      </v-clicks>
    </div>
  </div>

  <!-- Hardware Components -->
  <div v-click="3" bg-gray:10 border="~ gray/50 rounded-lg">
    <div flex="~ items-center gap-2" bg-gray:10 px4 py2 rounded>
      <div i-solar-microchip-broken text-xl invert-100 text-blue-4 />
      اجزای سخت‌افزاری
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="4">
        <div flex gap2><div text-blue4>•</div>ESP32 با قابلیت WiFi/بلوتوث برای ارتباط آینده</div>
        <div flex gap2><div text-blue4>•</div>سنسورهای وضعیت در/پنجره (کلید مجاورتی، میکروسوییچ)</div>
        <div flex gap2><div text-blue4>•</div>ماژول سنسور ولتاژ AC برای تشخیص قطع برق</div>
      </v-clicks>
    </div>
  </div>

  <!-- System Features -->
  <div v-click="5" bg-gray:10 border="~ gray/50 rounded-lg" h-fit>
    <div flex="~ items-center gap-2" bg-gray:10 px4 py2 rounded>
      <div i-solar-shield-check-broken text-xl invert-100 text-blue-4 />
      ویژگی‌های سیستم
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="6">
        <div flex gap2><div text-blue4>•</div>ساختار ساده و کم‌هزینه</div>
        <div flex gap2><div text-blue4>•</div>قابلیت اعتماد بالا در شرایط مختلف</div>
        <div flex gap2><div text-blue4>•</div>پایه‌ای مناسب برای توسعه سامانه‌های هوشمند</div>
      </v-clicks>
    </div>
  </div>
</div>

---
---

# طراحی عملکردی

<div flex="~ col gap-4" py6>
  <span v-click>
    <div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>🔋</div><br>
    <span text-blue2>نظارت مداوم بر برق شهری توسط ماژول AC</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>🚪</div><br>
    <span text-rose2>کنترل وضعیت درها/پنجره‌ها با سنسورهای مجاورتی</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-yellow mr2 px2 rounded bg-yellow:10>⚠️</div><br>
    <span text-yellow2>تشخیص فوری قطع برق و ورود به حالت اضطراری</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-green mr2 px2 rounded bg-green:10>🔔</div><br>
    <span text-green2>ارسال نوتیفیکیشن WiFi در صورت باز ماندن درها</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-purple mr2 px2 rounded bg-purple:10>💾</div><br>
    <span text-purple2>ثبت وضعیت در حافظه داخلی یا microSD</span>
  </span>
</div>

---
---

# طراحی اجزا

<div flex="~ col gap-4" py6>
  <span v-click>
    <div flex="~ inline items-center gap-2" mb2 bg-blue:10 rounded px2>
      <div text-blue>🧠</div>
      <span text-blue font-bold>ESP32 DevKit v1</span>
    </div>
    <span text-blue2>پردازنده دو هسته‌ای با WiFi/Bluetooth داخلی و 22 پین GPIO برای اتصال گسترده</span><br>
    <img src="/esp.jpg"/>
  </span>
  
  <span v-click>
    <div flex="~ inline items-center gap-2" mb2 bg-rose:10 rounded px2>
      <div text-rose>🔒</div>
      <span text-rose font-bold>MC-38 Reed Switch</span>
    </div>
    <span text-rose2>سنسور مغناطیسی بدون تماس فیزیکی با دقت بالا برای تشخیص وضعیت درها</span><br>
    <span text-rose2 text-sm>سازگار با انواع درهای کشویی و بازشو، مقاوم در برابر سایش</span>
    <img class="w-24" src="/MC38-MAGNETSENSOR-1.jpg"/>
  </span>  

</div>

---
---

# طراحی اجزا

<div flex="~ col gap-4" py6>
  
  <span v-click>
    <div flex="~ inline items-center gap-2" mb2 bg-yellow:10 rounded px2>
      <div text-yellow>⚡</div>
      <span text-yellow font-bold>ZMPT101B Voltage Sensor</span>
    </div>
    <span text-yellow2>تشخیص ایمن ولتاژ AC با ایزولاسیون گالوانیک برای حفاظت از مدار</span><br>
    <span text-yellow2 text-sm>دقت 0.5% در اندازه‌گیری ولتاژ 75-300V بدون تماس مستقیم</span>
    <img src="/61Wz0d4sBwL._AC_UY1000_.jpg" w-30 />
  </span>

  
  <span v-click>
    <div flex="~ inline items-center gap-2" mb2 bg-green:10 rounded px2>
      <div text-green>🚨</div>
      <span text-green font-bold>Buzzer 5V + LED قرمز</span>
    </div>
    <span text-green2>هشدار صوتی 90dB و نوری با قابلیت تشخیص فوری در فضاهای شلوغ</span><br>
    <span text-green2 text-sm>مدار ساده با کارایی بالا برای نسخه‌های اولیه سیستم</span>
  </span>

  <span v-click>
    <div flex="~ inline items-center gap-2" mb2 bg-purple:10 rounded px2>
      <div text-purple>🔌</div>
      <span text-purple font-bold>AMS1117 Voltage Regulator</span>
    </div>
    <span text-purple2>تبدیل ولتاژ 9-12V به 3.3V/5V با ثبات 1% و حفاظت از برق‌های ناگهانی</span><br>
    <span text-purple2 text-sm>پهنای فرکانسی 1.2MHz برای کاهش نویز در مدارهای دیجیتال</span>
  </span>
  
  <span v-click>
    <div flex="~ inline items-center gap-2" mb2 bg-teal:10 rounded px2>
      <div text-teal>🛠️</div>
      <span text-teal font-bold>Arduino IDE با کتابخانه‌های</span>
    </div>
    <span text-teal2>WiFi.h، EEPROM.h، Bounce2.h برای اتصال شبکه و مدیریت نویز</span><br>
    <span text-teal2 text-sm>کاهش 80% زمان توسعه با استفاده از کتابخانه‌های آماده</span>
  </span>
</div>

---
---

# بررسی امکان‌پذیری

<div flex flex-col gap3 h-full>
  <!-- Technologies Section -->
  <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg">
    <div flex="~ items-center gap-2" bg-blue:10 px4 py2 rounded>
      <div i-solar:microchip-broken text-xl invert-100 text-blue-4 />
      فناوری‌های پیاده‌سازی
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="2">
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-blue-4 />
          ماژول ESP32: پردازش + WiFi/بلوتوث
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-blue-4 />
          سنسورهای مکانیکی/مغناطیسی: وضعیت درب/پنجره
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-blue-4 />
          ماژول تشخیص ولتاژ AC: مانیتورینگ برق شهر
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-blue-4 />
          Arduino IDE: توسعه سریع + کتابخانه‌های پشتیبان
        </div>
      </v-clicks>
    </div>
  </div>

  <!-- Challenges Section -->
  <div v-click="3" bg-gray:10 border="~ gray/50 rounded-lg">
    <div flex="~ items-center gap-2" bg-gray:10 px4 py2 rounded>
      <div i-solar:warning-circle-broken text-xl invert-100 text-amber-4 />
      چالش‌های فنی
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="4">
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-amber-4 />
          نویز الکتریکی سنسورها → فیلتر نرم‌افزاری/خازن
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-amber-4 />
          ایزولاسیون برق شهری → ایمنی کاربر
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-amber-4 />
          دقت نصب سنسورها → عملکرد مطمئن
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-amber-4 />
          محدودیت حافظه ESP32 → معماری ماژولار
        </div>
      </v-clicks>
    </div>
  </div>
</div>

---
---

# امکان‌پذیری مالی

<div flex flex-col gap3 h-full>
  <!-- Cost Breakdown Section -->
  <div v-click="1" bg-amber:10 border="~ gray/50 rounded-lg">
    <div flex="~ items-center gap-2" bg-amber:10 px4 py2 rounded>
      <div i-solar:coin-broken text-xl invert-100 text-amber-4 />
      شکست هزینه‌ها
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="2">
        <div flex justify-between text-sm p1>
          <span>ESP32 DevKit</span>
          <span>300 هزار تومان</span>
        </div>
        <div flex justify-between text-sm p1>
          <span>سنسور MC-38</span>
          <span>100 هزار تومان</span>
        </div>
        <div flex justify-between text-sm p1>
          <span>ZMPT101B</span>
          <span>140 هزار تومان</span>
        </div>
        <div flex justify-between text-sm p1>
          <span>بیزر/LED</span>
          <span>5 هزار تومان</span>
        </div>
        <div flex justify-between text-sm p1>
          <span>منبع تغذیه</span>
          <span>80 هزار تومان</span>
        </div>
        <div flex justify-between text-sm p1>
          <span>میکروسوییچ</span>
          <span>10 هزار تومان</span>
        </div>
        <div flex justify-between text-sm p1>
          <span>متفرقه</span>
          <span>150 هزار تومان</span>
        </div>
      </v-clicks>
    </div>
  </div>

  <!-- Financial Analysis Section -->
  <div v-click="3" bg-green:10 border="~ gray/50 rounded-lg">
    <div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded>
      <div i-solar:wallet-broken text-xl invert-100 text-green-4 />
      تحلیل مالی
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="4">
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-green-4 />
          <span>هزینه نمونه اولیه: 700-800 هزار تومان</span>
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-green-4 />
          <span>تولید انبوه: کاهش 10-20% با خرید عمده</span>
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-green-4 />
          <span>نگهداری: هزینه بسیار پایین (تعویض قطعات)</span>
        </div>
      </v-clicks>
    </div>
  </div>
</div>

---
---

#

<div flex flex-col gap3 h-full>
  <!-- Human Resources Section -->
  <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg">
    <div flex="~ items-center gap-2" bg-blue:10 px4 py2 rounded>
      <div i-solar:users-group-broken text-xl invert-100 text-blue-4 />
      نیروی انسانی
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="2">
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-blue-4 />
          تیم فنی با دانش الکترونیک و ESP32
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-blue-4 />
          تجربه پروژه‌های IoT و سیستم‌های هوشمند
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-blue-4 />
          توانایی کار با سنسورها و ماژول‌های برق
        </div>
      </v-clicks>
    </div>
  </div>

  <!-- Technical Equipment Section -->
  <div v-click="3" bg-amber:10 border="~ gray/50 rounded-lg">
    <div flex="~ items-center gap-2" bg-amber:10 px4 py2 rounded>
      <div i-solar:tools-broken text-xl invert-100 text-amber-4 />
      تجهیزات فنی
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="4">
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-amber-4 />
          ابزارهای آزمایشگاهی (منبع تغذیه، مولتی‌متر)
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-amber-4 />
          تجهیزات نمونه‌سازی (بردبرد، سیم، مقاومت)
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-amber-4 />
          دسترسی به پرینتر 3D و رایانه برنامه‌نویسی
        </div>
      </v-clicks>
    </div>
  </div>

  <!-- Software & Resources Section -->
  <div v-click="5" bg-green:10 border="~ gray/50 rounded-lg">
    <div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded>
      <div i-solar:code-square-broken text-xl invert-100 text-green-4 />
      نرم‌افزار و منابع
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="6">
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-green-4 />
          Arduino IDE با کتابخانه‌های باز
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-green-4 />
          منابع آموزشی آنلاین و مستندات
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-green-4 />
          پلتفرم‌های جامعه‌ای (GitHub، Stack Overflow)
        </div>
      </v-clicks>
    </div>
  </div>
</div>

---
---

# حجم کار و زمان‌بندی

| مرحله                   | فعالیت                            | زمان تخمینی |
| ----------------------- | --------------------------------- | ----------- |
| تحلیل و طراحی اولیه     | مشخص‌کردن اجزا و سناریوهای عملکرد | 5-6 روز     |
| خرید و آماده‌سازی قطعات | تهیه سخت‌افزار و اتصال اولیه      | 5-6 روز     |
| برنامه‌نویسی            | پیاده‌سازی منطق در Arduino IDE    | 10-12 روز   |
| تست و عیب‌یابی          | تست در محیط واقعی و بهینه‌سازی    | 4-5 روز     |
| مستند سازی و ارائه      | تهیه مدارک نهایی                  | 4-5 روز     |

---
---
# برآورد هزینه ها
## هزینه های سختافزاری
| ردیف | عنوان قطعه                                            | تعداد مورد نیاز | قیمت واحد (تومان) | هزینه کل (تومان) | توضیحات                    |
| ---- | ----------------------------------------------------- | --------------- | ----------------- | ---------------- | -------------------------- |
| 1    | برد  ESP32                                            | 1               | 400,000           | 400,000          | میکروکنترلر اصلی پروژه     |
| 2    | سنسور مغناطیسی MC-38                                  | 2               | 100,000           | 100,000          | تشخیص وضعیت پنجره‌ها       |
| 3    | میکروسوییچ غلتکی                                      | 2               | 9,000             | 18,000           | تشخیص وضعیت پنجره‌ها       |
| 4    | میکروسوییچ اهرم دار                                   | 2               | 12,000            | 24,000           | تشخیص وضعیت پنجره‌ها       |
| 5    | ماژول ولتاژ  AC ZMPT101B                              | 1               | 140,000           | 140,000          | تشخیص قطع برق شهری         |
| 6    | بیزر فعال یا هشداردهنده                               | 1               | 10,000            | 10,000           | هشدار صوتی در زمان قطع برق |
| 7    | متفرقه (سیم، بردبرد، جعبه، مقاومت ومنبع تغذیه و ... ) | 1               | 250,000           | 250,000          | تغذیه پایدار سیستم         |
| 8    | جمع کل بخش سخت‌افزار                                  | \-              | \-                | 942,000          | \-                         |

---
---
## هزینه‌های نرم‌افزاری

| ردیف                 | عنوان                   | نوع هزینه | هزینه (تومان) |
| -------------------- | ----------------------- | --------- | ------------- |
| 1                    | Arduino IDE             | رایگان    | 0             |
| 2                    | کتابخانه‌های نرم‌افزاری | رایگان    | 0             |
| جمع کل بخش نرم‌افزار | \-                      | \-        | 0  تومان      |

## هزینه‌های نیروی انسانی (برای یک دوره‌ی 1 ماهه)

| ردیف                    | عنوان فعالیت           | تعداد افراد دخیل | نفر ساعت     | نرخ نفر ساعت | هزینه کل (تومان) |
| ----------------------- | ---------------------- | ---------------- | ------------ | ------------ | ---------------- |
| 1                       | تحلیل و طراحی          | 4                | 70 نفر ساعت  | 25،000       | 1,750,000        |
| 2                       | برنامه‌نویسی نرم‌افزار | 4                | 120 نفر ساعت | 30,000       | 3,600,000        |
| 3                       | مونتاژ و تست سخت‌افزار | 2                | 30 نفر ساعت  | 30,000       | 900,000          |
| 4                       | تست نهایی محصول        | 2                | 30 نفر ساعت  | 22,000       | 660,000          |
| 5                       | مستندسازی و ارائه      | 3                | 55 نفر ساعت  | 22,000       | 1,210,000        |
| جمع کل بخش نیروی انسانی | \-                     | \-               | 305 نفر ساعت | \-           | 8,120,000        |

---
---
## هزینه‌های توسعه و نگهداری

| ردیف | عنوان هزینه     | مقدار    | هزینه (تومان)                 | توضیحات                          |
| ---- | --------------- | -------- | ----------------------------- | -------------------------------- |
| 1    | نگهداری 6 ماهه  | 6 ماهه   | 800,000                       | تعویض قطعات مصرفی، تست دوره‌ای   |
| 2    | توسعه نسخه بعدی | پروژه‌ای | طبق شرایط مجددا محاسبه می‌شود | افزودن قابلیت‌های بیشتر در آینده |

## جمع‌بندی نهایی
| بخش                      | هزینه کل (تومان) |
| ------------------------ | ---------------- |
| سخت‌افزار                | 942,000          |
| نرم‌افزار                | 0                |
| نیروی انسانی             | 8,120,000        |
| توسعه و نگهداری          | 800,000          |
| جمع کل کل پروژه (تقریبی) | 9,862,000  تومان |

---
---
# زمان مورد نیاز و ددلاین‌ها

```mermaid
timeline
    title زمان‌بندی پروژه
    section فازهای اجرایی
        فاز ۱: طراحی سیستم    : 5-6 روز, ۱۴-۲۱ اردیبهشت : تحلیل نیازها و طراحی مفهومی
        فاز ۲: مونتاژ سخت‌افزار : 5-6 روز, ۲۲-۲۸ اردیبهشت : خرید تجهیزات و نصب اولیه
        فاز ۳: برنامه‌نویسی نرم‌افزار : ۱۰-۱۲ روز, ۲۹ اردیبهشت-۴ خرداد : پیاده‌سازی الگوریتم‌ها در Arduino
        فاز ۴: تست و عیب‌یابی : ۴-۵ روز, ۵-۱۲ خرداد : تست میدانی و بهینه‌سازی
        فاز ۵: مستندسازی    : ۴-۵ روز, ۵-۱۲ خرداد : تهیه مدارک فنی و گزارشات
    section خلاصه کلی
        مدت کل پروژه        : حدود ۴-۵ هفته
```

---
---

# ذی‌نفعان و مشوق‌ها

<div flex="~ col gap-4" py6>
  <span v-click>
    <div flex="~ inline" text-orange mr2 px2 rounded bg-orange:10>ذی‌نفعان اصلی</div><br>
    <span text-orange2>
      <ul class="list-disc pr-6">
        <li>ساکنان منازل مسکونی (ایمنی در قطع برق)</li>
        <li>واحدهای صنعتی/اداری با پنجره‌های بازشو</li>
        <li>شرکت‌های امنیتی برای یکپارچه‌سازی در سیستم هشدار</li>
      </ul>
    </span>
  </span>
  <!-- New incentives section -->
  <span v-click>
    <div flex="~ inline" text-indigo mr2 px2 rounded bg-indigo:10>مشوق‌ها و حمایت‌ها</div><br>
    <span text-indigo2>
      <ul class="list-disc pr-6">
        <li>حمایت مالی از پارک‌های علم و فناوری</li>
        <li>جذب سرمایه از طریق مسابقات و نمایشگاه‌ها</li>
        <li>استفاده از تسهیلات شرکت‌های نوپا و معافیت‌های مالیاتی</li>
      </ul>
    </span>
  </span>
</div>

---
---
# ملاحظات امنیتی

<div flex="~ col gap-4" py6>
  <span v-click>
    <div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>امنیت ارتباطات</div><br>
    <span text-blue2>استفاده از پروتکل‌های امن نظیر TLS بر بستر HTTPS یا MQTT-SSL، مکانیزم‌های احراز هویت دوطرفه، و استانداردهای امنیتی بی‌سیم مانند WPA2 یا WPA3.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>حفظ حریم خصوصی و امنیت داده‌ها</div><br>
    <span text-rose2>جمع‌آوری حداقلی اطلاعات، ناشناس‌سازی یا مستعارسازی اطلاعات، ذخیره امن داده‌ها با استفاده از الگوریتم‌های رمزنگاری مانند AES، و تعریف سطح دسترسی مناسب برای کاربران.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-yellow mr2 px2 rounded bg-yellow:10>مقابله با تهدیدات سایبری</div><br>
    <span text-yellow2>امکان به‌روزرسانی از راه دور (OTA) برای firmware دستگاه‌ها، پیاده‌سازی مکانیزم‌های rate limiting، استفاده از ابزارهای شناسایی و مقابله با نفوذ، و انجام تست‌های نفوذ دوره‌ای.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-green mr2 px2 rounded bg-green:10>امنیت در سطح کاربر و احراز هویت</div><br>
    <span text-green2>تعریف رمز عبورهای پیچیده، امکان فعال‌سازی تایید هویت دو مرحله‌ای (2FA)، ثبت و پایش ورودها و رویدادهای حساس.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-purple mr2 px2 rounded bg-purple:10>امنیت سخت‌افزار</div><br>
    <span text-purple2>استفاده از میکروکنترلرهایی با قابلیت بوت امن و رمزنگاری حافظه، طراحی بدنه محافظ برای جلوگیری از دسترسی مستقیم به پورت‌های سخت‌افزاری، و محدودسازی سطح دسترسی فیزیکی به دستگاه‌ها.</span>
  </span>
</div>

---
---

<div flex="~ gap-3" h-full>
  <!-- Technical Challenges Section -->
  <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg" span1>
    <div flex="~ items-center gap-2" bg-blue:10 px4 py2 rounded>
      <div i-solar:tools-broken text-xl invert-100 text-blue-4 />
      چالش‌های فنی
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="2">
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-blue-4 />
          ناپایداری در ارتباطات شبکه‌ای: استفاده از ماژول‌های ارتباطی با قابلیت fallback، buffer داخلی، و پروتکل‌های مقاوم.
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-blue-4 />
          محدودیت منابع سخت‌افزاری: استفاده از الگوریتم‌های بهینه، تقسیم وظایف، و کاهش وابستگی به پردازش محلی.
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-blue-4 />
          پیچیدگی در مدیریت به‌روزرسانی‌ها: پیش‌بینی قابلیت به‌روزرسانی از راه دور (OTA) با اعتبارسنجی دیجیتال و ثبت نسخه‌های قبلی.
        </div>
      </v-clicks>
    </div>
  </div>

  <!-- Financial Challenges Section -->
  <div v-click="3" bg-amber:10 border="~ gray/50 rounded-lg" span1>
    <div flex="~ items-center gap-2" bg-amber:10 px4 py2 rounded>
      <div i-solar:wallet-broken text-xl invert-100 text-amber-4 />
      چالش‌های مالی
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="4">
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-amber-4 />
          هزینه بالای خرید تجهیزات اولیه: شناسایی تأمین‌کنندگان با قیمت مناسب، خرید عمده، و استفاده از سخت‌افزارهای متن‌باز.
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-amber-4 />
          هزینه‌های نگهداری و پشتیبانی بلندمدت: استفاده از سیستم‌های هشدار هوشمند، طراحی قطعات با قابلیت خودعیب‌یابی، و مدل‌سازی درآمدی برای پشتیبانی.
        </div>
      </v-clicks>
    </div>
  </div>

  <!-- Legal and Regulatory Challenges Section -->
  <div v-click="5" bg-green:10 border="~ gray/50 rounded-lg" span1>
    <div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded>
      <div i-solar:law-broken text-xl invert-100 text-green-4 />
      چالش‌های قانونی و حقوقی
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="6">
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-green-4 />
          حفاظت از حریم خصوصی کاربران: اطلاع‌رسانی شفاف، دریافت رضایت‌نامه کتبی، و پیروی از استانداردهای حریم خصوصی.
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-green-4 />
          محدودیت‌های مخابراتی و فرکانسی: بررسی مقررات سازمان تنظیم مقررات رادیویی کشور و انتخاب فناوری‌های ارتباطی مجاز.
        </div>
      </v-clicks>
    </div>
  </div>

  <!-- Operational and Implementation Challenges Section -->
  <div v-click="7" bg-purple:10 border="~ gray/50 rounded-lg" span1>
    <div flex="~ items-center gap-2" bg-purple:10 px4 py2 rounded>
      <div i-solar:construction-broken text-xl invert-100 text-purple-4 />
      چالش‌های عملیاتی و اجرایی
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="8">
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-purple-4 />
          نصب و راه‌اندازی در محیط‌های مختلف: طراحی سیستم به صورت ماژولار، پیش‌بینی تست میدانی اولیه، و آموزش نصاب‌ها.
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-purple-4 />
          آموزش کاربران نهایی: تولید مستندات ساده، طراحی اپلیکیشن کاربرپسند، و ایجاد سیستم پشتیبانی فنی آنلاین.
        </div>
        <div flex gap2 text-sm p1>
          <div i-carbon:dot-single text-purple-4 />
          احتمال خرابی‌های سخت‌افزاری: استفاده از قطعات صنعتی با تحمل بالا، طراحی بدنه مقاوم، و پیاده‌سازی سیستم‌های خودکار پایش سلامت دستگاه.
        </div>
      </v-clicks>
    </div>
  </div>
</div>


---
src: ./../../reuse/thanks.md
---
