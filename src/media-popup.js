// FIXME: Refactor later
var ipcRenderer = require('electron').ipcRenderer;
var img = document.getElementById('loadedImage');
var video = document.getElementById('loadedVideo');
var mediaWidth = 0,
mediaHeight = 0,
maxWidth = 800,
maxHeight = 600;

function resizeMedia(media) {
  if (media.path[0].id === img.id) {
    mediaWidth = this.width;
    mediaHeight = this.height;
  } else {
    mediaWidth = this.videoWidth;
    mediaHeight = this.videoHeight;
  }

  // Scale media proportionally if larger than maxWidth and maxHeight
  if (mediaWidth > maxWidth) {
    mediaHeight = mediaHeight * (maxWidth / mediaWidth);
    mediaWidth = maxWidth;
    if (mediaHeight > maxHeight) {
      mediaWidth = mediaWidth * (maxHeight / mediaHeight);
      mediaHeight = maxHeight;
    }
  } else if (mediaHeight > maxHeight) {
    mediaWidth = mediaWidth * (maxHeight / mediaHeight);
    mediaHeight = maxHeight;
    if (mediaWidth > maxWidth) {
      mediaHeight = mediaHeight * (maxWidth / mediaWidth);
      mediaWidth = maxWidth;
    }
  }
  if (this.width > 0 ) {
    this.width = mediaWidth;
    this.height = mediaHeight;
  } else {
    this.videoWidth = mediaWidth;
    this.videoHeight = mediaHeight;
  }
  ipcRenderer.send('imageDimensions', Math.round(mediaWidth), Math.round(mediaHeight));
}

ipcRenderer.on('load-media', (event, mediaUrl, mediaType) => {
  if (mediaType !== "video/mp4"){
    img.src = mediaUrl;
    img.onload = resizeMedia.bind(img)
  } else {
    video.src = mediaUrl;
    video.onloadedmetadata = resizeMedia.bind(video);
    video.preload = "auto";
    video.loop = true;
    video.autoplay = true;
    video.playbackRate = 1;
  }
});
