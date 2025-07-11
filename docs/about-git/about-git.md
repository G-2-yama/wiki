---
title: 操作方法(CLI)
authors: nnna
date: 2025-07-07
---

# Git概説 実践編(CLI)

:::warning[注意]
本記事はarchiveリポジトリから引用している．<br />
故に更新日より10ヶ月ほど前に作成した記事になっていることに注意．
:::

今回は，CLI (コマンドラインインタフェース)を使用したGitの簡単な使い方を説明します．  
目次は以下の通りです．

0. [SSHキーの設定](#0-sshキーの設定)
0. [クローン (clone)](#1-クローン-clone)
0. [状況の確認 (status, log)](#2-状況の確認-status-log)
0. [ローカルでの操作 (add, commit)](#3-ローカルでの操作-add-commit)
0. [リモートとのやり取り (push, pull)](#4-リモートとのやり取り-push-pull)
0. [ブランチの確認，操作 (branch, checkout merge)](#5-ブランチの確認操作-branch-checkout-merge)

なお，他にもstashなどの便利な使い方はありますが，今回はあくまで簡単な使い方ということでそれらは省略させていただきます．
## 0. SSHキーの設定
この章ではやや番外編的な紹介として，SSHキーの設定を取り扱います．

SSHキーを設定することによって，以降パスワードを入力することなく設定したGitHubアカウントに対する操作を行えるようになります．  
他にリモートとローカルを紐づける手段として，httpsを用いる方法やGitHub Desktop，Visual Studioなどを用いる方法，或いはGitHub CLIを使う方法などがありますが，今回は敢えて初期設定がやや複雑なSSHを紹介します．

httpsで設定する場合や，それ以外の手段を用いる場合はこの章を飛ばしても構いません．

さて，前置きが長くなりましたがやっていきましょう．  
まずはGit環境が入っているCLIを開いてください (UbuntuのGNOME (bash)やwindowsのPowerShell (Command Prompt)などのこと)．  
(Gitのインストール方法についてはここでは省略するので，別途調べてください．ちなみに，私はWSLのUbuntu環境でシェルはfish shell，エミュレータはwindows terminalを使っています)

次に，`cd ~/.ssh` で鍵を管理するためのディレクトリに移動してください．  
そこで `ssh-keygen -t rsa` を実行すると鍵が生成されるはずです．
そこで3回ほど何か聞かれると思いますが，デフォルト設定で構わない場合は3回ともEnterを押せば大丈夫です．  
ただし，既に「id_rsa」という名前の鍵が存在する場合は更新されてしまう可能性があるので，1回目に質問に対して任意の名前を回答してください．

続いて， https://github.com/settings/ssh にアクセスして，画面右上の「Add SSH key」を押します．  
出てきた画面の中の「Title」に公開鍵名 (さっき付けた名前．デフォルトの場合はid_rsa)，「Key」に公開鍵 (デフォルトだとrsa_id.pub)の中身を入れます．

この時点で `ssh -T git@github.com` を実行して，`Hi (アカウント名)!` みたいな返事が返ってこれば以上で設定が完了ですが，そうでない場合は次の設定を行ってください．

まずは `touch ~/.ssh/config` (⇦ これはfishとかbashとかの場合) などで先ほどの場所に「config」ファイルを作成します．  
その中に
```
Host github github.com
    HostName github.com
    IdentityFile ~/.ssh/(ここに作成した鍵のファイル名．デフォルトだとid_rsa)
    User git
```
と記述してください．  
その後に `ssh -T github` と入力して `Hi (アカウント名)!` みたいな返事が返ってこれば完了です．

> 参考  
https://qiita.com/shizuma/items/2b2f873a0034839e47ce

## 1. クローン (clone)
今回のシナリオとしては，既にリモートリポジトリが存在して，それをSSHでクローンして編集を開始するということを想定しています．

まずはGitHubでクローンしたいリポジトリのページを開いて，緑色の「Code」という所をクリックします．  
その中の「SSH」というタブを開いて，`git@github.com:(user)/(repository.git)`をコピーします．すぐ右側にあるボタンを押すと簡単にコピーができます．

続いて，CLIでローカルリポジトリを作成したい場所に移動します．  
そこで
```
git clone (先ほどコピーしたテキスト)
```
を実行すると，リポジトリがクローンされます．

以降はクローンしてきたリポジトリの中で作業を行います．

## 2. 状況の確認 (status, log)
### 2.1 status
add, commitなどの操作を行う前に，まずは現状確認を行うためのコマンドについて紹介します．これも色々種類があるのですが，今回は私が非常によく使う2つのコマンドに絞って紹介します．

まずは
```
git status
```
です．  
このコマンドを実行すると，現在ステージング(add)されているファイル，編集のあったファイルなどを確認することが出来ます．  
また，このコマンドを実行すると `(use "git add (file)..." to include in what will be committed)` などでどんなコマンドを実行すれば良いのかなどを教えてくれます．

### 2.2 log
続いて紹介するのは
```
git log
```
です．
これを実行すると，過去のコミット履歴などを見たりすることが出来ます．  
ちなみに，ログが短ければ自動で抜けますが，長い場合は`矢印キー`または`h`，`j`でスクロールしたりしてログを見たり，`q` で抜けることが出来ます．  
また，このコマンドは `--graph` や `--oneline` など多くのオプションを付けることができ，見やすくすることが出来ます．

## 3. ローカルでの操作 (add, commit)
続いて，ローカル内での操作である `add` と `push` について紹介します．  
これらの詳しい意味合いが分からない方は過去動画(Git概説 知識編)を見ていただけるとありがたいです．

### 3.1 add
さて，まずは`add`ですが
```
git add .
```
とすることで，現在の作業ディレクトリ(bash系なら`pwd`，CommandPromptなら`cd`で確認できる)以下のディレクトリの差分をすべてステージングさせることが出来ます．  
リポジトリ全体(gitの管理下でないファイルも含む)を`add`したい場合は
```
git add -A
```
とします．

特定のファイルやディレクトリだけを`add`したい場合は，`.`の所をそのファイル(ディレクトリ)名にすれば可能です．例えば，sample.txtだけをaddしたい場合は
```
git add sample.txt
```
とすればOKです．  
その他にも `git add -i` で対話的なステージング(add)をすることも可能で便利ですが，ここでは説明を省略します．  
対話的なステージングや他のオプションについては https://git-scm.com/docs/git-add/ja を参照してください．

### 3.2 commit
続いて，`commit` を紹介します．
```
git commit -m "コミットメッセージ"
```
とすることでコミットを行うことが出来ます．

余談ですが，commitの粒度(頻度)は分かりにくくならない範囲で出来るだけ細かくしておくのが良いでしょう．まあこれは色々な流儀があるでしょうし，かなり人によりますけれど．

## 4. リモートとのやり取り (push, pull)
さて，いよいよリモートの操作を行います．  
(まあクローンもリモートとのやり取りではあるのですが)

### 4.1 push
先ほど行った `commit` をリモートに反映させるために `push` を行うわけですが，まずは
```
git branch -vv
```
を実行して上流ブランチを確認してください．上流ブランチという概念はここでは詳しくは説明しませんが，簡単に言えばローカルブランチが追跡しているリモートのブランチのことです．  
ここで現在作業している(左に`*`がついている)ブランチの `[origin/(ブランチ名)]` が狙い通りのブランチ名になっていればOKです．  
OKな場合は
```
git push
```
を実行すれば`push`完了です．

もし `[origin/(ブランチ名)]` などの項目がない場合などは，上流ブランチを設定しておくと次回以降の`push`が楽になります．  
(一応 `git push origin (ブランチ名)` で上流ブランチに関わらず`push`は可能です)  
```
git push -u origin (ブランチ名)
```
を実行することで`push`と同時に上流ブランチの設定が完了して，次回以降の`push`が
```
git push
```
で出来るようになります．

### 4.2 pull
では，続いてリモートの変更をローカルに反映させるための`pull`を紹介します．
```
git pull
```
を実行することによって，`pull`が可能です．

## 5. ブランチの確認，操作 (branch, checkout merge)
最後に，ブランチの確認と操作について解説します．

### 5.1 branch
まずは確認コマンドです．  
```
git branch -a
```
でリモートを含めたすべてのブランチを確認できます．  
ローカルだけ見たい場合はオプションの `-a` を付けずに実行してください．  
左側に `*` が付いているブランチが現在作業しているブランチになります．

また，4章で既出ではありますが
```
git branch -vv
```
というように `-vv` オプションを付けると上流ブランチ，ブランチ毎の最後の`commit`などを確認することが出来ます．

`branch` コマンドは他にも
```
git branch (ブランチ名)
```
で新たなローカルブランチを作成することが出来ますが，個人的にブランチの作成後はそのブランチで作業することが多いので (1人で使うことが多いからかな......)，次項の `checkout` コマンドで作成することの方が多いような気がします．
### 5.2 checkout
作業ブランチを切り替える場合，
```
git checkout (ブランチ名)
```
で切り替えることが出来ます．

また，
```
git checkout -b (ブランチ名)
```
というように `-b` オプションを付けることで，ローカル内でブランチを作成してからそこに移動することが出来ます．

リモートのブランチをローカルに持ってきてからそこに移動する場合は
```
git checkout -b (ブランチ名) origin/(ブランチ名)
```
としてください．

またその逆の操作として，ローカル上にしかないブランチをリモートに作成する方法を紹介しておきます．一応これも4章で既出ですが，
```
git push -u origin (ローカルのブランチ名)
```
を実行すれば可能です．

### 5.3 merge
`merge` を行うには，マージされる側(主となる，取り込む側のブランチ．例としてmain-branchとする)にチェックアウトしてから，マージする側(取り込まれる側のブランチ．例としてsub-branchとする)を指定するような形で
```
git merge (取り込まれるブランチ名．今回の例ではsub-branch)
```
というように実行します．  
こうすると，main-branchの`commit`履歴にsub-branchの履歴が統合されます．

> 参考 (実際に使うときはこちらの資料を見るとやりやすいです)  
https://qiita.com/kohga/items/dccf135b0af395f69144
