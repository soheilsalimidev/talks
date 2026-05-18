---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
glowSeed: 4
title: ترفندهای هوش مصنوعی برای دانش آموزان
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
<div text-2xl origin-top-right transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'" dir="rtl" style="direction: rtl;">
  <span v-click> استاد گفت «خودت فکر کن»…</span>
  <br/>
  <span v-click> نگفت از هوش مصنوعی کمک نگیر</span>
</div>
<div mt1 forward:delay-300 v-click flex>
  <img src="/4NI0bS5.jpeg" class="h-65"/>
  <img src="/zf55w0d.jpeg"  class="h-65"/>
  <img src="/tZMbBlI.jpeg"  class="h-65"/>
  <img src="/V9v3Fem.jpeg"  class="h-65"/>
</div>
</h1>

<div abs-br mx-10 mb-10 flex="~ col gap-4 items-end" text-right v-click="1">
  <div text-sm opacity-75 mt--4>نوشتهٔ سهیل سلیمی • ۲۳ آبان ۱۴۰۴</div>
</div>

---
layout: center
---
# هوش مصنوعی در ۱۰ سال اخیر 📈

<div grid="~ cols-1 md:cols-2" gap-6 mt-8 dir="rtl" style="direction: rtl;">

<div v-click bg="blue:10" p-4 rounded dir="rtl" style="direction: rtl;">
  <b>۲۰۱۲–۲۰۱۵: «چه خبر؟»</b><br>
  عصر ابتدایی یادگیری عمیق (AlexNet).<br>
  سیری و الکسا: «ده میلیون نتیجه پیدا کردم…» 🙄
</div>

<div v-click bg="purple:10" p-4 rounded dir="rtl" style="direction: rtl;">
  <b>۲۰۱۶–۲۰۱۹: چی شد؟»</b><br>
  الفاگو انسان‌ها رو شکست داد.<br>
  GANها چهره‌های جعلی ساختند.<br>
  ولی هنوز نمی‌تونست انگشت‌ها رو بشمره 👋
</div>

<div v-click bg="green:10" p-4 rounded>
  <b>۲۰۲۰–۲۰۲۲: «اوه، جالبه!»</b><br>
  ترنسفورمرها رونق پیدا کردند.<br>
  GPT‑3 شعر، کد و هیچی‌هم‌ننویس می‌داد.<br>
  دانشجوها شروع به تقلب کردند (اوه اوه).
</div>

<div v-click bg="rose:10" p-4 rounded>
  <b>۲۰۲۳–۲۰۲۵: «حالا کاربردی شد!»</b><br>
  مدل‌های رایگان و سریع (Qwen, Llama).<br>
  ابزارهای واقعی برای کارهای واقعی.<br>
  همکار جدید آزمایشتون 🤖
</div>

</div>

---
layout: center
---
# هوش مصنوعی واقعاً چیه؟ 🧠

<div v-click flex="~ col items-center gap-4" mt-8>
  <div i-ph-robot-duotone text-5xl text-purple></div>
  <div text-lg dir="rtl" style="direction: rtl;">
    <b>هوش مصنوعی = تشخیص الگو در مقیاس عظیم.</b><br>
    از حجم زیادی متن/کد/تصویر یاد می‌گیره،<br>
    بعد پیش‌بینی می‌کنه چی میاد بعدش.
  </div>
</div>

<div v-click mt-6 p-4 bg="amber:10" rounded dir="rtl" style="direction: rtl;">
  ❗ <b>درک نداره</b>، <b>احساس نمی‌کنه</b>،<br>
  و <b>قطعاً رمز عبور شما رو نمی‌دونه</b>.<br>
  (مگر اینکه تو چت‌جی‌پی‌تی کپی کرده باشید 😬)
</div>

---
layout: center
---
# هوش مصنوعی 🆚 مغز انسان

<div grid="~ cols-1 md:cols-2" gap-6 mt-8>

<div v-click flex="~ col gap-3" items-center bg="green:10" p-4 rounded dir="rtl" style="direction: rtl;">
  <div i-ph-brain-duotone text-4xl text-blue></div>
  <b>شما</b>
  <div text-right dir="rtl" style="direction: rtl;">
    - خلاق، عاطفی، و یه کم تنبل (درک‌پذیر!)<br>
    - زمینه و پیامدها رو درک می‌کنی<br>
    - هم کد را دیباگ می‌کنی، هم انتخاب‌های زندگی‌ات رو 🥲
  </div>
