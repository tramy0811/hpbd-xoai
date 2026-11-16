# Chúc mừng sinh nhật Xoài 🎂

Phát triển tiếp từ https://github.com/calebman/girlfriend-gift-collection/tree/master/birth-want-to-say (gốc: https://github.com/AJLoveChina/birthday).

## Luồng
Bật đèn → Bật nhạc → Trang trí (banner + tên **Xoài**) → Thả bóng bay → Bánh kem → Thắp nến
→ **Thổi nến** (thổi vào micro hoặc chạm vào bánh) → pháo hoa + confetti
→ Chúc mừng sinh nhật (bóng xếp chữ ♥ XOÀI ♥ !) → Lời nhắn lần lượt
→ Màn kết (pháo hoa, tim & xoài bay) → **Mở lá thư**.

## Sửa nội dung: chỉ cần sửa `config.js`
- `name`: tên hiện dưới banner, trên bánh và trong thư
- `texts`: các lời nhắn; `imgs`: ảnh kèm từng câu (bỏ ảnh vào `imgs/`)
- `desc`: chữ trên các nút
- `balloonTexts`: 7 chữ trên 7 quả bóng
- `loveText`: dòng chữ cuối
- `letterTitle`, `letter`, `signature`: lá thư (cách một dòng trống để tách đoạn)
- Nhạc: thay file `assets/hbd.mp3` (giữ nguyên tên)

## Các file đã thêm/sửa so với bản gốc
- `assets/extra.js`, `assets/extra.css`: pháo hoa, confetti, thổi nến, tên, lá thư, nút nhạc, giao diện điện thoại
- `assets/effect.js`: thêm bước thổi nến, bóng bay vừa màn hình, lời nhắn kết thúc đúng lúc

## Chạy
`npx serve D:\HPBD` rồi mở link localhost. Micro chỉ hoạt động trên `localhost` hoặc `https://`.

`_ban-thu/` là bản làm mới thử nghiệm (không dùng).
