const fs = require('fs');

const familyData = {
    "北海道": { spot: "旭山動物園", hotel: "星野リゾート トマム" },
    "青森県": { spot: "青森県営浅虫水族館", hotel: "星野リゾート 青森屋" },
    "岩手県": { spot: "小岩井農場", hotel: "結びの宿 愛隣館" },
    "宮城県": { spot: "仙台うみの杜水族館", hotel: "秋保温泉 ホテル瑞鳳" },
    "秋田県": { spot: "男鹿水族館GAO", hotel: "セイコーグランドホテル" },
    "山形県": { spot: "加茂水族館（クラゲドリーム館）", hotel: "日本の宿 古窯" },
    "福島県": { spot: "スパリゾートハワイアンズ", hotel: "スパリゾートハワイアンズ ホテルハワイアンズ" },
    "茨城県": { spot: "アクアワールド茨城県大洗水族館", hotel: "大洗ホテル" },
    "栃木県": { spot: "那須サファリパーク", hotel: "ホテルエピナール那須" },
    "群馬県": { spot: "軽井沢おもちゃ王国", hotel: "ホテルグリーンプラザ軽井沢" },
    "埼玉県": { spot: "鉄道博物館", hotel: "おふろcafe utatane" },
    "千葉県": { spot: "マザー牧場", hotel: "三日月シーパークホテル勝浦" },
    "東京都": { spot: "キッザニア東京", hotel: "京王プラザホテル" },
    "神奈川県": { spot: "横浜アンパンマンこどもミュージアム", hotel: "箱根小涌園 天悠" },
    "新潟県": { spot: "新潟市水族館 マリンピア日本海", hotel: "あてま温泉 当間高原リゾート ベルナティオ" },
    "富山県": { spot: "富山市ファミリーパーク", hotel: "宇奈月温泉 延対寺荘" },
    "石川県": { spot: "いしかわ動物園", hotel: "加賀屋" },
    "福井県": { spot: "福井県立恐竜博物館", hotel: "清風荘" },
    "山梨県": { spot: "富士急ハイランド（トーマスランド）", hotel: "星野リゾート リゾナーレ八ヶ岳" },
    "長野県": { spot: "白樺リゾート 池の平ファミリーランド", hotel: "白樺リゾート 池の平ホテル" },
    "岐阜県": { spot: "世界淡水魚園水族館 アクア・トト ぎふ", hotel: "水明館" },
    "静岡県": { spot: "富士サファリパーク", hotel: "星野リゾート リゾナーレ熱海" },
    "愛知県": { spot: "レゴランド・ジャパン", hotel: "レゴランド・ジャパン・ホテル" },
    "三重県": { spot: "鈴鹿サーキットパーク", hotel: "鈴鹿サーキットホテル" },
    "滋賀県": { spot: "滋賀県立琵琶湖博物館", hotel: "琵琶湖マリオットホテル" },
    "京都府": { spot: "東映太秦映画村", hotel: "京都梅小路 花伝抄" },
    "大阪府": { spot: "キッズプラザ大阪", hotel: "ホテルユニバーサルポート" },
    "兵庫県": { spot: "ニジゲンノモリ", hotel: "ネスタリゾート神戸" },
    "奈良県": { spot: "生駒山上遊園地", hotel: "奈良健康ランド・奈良プラザホテル" },
    "和歌山県": { spot: "アドベンチャーワールド", hotel: "白浜温泉 ホテル川久" },
    "鳥取県": { spot: "水木しげるロード", hotel: "皆生シーサイドホテル 海遊亭" },
    "島根県": { spot: "しまね海洋館アクアス", hotel: "出雲 玉造温泉 白石家" },
    "岡山県": { spot: "おもちゃ王国", hotel: "ダイヤモンド瀬戸内マリンホテル" },
    "広島県": { spot: "みろくの里", hotel: "グランドプリンスホテル広島" },
    "山口県": { spot: "秋吉台サファリランド", hotel: "大谷山荘" },
    "徳島県": { spot: "あすたむらんど徳島", hotel: "アオアヲ ナルト リゾート" },
    "香川県": { spot: "NEWレオマワールド", hotel: "大江戸温泉物語 琴平グランドホテル 桜の抄" },
    "愛媛県": { spot: "愛媛県立とべ動物園", hotel: "道後プリンスホテル" },
    "高知県": { spot: "やなせたかし記念館 アンパンマンミュージアム", hotel: "城西館" },
    "福岡県": { spot: "マリンワールド海の中道", hotel: "THE LUIGANS Spa & Resort" },
    "佐賀県": { spot: "メルヘン村", hotel: "嬉野温泉 旅館 大村屋" },
    "長崎県": { spot: "ハウステンボス", hotel: "ホテルオークラJRハウステンボス" },
    "熊本県": { spot: "阿蘇ファームランド", hotel: "阿蘇ファームヴィレッジ" },
    "大分県": { spot: "アフリカンサファリ", hotel: "杉乃井ホテル" },
    "宮崎県": { spot: "フェニックス市自然動物園", hotel: "シェラトン・グランデ・オーシャンリゾート" },
    "鹿児島県": { spot: "平川動物公園", hotel: "指宿白水館" },
    "沖縄県": { spot: "沖縄美ら海水族館", hotel: "ルネッサンス リゾート オキナワ" }
};

let dataFile = fs.readFileSync('data.js', 'utf-8');
const jsonStr = dataFile.replace('const prefectureData = ', '').replace(/;/g, '').trim();
const data = JSON.parse(jsonStr);

data.forEach(pref => {
    const fData = familyData[pref.name];
    if (fData) {
        pref.spots.push(`👦[キッズ] ${fData.spot}`);
        pref.spots.push(`🏨[ファミリー宿] ${fData.hotel}`);
    }
    
    // Add Family genre if not exists
    if (!pref.genre.includes("子連れ・ファミリー")) {
        pref.genre = pref.genre + "・子連れ・ファミリー";
    }
});

const output = 'const prefectureData = ' + JSON.stringify(data, null, 4) + ';';
fs.writeFileSync('data.js', output);
console.log("Family spots and hotels added!");
