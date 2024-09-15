document.addEventListener('DOMContentLoaded', function() {
  // サイト閉鎖チェック
  if (localStorage.getItem('siteClosed') === 'true') {
    const currentPage = window.location.pathname.split('/').pop(); // 現在のページ名を取得
    // admin.html 以外のページは error.html にリダイレクト
    if (currentPage !== 'admin.html' && currentPage !== 'error.html') {
      window.location.href = 'error.html';
      return; // 以降の処理を実行しない
    }
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
    // 丸の位置をマウスの位置に合わせる
    mouseCircle.style.left = `${event.clientX}px`;
    mouseCircle.style.top = `${event.clientY}px`;

    // 以前のタイマーをクリア
    clearTimeout(timeout);

    // 丸を表示
    mouseCircle.style.opacity = 1;

    // 1.5秒後に丸を非表示
    timeout = setTimeout(function() {
      mouseCircle.style.opacity = 0;
    }, 1500);
  });
});
