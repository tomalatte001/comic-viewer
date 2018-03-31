# comic-viewer

ブラウザ上で漫画を読めるようにするためのソースです。

## サンプル

https://tomalatte001.github.io/comic-viewer/sample/

## 導入方法

GitHub 上のファイルをすべてダウンロードして、DocumentRoot に配置すれば /sample/index.html でサンプル画面が確認できます。  
下記の 1～3 の手順により、各自の漫画を表示することが可能になります。

### 1. パラメータの調整

まず、sample/index.html 内の下記のパラメータを変更します。

    <input id="comic-dir-large" type="hidden" name="dir-large" value="/sample/images/large">
    <input id="comic-dir-small" type="hidden" name="dir-small" value="/sample/images/small">
    <input id="comic-extension" type="hidden" name="extension" value="jpg">
    <input id="comic-loading" type="hidden" name="loading" value="/images/loading.gif">
    <input id="comic-page-count" type="hidden" name="count" value="10">
    <input id="comic-page-start" type="hidden" name="start" value="l">
    <input id="comic-title" type="hidden" name="title" value="esper hunter">

|name|内容|
----|---- 
|dir-large|PC用の大きめの漫画の画像ファイルを保存するディレクトリを指定します。|
|dir-small|スマホ用の小さ目の漫画の画像ファイルを保存するディレクトリを指定します。画像を1種類しか用意していない場合、dir-large と同じディレクトリを指定しても問題ありません。|
|extension|dir-large、dir-small で指定したディレクトリ内の画像ファイルの拡張子を指定します。|
|loading|画像読み込み中のローディング画像のパスを指定します。sample のまま使用する場合、/images/loading.gif のままでＯＫです。|
|count|漫画のページ数（画像枚数）を指定します。|
|start|漫画の1ページ目が左ページから始まるか、右ページから始まるかを指定します。左の場合"l"を、右の場合"r"を指定します。|
|title|漫画のタイトルを指定します。|

### 2. 画像の配置

上記 dir-large、dir-small で指定したディレクトリに、count で指定した枚数の漫画の画像を配置します。  
ファイル名は 1 から連番で指定します。  
例えば、extension が png で count が 5 の場合、1.png、2.png、3.png、4.png、5.png の5枚を配置します。  

### 3. デザインの調整

sample/css/custom.css 内の style を編集することにより、文字、背景、幅など細かい調整が可能です。  
また、sample/index.html 内の #header-comic、#footer-comic 内の要素も変更可能です。

## 主な挙動について

ＰＣ版（ブラウザ幅:750px超）では、左右にページを配置し、左ページにマウスオーバー＆クリックで進む、右ページにマウスオーバー＆クリックで戻る、という挙動になっています。
スマホ版（ブラウザ幅:750px以下）では、縦スクロールで読むようになっています。
