// FIXME: Refactor later
import { ipcRenderer } from 'electron';

var hls = require('hls.js');
var img = document.getElementById('loadedImage');
var video = document.getElementById('loadedVideo');
var body = document.getElementsByTagName("body")[0];
var hlsMedia = new hls();
var mediaWidth = 0,
mediaHeight = 0,
maxWidth = 800,
maxHeight = 600;

if (process.platform !== 'darwin') {
  body.style = "padding-top: 0px;";
}

function resizeMedia(media) {
  if (media.path[0].id === img.id) {
    mediaWidth = this.width;
    mediaHeight = this.height;
  } else {
    if (video.title === "HLS media") {
      mediaWidth = this.videoWidth * 4;
      mediaHeight = this.videoHeight * 4;
    } else {
      mediaWidth = this.videoWidth;
      mediaHeight = this.videoHeight;
    }
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
    media.videoWidth = mediaWidth;
    media.videoHeight = mediaHeight;
  }
  ipcRenderer.send('imageDimensions', Math.round(mediaWidth), Math.round(mediaHeight));
}

ipcRenderer.once('load-media', (event, mediaUrl, mediaType) => {
  if (mediaType !== "video/mp4" && mediaType !== "application/x-mpegURL"){
    img.src = mediaUrl;
    img.onload = resizeMedia.bind(img);
  } else if (mediaType === "application/x-mpegURL") {
    hlsMedia.loadSource(mediaUrl);
    hlsMedia.attachMedia(video);
    video.onloadedmetadata = resizeMedia.bind(hlsMedia.media);
    video.title = "HLS media";
  } else {
    video.src = mediaUrl;
    video.onloadedmetadata = resizeMedia.bind(video);
    video.preload = "auto";
    video.loop = true;
    video.autoplay = true;
    video.playbackRate = 1;
  }
});