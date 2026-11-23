# Sinh nhật Xoài cùng Mango

Mở cửa cùng Mango → mở 3 món quà → ước nguyện và thổi nến bằng cách chạm → đọc thiệp → chơi lại.

Chạy tại thư mục này: `python -m http.server 8086 --bind 127.0.0.1`, mở http://127.0.0.1:8086.

Sửa tên, lời chúc và người gửi trong `config.js`. Nhạc ở `assets/hbd.mp3`, có nút bật/tắt. Không cần micro.

Giao diện: `index.html`, `assets/mango-birthday.css`, `assets/mango-birthday.js`. Mascot trong `assets/mango/`. Ảnh thiết kế nhân vật: `assets/mango/mango-birthday-character-sheet.png`.

Bản HTML trước khi sửa: `index-before-mango.html`. Các tài nguyên cũ vẫn còn để dùng lại.

## Hoạt cảnh Mango
Bản hiện tại sử dụng `assets/mango-animation.js` và `assets/mango-animation.css`. Căn phòng là lớp nền riêng; Mango dùng sáu tư thế trong sprite sheet trong `assets/mango/mango-action-sprites.png`. Cửa, quà, bánh và nến là các lớp chuyển động độc lập. Nút hành động khóa trong khi nhân vật đang thực hiện để tránh bấm chồng. Có hỗ trợ giảm chuyển động theo cài đặt hệ thống.
