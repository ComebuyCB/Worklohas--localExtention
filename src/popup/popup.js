$(function () {

  // 標題顯示 manifest 的名稱與版本
  const manifest = chrome.runtime.getManifest();
  $('#app-title').text(`${manifest.name} ${manifest.version}`);

});
