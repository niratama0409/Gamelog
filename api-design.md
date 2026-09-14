# API設計

| API名 | URL | HTTP | 役割 | 認証 |
|---|---|---|---|---|
| ログイン | /api/auth/login | POST | 認証 | 不要 |
| ゲーム一覧 | /api/games | GET | 自分のゲームを取得 | 必要 |
| ゲーム詳細 | /api/games/{id} | GET | 1件取得 | 必要 |
| ゲーム登録 | /api/games | POST | 登録 | 必要 |
| ゲーム更新 | /api/games/{id} | PUT | 更新 | 必要 |
| ゲーム削除 | /api/games/{id} | DELETE | 削除 | 必要 |
| メモ一覧 | /api/games/{id}/memos | GET | メモ取得 | 必要 |
| メモ登録 | /api/games/{id}/memos | POST | メモ登録 | 必要 |
