# mdc-api-system
mdc-equipt-api

一個專為MDC器材租借系統而生的後端API。
使用Sails.js製作，如要開始使用，請進入src中，
```console
$ node app.js --port 1336
```
預設將會是開發模式，資料庫模式為alter。

## 環境設置
請在src中，新增.env檔案，檔案內容如下：
```
POSTGRESQL_USR= 資料庫名稱
POSTGRESQL_PASS= 資料庫密碼
POSTGRESQL_HOST= 資料庫位置


recaptcha= Google Recaptcha API Key

MAILFROM=郵件發出者 如：'MDC租借系統<do-not-reply@autosend.mdcstudio.tw>'
MAILUSER= SMTP帳號
MAILPASS=SMTP密碼
MAILHOST=SMTP伺服器，如：'smtp-relay.sendinblue.com'


ADMINCLIENT=管理者客戶端路徑
```
