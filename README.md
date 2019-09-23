# chchyomi

> 5ch 読み上げ CLI

## Usage

```
$ npm i -g chchyomi
$ chchyomi [thread URL]
```

```
$ npx chchyomi [thread URL]
```

## Options

- `--char, -c talk char length (default 40)`

## Examples

```
# スレの読み上げ 
$ chchyomi https://hebi.5ch.net/test/read.cgi/news4vip/1234567890/

# 20文字だけ読み上げ
$ chchyomi https://hebi.5ch.net/test/read.cgi/news4vip/1234567890/ -c 20
```

## Other
- network 変わったら自動停止
- [chch](https://github.com/vipquality/chch)
