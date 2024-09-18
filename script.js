document.addEventListener('DOMContentLoaded', function() {
  // Listの表示切替機能
  const listToggle = document.getElementById('listToggle');
  const listContainer = document.getElementById('listContainer');

  if (listToggle) {
    listToggle.addEventListener('click', function(event) {
      event.preventDefault(); // リンクのデフォルト動作を無効化

      if (listContainer.classList.contains('show')) {
        listContainer.classList.remove('show');
      } else {
        listContainer.classList.add('show');
      }
    });
  }

  // Adminページへのパスワード保護機能
  const adminLink = document.getElementById('adminLink');

  if (adminLink) {
    adminLink.addEventListener('click', function(event) {
      event.preventDefault(); // リンクのデフォルト動作を無効化
      
      // パスワードプロンプトを表示
      const password = prompt("パスワードを入力してください:");

      // パスワード確認
      if (password === 'ak!win11') {
        // 正しい場合はAdminページにリダイレクト
        window.location.href = 'admin.html';
      } else {
        alert('パスワードが間違っています');
      }
    });
  }

  // マウスの動きに応じて水色の丸を表示する機能
  const mouseCircle = document.createElement('div');
  mouseCircle.className = 'mouse-circle';
  document.body.appendChild(mouseCircle);

  let timeout;

  document.addEventListener('mousemove', function(event) {
    window.requestAnimationFrame(() => {
      mouseCircle.style.left = `${event.clientX}px`;
      mouseCircle.style.top = `${event.clientY}px`;
    });
    
    // 以前のタイマーをクリア
    clearTimeout(timeout);

    // 丸を表示
    mouseCircle.style.opacity = 1;

    // 1.5秒後に丸を非表示
    timeout = setTimeout(function() {
      mouseCircle.style.opacity = 0;
    }, 1500);
  });

  // サイト閉鎖・再開機能
  const closeAllPagesButton = document.getElementById('closeAllPages');
  const reopenAllPagesButton = document.getElementById('reopenAllPages');

  if (closeAllPagesButton && reopenAllPagesButton) {
    closeAllPagesButton.addEventListener('click', function() {
      console.log('閉鎖ボタンがクリックされました。');
      updateSiteStatus(true);
    });

    reopenAllPagesButton.addEventListener('click', function() {
      console.log('再開ボタンがクリックされました。');
      updateSiteStatus(false);
    });
  }

  function updateSiteStatus(isClosed) {
    console.log('サイト状態を更新しています。新しい状態:', isClosed);
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
