document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector("#intro-overlay button");
  const overlay = document.getElementById("intro-overlay");

  if (btn && overlay) {
    btn.addEventListener("click", function () {
      overlay.classList.add("exit");
      setTimeout(() => overlay.style.display = "none", 1200);
    });
  }

  // Load Lottie
  if (window.lottie) {
    lottie.loadAnimation({
      container: document.getElementById("lottie"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/assets/images/Hero section Background animation.json" // ← 꼭 json 파일인지 확인 필요
    });
  }
});
