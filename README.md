TextHatenaInline
================

[はてな記法](http://hatenadiary.g.hatena.ne.jp/keyword/%E3%81%AF%E3%81%A6%E3%81%AA%E8%A8%98%E6%B3%95%E4%B8%80%E8%A6%A7) のインライン記法のパーサー

## Usage

```javascript
import textHatenaInline from 'text-hatena-inline';

textHatenaInline.parse(
    '[https://example.com/:title=Hello]'
).then(parsed => {
    consoe.log(parsed); // <a href="https://example.com/"></a>
});
```

## 対応しているインライン記法

- [http 記法](http://hatenadiary.g.hatena.ne.jp/keyword/%E3%83%AA%E3%83%B3%E3%82%AF%E3%82%92%E7%B0%A1%E5%8D%98%E3%81%AB%E8%A8%98%E8%BF%B0%E3%81%99%E3%82%8B%EF%BC%88http%E8%A8%98%E6%B3%95%E3%80%81mailto%E8%A8%98%E6%B3%95%EF%BC%89)
  - `[https://example.com/]`
  - `[https://example.com/:title]`
  - `[https://example.com/:title=This is title]`
- [id 記法](http://hatenadiary.g.hatena.ne.jp/keyword/%E3%81%AF%E3%81%A6%E3%81%AA%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AB%E3%83%AA%E3%83%B3%E3%82%AF%E3%81%99%E3%82%8B%EF%BC%88id%E8%A8%98%E6%B3%95%EF%BC%89)
  - 現在は未対応
- [fotolife 記法](http://hatenadiary.g.hatena.ne.jp/keyword/%E3%81%AF%E3%81%A6%E3%81%AA%E3%83%95%E3%82%A9%E3%83%88%E3%83%A9%E3%82%A4%E3%83%95%E3%81%AB%E7%99%BB%E9%8C%B2%E3%81%97%E3%81%9F%E5%86%99%E7%9C%9F%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B%EF%BC%88fotolife%E8%A8%98%E6%B3%95%EF%BC%89)
  - 現在は未対応