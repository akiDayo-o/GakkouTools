<?php
$token = getenv('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'); // 環境変数からトークンを取得
$repo = 'akidayo-o/aki';
$file_path = 'status.json';

// POSTリクエストからデータを取得
$status = $_POST['siteClosed'] ?? 'close'; // デフォルト値として 'close' を設定

// GitHub API を使ってファイルの SHA を取得
$api_url = "https://api.github.com/repos/$repo/contents/$file_path";
$options = [
    'http' => [
        'header'  => "Authorization: token $token\r\nAccept: application/vnd.github.v3+json\r\n",
        'method'  => 'GET',
    ],
];
$context  = stream_context_create($options);
$response = file_get_contents($api_url, false, $context);
$file_info = json_decode($response, true);
$file_sha = $file_info['sha'];

// 新しい内容を設定
$content = json_encode(['siteClosed' => filter_var($status, FILTER_VALIDATE_BOOLEAN)]);
$content_base64 = base64_encode($content);

// ファイルを更新するためのリクエスト
$api_url = "https://api.github.com/repos/$repo/contents/$file_path";
$data = [
    'message' => "Update site status to " . ($status ? 'close' : 'open'),
    'content' => $content_base64,
    'sha' => $file_sha,
];
$options = [
    'http' => [
        'header'  => "Authorization: token $token\r\nAccept: application/vnd.github.v3+json\r\nContent-Type: application/json\r\n",
        'method'  => 'PUT',
        'content' => json_encode($data),
    ],
];
$context  = stream_context_create($options);
$response = file_get_contents($api_url, false, $context);

if ($response === FALSE) {
    http_response_code(500);
    die('Error updating file');
}

echo 'File updated successfully';
?>