</div>

<div v-click flex="~ col gap-3" items-center bg="rose:10" p-4 rounded dir="rtl" style="direction: rtl;">
  <div i-ph-robot-duotone text-4xl text-purple></div>
  <b>هوش مصنوعی</b>
  <div text-right dir="rtl" style="direction: rtl;">
    - کپی‌کنندهٔ فوق‌سریع الگوها<br>
    - با راحتی بهت می‌گه چطور بمب بسازی<br>
      (بدون اینکه بفهمه این ایدهٔ بدیه!) 💣
  </div>
</div>

</div>

<div v-click mt-6 dir="rtl" style="direction: rtl;">
  ✅ <b>نتیجه نهایی</b>: هوش مصنوعی یه ابزار قویه،<br>
  نه جایگزین <b>شما</b>.
</div>

---
layout: center
---
# آموزش پِرامْپت‌نویسی:  
## ورودی‌ات بد باشه، خروجی‌ات هم بد میشه 🗑️➡️🗑️

<v-click>
<div mt-8 p-4 bg="gray-800/50" border="~ gray-700 rounded-lg" class="text-center">
  هوش مصنوعی ذهن‌خوان نیست.<br>
  فقط <b>کلمات تو</b> رو می‌خونه.
</div>
</v-click>

<v-click>
<div mt-6 grid="~ cols-1 md:cols-2" gap-4>
  <div p-4 bg="rose:10" rounded text-right>
    ❌ پرامپت ضعیف:<br>
    <code>"شبکه‌ها رو توضیح بده"</code>
  </div>
  <div p-4 bg="green:10" rounded text-right>
    ✅ پرامپت قوی:<br>
    <code>"TCP و UDP رو توضیح بده، طوری که انگار دارم سرور مدرسه رو راه‌اندازی می‌کنم"</code>
  </div>
</div>
</v-click>

<v-click>
<div mt-6 p-3 bg="amber:10" rounded text-center>
  🔑 <b>مشخص</b> باش، <b>زمینه</b> بده، و <b>هدف‌ات</b> رو بگو.
</div>
</v-click>

---
layout: center
---
# ترفند درسی #۱: تحقیق، ولی سریع‌تر ⚡

<v-click>
<div mt-8 p-4 bg="gray-800/50" border="~ gray-700 rounded-lg" class="text-center">
  🎯 همین الان امتحانش کن:<br>
  <code class="bg-gray-900 px-2 py-1 rounded">"اسموز را با یه تشبیه کشاورزی توضیح بده"</code>
</div>
</v-click>

<v-click>
<div mt-6 text-right p-4 bg="blue:10" rounded>
  <b>نکات حرفه‌ای:</b><br>
  - اضافه کن «توضیح بده انگار پنج سالمه» → جواب ساده‌تر<br>
  - بپرس «X و Y رو تو یه جدول مقایسه کن» → جزوهٔ مرور سریع<br>
  - منابع بخواه → ولی همیشه رفرنس بده! 📚
</div>
</v-click>

---
layout: center
---
# 🧪 همین الان امتحانش کن: پرامپت تحقیق

<v-click>
<div mt-8 p-4 bg="gray-800/50" border="~ gray-700 rounded-lg" class="text-center">
  <b>Qwen یا NotebookLM رو باز کن و این رو کپی کن:</b><br>
  <code class="bg-gray-900 px-3 py-2 rounded mt-2 inline-block">
در مورد booster جت توضیح بدیم
  </code>
</div>
</v-click>

<v-click>
<div mt-6 grid="~ cols-1 md:cols-2" gap-4>
  <div p-4 bg="blue:10" rounded flex="~ col items-center gap-2">
    <div i-logos-qwen text-3xl></div>
    <div>qwen.ai</div>
  </div>
  <div p-4 bg="green:10" rounded flex="~ col items-center gap-2">
    <div i-logos-google text-3xl></div>
    <div>NotebookLM</div>
  </div>
</div>
</v-click>

<v-click>
<div mt-6 p-3 bg="amber:10" rounded text-center>
  ⏱️ ۶۰ ثانیه — یه توضیح شفاف و ساده دریافت کن!
