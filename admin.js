document.addEventListener('DOMContentLoaded', function() {
  const closeAllPagesButton = document.getElementById('closeAllPages');
  const reopenAllPagesButton = document.getElementById('reopenAllPages');

  // サイト閉鎖機能
  closeAllPagesButton.addEventListener('click', function() {
    updateSiteStatus(true);
  });

  // サイト再開機能
  reopenAllPagesButton.addEventListener('click', function() {
    updateSiteStatus(false);
  });

  // サイト状態をサーバーに送信
  function updateSiteStatus(isClosed) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'update_status.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status === 200) {
        alert(isClosed ? 'サイトを閉鎖しました。' : 'サイトを再開しました。');
        window.location.reload();
      } else {
        alert('エラーが発生しました。');
      }
    };
    xhr.send('siteClosed=' + isClosed);
  }
});
