document.addEventListener('DOMContentLoaded', function() {
  // サイト閉鎖ボタン
  const closeAllPagesButton = document.getElementById('closeAllPages');
  // サイト再開ボタン
  const reopenAllPagesButton = document.getElementById('reopenAllPages');
  
  // サイト閉鎖機能
  closeAllPagesButton.addEventListener('click', function() {
    localStorage.setItem('siteClosed', 'true');
    alert('サイトを閉鎖しました。');
    // 全てのページをリロードして閉鎖状態にする
    window.location.reload();
  });
  
  // サイト再開機能
  reopenAllPagesButton.addEventListener('click', function() {
    localStorage.removeItem('siteClosed');
    alert('サイトを再開しました。');
    // 全てのページをリロードして再開状態にする
    window.location.reload();
  });
});