</div>
</v-click>

---
layout: center
---
# ترفند درسی #۲: یادداشت‌هایی که واقعاً کاربرد دارن 🗒️

<v-click>
<div mt-6 p-4 bg="emerald:10" rounded text-right>
  یادداشت‌های نامفهوم‌ات رو بفرست → دریافت کن:<br>
  - خلاصه‌نویسی نقطه‌ای<br>
  - کارت‌های فلش<br>
  - سؤالات آزمون تمرینی!<br><br>
  🔥 عالی با <b>NotebookLM</b> کار می‌کنه (اسلاید بعدی!)
</div>
</v-click>

---
layout: center
---
# 🧪 همین الان امتحانش کن: خلاصه‌سازی یادداشت

<v-click>
<div mt-8 p-4 bg="gray-800/50" border="~ gray-700 rounded-lg" class="text-center">
  <b>این رو تو NotebookLM یا Qwen بفرست:</b><br>
  <code class="bg-gray-900 px-3 py-2 rounded mt-2 inline-block">
این یادداشت‌ها رو تو سه کارت فلش خلاصه کن:  
- میتوکندری = نیروگاه سلول  
- کلروپلاست = غذاساز گیاه  
- هسته = مرکز فرمان
  </code>
</div>
</v-click>

<v-click>
<div mt-6 grid="~ cols-1 md:cols-2" gap-4>
  <div p-4 bg="blue:10" rounded flex="~ col items-center gap-2">
    <div i-logos-qwen text-3xl></div>
    <div>qwen.ai</div>
  </div>
  <div p-4 bg="green:10" rounded flex="~ col items-center gap-2">
    <div i-logos-google text-3xl></div>
    <div>NotebookLM (یادداشت‌ها رو آپلود کن!)</div>
  </div>
</div>
</v-click>

<v-click>
<div mt-6 p-3 bg="amber:10" rounded text-center>
  ⏱️ ۶۰ ثانیه — از خط‌خطی‌ها به سوخت مطالعه تبدیلش کن!
</div>
</v-click>

---
layout: center
---
# ترفند درسی #۳: کدِ SOS 🚨 (برای دوستان کامپیوتری)

<v-click>
<div bg="rose:10" p-4 rounded text-right>
  ❌ تو ساعت ۲ صبح:<br>
  <code class="text-red-400">// چرا این Segmentation fault؟؟؟</code><br><br>
  ✅ با هوش مصنوعی:<br>
  <code>"این ارور C رو توضیح بده، طوری که انگار خسته‌ام ولی باهوشم"</code>
</div>
</v-click>

<v-click>
<div mt-4 grid="~ cols-1 md:cols-2" gap-4>
  <div p-3 bg="gray-800/50" rounded>
    → رفع اشکال سینتکس<br>
    → پیشنهاد مراحل دیباگ<br>
    → تبدیل پایتون ↔ سی‌پلاس‌پلاس
  </div>
  <div p-3 bg="gray-800/50" rounded>
    ⚠️ <b>هیچ‌وقت کلید مخفی نفرست</b><br>
    ⚠️ <b>حتماً کد رو تست کن</b><br>
    (هوش مصنوعی با اطمینان <i>دروغ</i> می‌گه!)
  </div>
</div>
</v-click>

---
layout: center
---
# 🧪 همین الان امتحانش کن: رفع اشکال کد

<v-click>
<div mt-8 p-4 bg="gray-800/50" border="~ gray-700 rounded-lg" class="text-center">
  <b>از Qwen بخواه که تصحیح و توضیح بده:</b><br>
  <code class="bg-gray-900 px-3 py-2 rounded mt-2 inline-block">
این ارور پایتون رو درست کن و بگو چرا پیش اومده:  
print("Hello" + 5)
  </code>
</div>
</v-click>

<v-click>
<div mt-6 grid="~ cols-1 md:cols-2" gap-4>
  <div p-4 bg="blue:10" rounded flex="~ col items-center gap-2">
    <div i-logos-qwen text-3xl></div>
    <div>qwen.ai (بهترین برای کد)</div>
  </div>
  <div p-4 bg="purple:10" rounded flex="~ col items-center gap-2">
    <div i-logos-github-octocat text-3xl></div>
    <div>یا از Copilot توی VS Code استفاده کن</div>
  </div>
