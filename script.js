document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const videoWrapper = document.getElementById('video-wrapper');

  const isPortrait = window.innerHeight > window.innerWidth;
  const videoSrc = isPortrait ? "UnicornRideVert.mp4" : "UnicornRideHori.mp4";

  const video = document.createElement('video');
  video.id = 'intro-video';
  video.src = videoSrc;
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.style.width = "100%";
  video.style.height = "100vh";
  video.style.objectFit = "cover";
  video.style.display = "block";

  videoWrapper.appendChild(video);

  video.load();

  const tryPlay = () => {
    video.play().then(() => {
      console.log("Video is playing");
    }).catch((err) => {
      console.warn("Autoplay blocked, showing play button:", err);
      const playBtn = document.createElement('button');
      playBtn.textContent = "Tap to Start";
      playBtn.style = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1em 2em;
        font-size: 1.5rem;
        background: #d63384;
        color: white;
        border: none;
        border-radius: 12px;
        z-index: 1000;
        cursor: pointer;
      `;
      playBtn.onclick = () => {
        video.play().then(() => {
          playBtn.remove();
        });
      };
      videoWrapper.appendChild(playBtn);
    });
  };

  tryPlay();

  video.onended = () => {
  videoWrapper.style.opacity = "0";
  setTimeout(() => {
    videoWrapper.style.display = "none";
    content.classList.add('visible');
  }, 1000); // match fade-out duration
};

});
