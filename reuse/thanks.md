
<div class="flex h-full flex-col justify-center items-center">
  <!-- Soft background accents -->
  <div class="pointer-events-none absolute inset-0">
    <div class="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-300/30 blur-3xl"></div>
    <div class="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-sky-300/30 blur-3xl"></div>
    <div class="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-200/20 blur-3xl"></div>
  </div>

  <!-- Main content -->
  <main class="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
    <!-- Q&A badge -->
    <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-300/60 bg-white/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 backdrop-blur">
      <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
      Q&amp;A
    </div>
    <!-- Title -->
    <h1 class="animate-gradient bg-gradient-to-r from-orange-500 via-sky-500 to-emerald-500 bg-clip-text text-7xl font-black leading-none tracking-tight text-transparent md:text-8xl lg:text-9xl">
      Thank You
    </h1>
    <!-- Subtitle -->
    <p class="mt-5 max-w-xl text-xl font-semibold text-slate-900 md:text-2xl">
      Feel free to ask questions
    </p>
    <!-- Divider -->
    <div class="mx-auto mt-8 h-px w-28 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

  </main>

  <!-- Small social footer -->
  <footer class="relative flex flex-col items-center gap-2 pb-8 mt-auto">
    <div class="flex flex-wrap items-center justify-center gap-2">
      <a href="mailto:soheilsalimidev@gmail.com" class="social-chip">
        <mdi-email class="text-sm" />
        <span>Email</span>
      </a>
      <a href="https://github.com/soheilsalimidev" target="_blank" rel="noopener" class="social-chip">
        <mdi-github class="text-sm" />
        <span>GitHub</span>
      </a>
      <a href="https://t.me/your-telegram-id" target="_blank" rel="noopener" class="social-chip">
        <mdi-telegram class="text-sm" />
        <span>Telegram</span>
      </a>
    </div>
    <p class="text-[10px] text-slate-600">
      Slides &amp; code → github.com/soheilsalimidev/talks
    </p>
  </footer>

</div>

<style>
  .animate-gradient {
    background-size: 300%;
    animation: animatedgradient 6s ease infinite alternate;
  }

  @keyframes animatedgradient {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .social-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.8rem;
    border-radius: 9999px;
    font-size: 0.72rem;
    font-weight: 500;
    color: rgb(71 85 105);
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(148, 163, 184, 0.35);
    text-decoration: none;
    backdrop-filter: blur(6px);
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }

  .social-chip:hover {
    transform: translateY(-1px);
    color: rgb(15 23 42);
    background: #ffffff;
    border-color: rgba(100, 116, 139, 0.6);
  }
</style>