</div>
</v-click>

---
layout: center
---
# ترفند درسی #۴: گزارش آزمایشگاه بدون ۵ ساعت سردرد 🧪

<v-click>
<div p-4 bg="violet:10" rounded text-right>
  ورودی: «داده‌های آزمایش بهم‌ریخته‌ام…»<br><br>
  خروجی:<br>
  - «منابع احتمالی خطا: …»<br>
  - «این نتیجه‌گیری رو به‌صورت حرفه‌ای بازنویسی کن»<br>
  - «نموداری از این جدول بکش»
</div>
</v-click>

<v-click>
<div mt-4 p-3 border="2 dashed lime" rounded class="text-center">
  ⚠️ یادآوری: <b>هنوز باید خودت آزمایش رو انجام بدی.</b><br>
  (هوش مصنوعی بوی مدار سوخته نمی‌گیره 🔌)
</div>
</v-click>

---
layout: center
---
# 🧪 همین الان امتحانش کن: ویرایش گزارش آزمایشگاه

<v-click>
<div mt-8 p-4 bg="gray-800/50" border="~ gray-700 rounded-lg" class="text-center">
  <b>از هوش مصنوعی بخواه حرفه‌ای‌ش کنه:</b><br>
  <code class="bg-gray-900 px-3 py-2 rounded mt-2 inline-block">
این نتیجه‌گیری گزارش فیزیک من رو بازنویسی کن:  
"چیزی کار نکرد طوری که فکر می‌کردیم، ولی اعداد تقریباً منطقی بودن؟"
  </code>
</div>
</v-click>

<v-click>
<div mt-6 grid="~ cols-1 md:cols-2" gap-4>
  <div p-4 bg="blue:10" rounded flex="~ col items-center gap-2">
    <div i-logos-qwen text-3xl></div>
    <div>qwen.ai</div>
  </div>
  <div p-4 bg="green:10" rounded flex="~ col items-center gap-2">
    <div i-logos-google text-3xl></div>
    <div>NotebookLM</div>
  </div>
</div>
</v-click>

<v-click>
<div mt-6 p-3 bg="amber:10" rounded text-center>
  ⏱️ ۶۰ ثانیه — مثل یه دانشمند صحبت کن!
</div>
</v-click>

---
layout: center
---
# 🎨 هوش مصنوعی نقاش هم هست! (بله، واقعاً)

<v-click>
<div mt-6 grid="~ cols-1 md:cols-2" gap-4>
  <div p-4 bg="emerald:10" rounded text-right>
    <b>نمودارها و تصاویر</b><br>
    → «یه نمودار برچسب‌خورده از موتور ماشین بکش»<br>
    → ابزار: **Bing Image Creator** (رایگان، با DALL·E)<br>
    → عالی برای پوستر، گزارش، یا مستندات فنی
  </div>
  <div p-4 bg="violet:10" rounded text-right>
    <b>نقشه‌ذهن و فلوچارت</b><br>
    → «فلوچارت سیستم لاگین بساز»<br>
    → توی پاورپوینت یا کنا واردش کن<br>
    → ساعت‌ها زمان ذخیره می‌کنه!
  </div>
</div>
</v-click>

<v-click>
<div mt-6 p-3 bg="gray-800/50" border="~ gray-700 rounded-lg" class="text-center">
  ⚠️ همیشه چک کن: **آیا مجازی به استفاده از این تصویر توی پروژه‌های دانشگاهی هستی؟**<br>
  (اکثر ابزارهای رایگان برای آموزش مجازند ✅)
</div>
</v-click>

---
layout: center
---
# 🎧 فراتر از متن: ابزارهای صوتی هوش مصنوعی

<v-click>
<div mt-6 grid="~ cols-1 md:cols-2" gap-4>
  <div p-4 bg="rose:10" rounded text-right>
    <b>تبدیل متن به گفتار (رایگان)</b><br>
    → کارت‌های فلش مطالعه‌ات رو <b>بلند کن</b><br>
    → ابزارها: **ElevenLabs** (لایهٔ رایگان)، **Google TTS**<br>
    → عالی برای تمرین زبان یا دسترسی‌پذیری
  </div>
  <div p-4 bg="amber:10" rounded text-right>
    <b>صدا از متن</b><br>
    → گزارش آزمایشگاه رو به <b>پادکست</b> تبدیل کن<br>
    → «قوانین نیوتن رو طوری توضیح بده که انگار رادیویی هستی»<br>
    → جذاب برای ارائه‌های چندرسانه‌ای!
  </div>
