document.addEventListener('DOMContentLoaded', function() {
  // サイト閉鎖チェックをサーバーから行う
  checkSiteStatus();

  function checkSiteStatus() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'status.json', true); // サーバー上の status.json を取得
    xhr.onload = function() {
      if (xhr.status === 200) {
        const status = JSON.parse(xhr.responseText);

        // サイトが閉鎖されている場合の処理
        if (status.siteClosed) {
          const currentPage = window.location.pathname.split('/').pop(); // 現在のページ名を取得

          // admin.html または error.html 以外のページならリダイレクト
          if (currentPage !== 'admin.html' && currentPage !== 'error.html') {
            window.location.href = 'error.html'; // error.html にリダイレクト
          }
        }
      } else {
        console.error('サーバーから状態を取得できませんでした。');
      }
    };
    xhr.send();
  }

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
      updateSiteStatus(true);
    });

    reopenAllPagesButton.addEventListener('click', function() {
      updateSiteStatus(false);
    });
  }

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
