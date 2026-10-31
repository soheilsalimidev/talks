---
layout: center
class: text-center
---

<div class="flex flex-col items-center justify-center gap-4">

  <!-- Title -->
  <h1 class="text-7xl md:text-8xl font-extrabold leading-none p-2 m-0 animate-gradient bg-gradient-to-r from-orange-600 via-blue-500 to-green-500 text-transparent bg-clip-text">
    Thank You
  </h1>

  <!-- Subtitle -->
  <p class="text-2xl font-bold m-0 animate-gradient bg-gradient-to-r from-orange-600 via-blue-500 to-green-500 text-transparent bg-clip-text">
    Hope you have a great day ✨
  </p>

  <!-- Divider -->
  <div class="w-48 h-1 mt-2 rounded-full bg-gradient-to-r from-orange-500 via-blue-500 to-green-400 opacity-60"></div>

  <!-- Contact cards -->
  <div class="flex flex-wrap items-center justify-center gap-4 mt-6">
    <a class="contact-card" href="soheilsalimidev@gmail.com">
      <mdi-email class="text-xl" />
      <span>soheilsalimidev@gmail.com</span>
    </a>
    <a class="contact-card" href="https://github.com/soheilsalimidev" target="_blank">
      <mdi-github class="text-xl" />
      <span>@soheilsalimidev</span>
    </a>
    <a class="contact-card" href="https://t.me/your-telegram-id" target="_blank">
      <mdi-telegram class="text-xl" />
      <span>@soheilsalimidev</span>
    </a>
  </div>
  <!-- Optional footer line -->
  <p class="text-sm opacity-60 mt-8">
    Slides &amp; code → github.com/soheilsalimidev/talks
  </p>

</div>

<style>
.animate-gradient {
  background-size: 300%;
  -webkit-animation: animatedgradient 6s ease infinite alternate;
  -moz-animation: animatedgradient 6s ease infinite alternate;
  animation: animatedgradient 6s ease infinite alternate;
}

@keyframes animatedgradient {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.contact-card {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.65rem 1.25rem;
  border-radius: 9999px;
  font-size: 1.05rem;
  font-weight: 500;
  text-decoration: none;
  color: inherit;
  background: rgba(128, 128, 128, 0.10);
  border: 1px solid rgba(128, 128, 128, 0.28);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.contact-card:hover {
  transform: translateY(-4px);
  background: rgba(128, 128, 128, 0.16);
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 10px 24px rgba(59, 130, 246, 0.22);
}
</style>