</div>
</v-click>

<v-click>
<div mt-6 p-3 bg="gray-800/50" border="~ gray-700 rounded-lg" class="text-center">
  💡 نکتهٔ کامپیوتری: از پایتون + <code>pyttsx3</code> برای صدا بدون اینترنت استفاده کن!
</div>
</v-click>

---
layout: center
---
# 🤖 هوش مصنوعی برای برنامه‌نویسان و سازنده‌ها

<v-click>
<div mt-6 grid="~ cols-1 md:cols-2" gap-4>
  <div p-4 bg="purple:10" rounded text-right>
    <b>تولید نمودار مدار</b><br>
    → «مدار سنسور دما با آردوینو بکش»<br>
    → از **Circuit Diagram AI** یا **Fritzing + پرامپت هوش مصنوعی** استفاده کن
  </div>
  <div p-4 bg="rose:10" rounded text-right>
    <b>ایده‌های مدل سه‌بعدی</b><br>
    → «فایل STL یک نگهدارندهٔ گوشی بساز»<br>
    → ابزارها: **Kaedim**, **Masterpiece Studio**<br>
    → برای چاپ سه‌بعدی یا درس CAD!
  </div>
</div>
</v-click>

<v-click>
<div mt-6 p-3 bg="green:10" rounded text-center>
  هوش مصنوعی سیم‌ها رو لحیم نمی‌کنه…<br>
  ولی کمکت می‌کنه تا <b>طرحشون</b> رو بکشی! 🔌
</div>
</v-click>

---
layout: center
---
# بهترین ابزارهای رایگان که حتماً باید امتحان کنی 🔧

<div grid="~ cols-1 md:cols-2" gap-6 mt-8>

<v-click>
<div p-4 bg="blue:10" rounded flex="~ col items-center">
  <div i-logos-qwen text-5xl mb2></div>
  <b>Qwen</b>
  <div text-sm text-center mt-2>
    عالی برای کدنویسی، ریاضی، منطق.<br>
    رایگان در <a href="https://qwen.ai" target="_blank">qwen.ai</a>
  </div>
</div>
</v-click>

<v-click>
<div p-4 bg="green:10" rounded flex="~ col items-center">
  <div i-logos-google text-5xl mb2></div>
  <b>NotebookLM</b>
  <div text-sm text-center mt-2>
    یادداشت‌ها رو آپلود کن → همراه مطالعه‌ات.<br>
    برای خلاصه‌کردن سخنرانی‌ها عالیه.
  </div>
</div>
</v-click>

<v-click>
<div p-4 bg="purple:10" rounded flex="~ col items-center">
  <div i-logos-github-octocat text-5xl mb2></div>
  <b>Github Copilot</b>
  <div text-sm text-center mt-2>
    همکار برنامه‌نویس هوش مصنوعی.<br>
    برای دانشجوها از طریق GitHub Student Pack رایگانه.
  </div>
</div>
</v-click>

<v-click>
<div p-4 bg="rose:10" rounded flex="~ col items-center">
  <div i-ph-terminal-window-duotone text-5xl mb2></div>
  <b>مدل‌های محلی (Llama.cpp)</b>
  <div text-sm text-center mt-2>
    هوش مصنوعی رو آفلاین اجرا کن — نیازی به اینترنت نیست.<br>
    برای هکری که به حریم خصوصی اهمیت میده.
  </div>
</div>
</v-click>

</div>

---
layout: center
---
# نکتهٔ پایانی 💡

<div mt-12 text-3xl v-click>
  هوش مصنوعی جایگزین تو نمیشه.<br>
  ولی دانشجویایی که باهوش ازش استفاده کنن؟<br>
  از همه جلو می‌زنن.
</div>

<v-click>
<div mt-8 p-4 bg="orange:10" rounded class="text-center">
  🔗 لینک‌ها: soheilsalimidev.ir<br>
</div>
</v-click>
