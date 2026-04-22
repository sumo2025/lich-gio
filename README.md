# 🕯️ Lịch Giỗ Dòng Họ — v1.3.3

Ứng dụng web tĩnh lưu giữ và nhắc nhở ngày giỗ theo âm lịch của Họ Lê.  
Chạy hoàn toàn trên trình duyệt — không cần server, không cần internet.

## ✨ Tính năng

- Hiển thị ngày giỗ theo tháng âm lịch, phân loại: **Cúng / Gửi / Nhớ ngày**
- Bảng **Lịch giỗ 30 ngày tới** — đếm ngược tự động
- Quy đổi âm lịch → dương lịch hoàn toàn offline (thuật toán Hồ Ngọc Đức)
- **Tab Thêm ngày giỗ mới** — nhập liệu nhanh
- **Tab Sửa dữ liệu** — chỉnh sửa/xóa, bảo vệ bằng mã PIN
- Xuất **`.ics`** với nhắc nhở thông minh theo từng loại giỗ
- Xuất **CSV** để lưu trữ / in ấn
- Nút **HDSD lịch nhắc nhở** — hướng dẫn từng bước nhập .ics vào lịch
- **Dark mode** / Light mode
- Giao diện responsive: điện thoại, máy tính bảng, PC

## 📅 Quy tắc nhắc nhở trong file .ics

| Loại giỗ | Nhắc trước |
|----------|------------|
| **Cúng** (trong nhà) | 15 ngày · 7 ngày · 3 ngày |
| **Gửi** (họ hàng) | 3 ngày · 1 ngày |
| **Nhớ ngày** | 1 ngày |

File `.ics` xuất cho cả năm hiện tại và năm sau.

## 📅 Quy đổi âm lịch → dương lịch

> **Hoàn toàn tự động, không cần internet, đúng mọi năm kể cả 2027, 2028...**

Thuật toán **Hồ Ngọc Đức** nhúng trực tiếp trong HTML — tính toán ngay trên trình duyệt, xử lý đúng năm nhuận âm lịch, múi giờ UTC+7.

## 🚀 Sử dụng

### GitHub Pages
1. Fork repo → **Settings → Pages → Branch: main → / (root)** → Save
2. Truy cập: `https://<tên-tài-khoản>.github.io/<tên-repo>/Ngay_gio_ho_Le.html`

### Offline
Mở `Ngay_gio_ho_Le.html` bằng bất kỳ trình duyệt nào. Không cần cài đặt gì.

## 🔒 Bảo mật & An toàn khi share GitHub

| # | Vấn đề | Giải pháp |
|---|--------|-----------|
| 1 | XSS qua innerHTML | `esc()` escape mọi dữ liệu người dùng trước khi render |
| 2 | Toast hiển thị HTML | Dùng `textContent` thay `innerHTML` |
| 3 | ICS injection | `escICS()` theo RFC 5545 |
| 4 | Thiếu Content Security Policy | Meta CSP — chặn script ngoài, chặn `connect-src` |
| 5 | localStorage không validate | `validateRecord()` — kiểu, độ dài, whitelist `cat` |
| 6 | Input không giới hạn | `maxlength` HTML + `.slice()` JS |
| 7 | PIN plain text | Hash djb2 — không lưu PIN gốc trong source |
| 8 | Brute-force PIN | Khoá 30 giây sau 5 lần sai |

> **Không có API key, không gọi server ngoài** (chỉ Google Fonts), không lưu dữ liệu lên internet → **an toàn tuyệt đối khi đưa lên GitHub public.**

## 🔑 Đổi mã PIN

PIN mặc định là **1234**. Để đổi:
1. Mở DevTools (F12) → Console
2. Chạy: `djb2('pinMới')` — ví dụ `djb2('5678')` → trả về một số
3. Sửa `const PIN_HASH=` trong file HTML thành số đó

## 📲 Hướng dẫn nhập file `.ics` vào lịch

Nhấn nút **📖 HDSD lịch nhắc nhở** trong ứng dụng để xem hướng dẫn đầy đủ cho từng thiết bị.  
Tóm tắt nhanh:

### 🍎 iPhone / iPad
1. App **Files** → tìm file `.ics` → nhấn → **Thêm tất cả**
2. Hoặc gửi file qua email → mở đính kèm → **Thêm tất cả**
> ⚠ Safari không mở .ics trực tiếp — dùng Files hoặc email.

👉 Tạo lịch riêng: App **Lịch** → tab *Lịch* → **Thêm lịch** → đặt tên "Lịch Giỗ Dòng Họ"

### 🤖 Android
1. Mở **calendar.google.com** trên máy tính → ⚙ → **Nhập & xuất → Nhập** → chọn file `.ics`
2. Lịch tự đồng bộ về điện thoại qua tài khoản Google

👉 Tạo lịch riêng: Google Calendar → **Lịch khác → Tạo lịch mới**

### 🖥️ Windows — Outlook
**File → Mở & Xuất → Nhập/Xuất** → *Nhập tệp iCalendar* → chọn file → **Nhập**

### 🍎 macOS — Calendar
Kéo file `.ics` vào cửa sổ Calendar, hoặc **Tệp → Nhập…**

### 🌐 Google Calendar (Trình duyệt)
**calendar.google.com** → ⚙ Cài đặt → **Nhập & xuất → Nhập**

> 💡 **Khuyến nghị:** Tạo **lịch riêng** "Lịch Giỗ Dòng Họ" thay vì nhập vào lịch mặc định — để sau này có thể xóa riêng mà không ảnh hưởng lịch cá nhân.

## 💾 Lưu ý dữ liệu

- Lưu trong **localStorage** — không mất khi đóng tab
- **Không đồng bộ** giữa các thiết bị — mỗi thiết bị lưu riêng
- Dữ liệu gốc nhúng sẵn trong mảng `DD` trong `<script>`

## 🛠️ Tùy chỉnh danh sách ngày giỗ

Mở file HTML → sửa mảng `DD`:

```js
const DD = [
  { id: 1, month: 1, cat: 'cung', name: 'Bà nội', day: 11, note: '' },
  // ...
];
```

| Trường | Giá trị hợp lệ |
|--------|---------------|
| `month` | 1–12 (tháng âm) |
| `day` | 1–30 (ngày âm) |
| `cat` | `'cung'` / `'gui'` / `'nho'` |
| `name` | Tối đa 80 ký tự |
| `note` | Tối đa 120 ký tự |

## 📄 Giấy phép

Dự án cá nhân — chia sẻ tự do trong gia đình họ Lê.  
Tạo bởi **Lê Minh Hải** · 2026
