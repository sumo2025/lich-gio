# 🪷 Lịch Giỗ Dòng Họ

> **Lưu giữ ký ức - Tưởng nhớ tổ tiên & người thân**

[![Version](https://img.shields.io/badge/version-V1.5.0-b8860b?style=flat-square)](https://github.com/sumo2025/lich-gio/releases/latest)
[![License](https://img.shields.io/badge/license-MIT-5a7a5a?style=flat-square)](#license)
[![PWA](https://img.shields.io/badge/PWA-ready-2c5f8a?style=flat-square)](#cài-đặt-pwa)
[![No dependencies](https://img.shields.io/badge/dependencies-none-8b1a1a?style=flat-square)](#)

Ứng dụng web quản lý lịch giỗ dòng họ - chạy hoàn toàn trên trình duyệt, không cần server, không cần tài khoản. Một file HTML duy nhất, cài lên màn hình điện thoại như app thật.

🔗 **Demo:** https://sumo2025.github.io/lich-gio

---

## ✨ Tính năng

### 📋 Quản lý ngày giỗ
- Thêm, sửa, xóa ngày giỗ với tên, loại (Cúng / Gửi / Nhớ ngày) và ghi chú
- Hiển thị ngày dương lịch tương ứng theo từng năm (tự tính)
- Lọc theo tháng, tìm kiếm theo tên
- Chỉ hiển thị từ tháng hiện tại đến cuối năm khi không filter - tránh nhìn quá khứ

### 📅 Lịch & Nhắc nhở
- **30 ngày tới** - panel nổi bật các ngày giỗ sắp đến, đếm số ngày còn lại
- **Lịch âm theo tháng** - xem âm dương song song, đánh dấu ngày giỗ trực tiếp trên lịch
- **Xuất file .ics** - nhập vào Google Lịch / Apple Lịch để nhận thông báo tự động:
  - 🕯️ Cúng: trước 15 ngày, 7 ngày, 3 ngày
  - 📦 Gửi: trước 3 ngày, 1 ngày
  - 🌸 Nhớ ngày: trước 1 ngày

### 🔄 Tiện ích chuyển đổi ngày
- **Dương → Âm lịch**: nhập ngày dương lịch bất kỳ, xem ngày âm lịch tương ứng
- **Âm → Dương lịch**: nhập ngày âm lịch, xem ngày dương và thứ trong tuần
- Thuật toán Hồ Ngọc Đức (đã sửa bug lunarYear), chính xác từ 1900-2100
- Auto-advance: gõ đủ 2 số ngày → tự nhảy sang ô tháng → ô năm

### 🎨 Giao diện
- Light mode / Dark mode (toggle thủ công, lưu localStorage)
- Mobile-first, tối ưu iOS Safari và Android Chrome
- Khung "Hôm nay" hiển thị ngày dương + âm lịch hiện tại
- Button scroll-to-top (trang chủ lẫn hướng dẫn)

### 💾 Dữ liệu & Bảo mật
- Lưu hoàn toàn trên thiết bị (localStorage) - không server, không tài khoản
- **Sao lưu / Khôi phục** dữ liệu qua file JSON
- CSP header chặn script ngoài, không gọi API ngoài
- `safeParseJSON` chặn prototype pollution khi restore file
- PWA manifest và apple-touch-icon tạo runtime (không cần file ngoài)

---

## 🚀 Cài đặt PWA

### iPhone / iPad (Safari)
1. Mở link bằng **Safari**
2. Nhấn biểu tượng **Chia sẻ** → **Thêm vào Màn hình chính**
3. Đặt tên → nhấn **Thêm**

### Android (Chrome)
1. Mở link bằng **Chrome**
2. Nhấn **⋮** → **Thêm vào màn hình chính** hoặc **Cài ứng dụng**

---

## 📁 Cấu trúc

```
lich-gio/
├── index.html        ← Toàn bộ ứng dụng (single-file)
└── README.md
```

Không có dependencies, không có build step. Mở `index.html` bằng trình duyệt là chạy được.

---

## 🛠 Stack kỹ thuật

| Hạng mục | Chi tiết |
|---|---|
| Ngôn ngữ | Vanilla HTML / CSS / JavaScript (ES6) |
| Dependencies | Không có |
| Fonts | Google Fonts (Playfair Display, Lora) |
| Storage | localStorage (prefix `lichgio_`) |
| Lịch âm | Thuật toán Hồ Ngọc Đức - đã patch bug `lunarYear` |
| PWA | Manifest inline (Blob URL), Service Worker (Blob URL), apple-touch-icon Canvas |
| Bảo mật | CSP meta, `esc()` sanitize, `safeParseJSON`, không eval() |

---

## 📦 Deploy lên GitHub Pages

```bash
# Clone hoặc fork repo
git clone https://github.com/sumo2025/lich-gio.git
cd lich-gio

# Copy file mới nhất thành index.html
cp lich-gio_V1.5.0.html index.html

# Push lên GitHub
git add .
git commit -m "release: V1.5.0"
git push origin main
```

Sau đó vào **Settings → Pages → Source: main branch** → GitHub tự deploy.

---

## 📝 Changelog

### V1.5.0 *(latest)*
- Auto-advance date inputs: gõ đủ 2 số ngày/tháng → tự nhảy sang ô tiếp theo
- Validation: ngày ≤ 31, tháng ≤ 12, năm clamp 1900-2100
- Mobile: thu hẹp ô tìm kiếm để "Tất cả các tháng" hiển thị đầy đủ
- Select tháng âm lịch dùng tên tiếng Việt (Giêng, Hai, Ba...)
- Desktop: controls row đủ rộng, không còn khoảng trắng thừa

### V1.4.9
- Today-banner 2 dòng: icon + ngày dương (dòng 1), âm lịch (dòng 2)
- Button về đầu trang đổi thành hình tròn 44×44px (giống HDSD)
- Mobile controls không tràn (box-sizing border-box)

### V1.4.8
- **Fix bug lunarToSolar** trả `undefined/undefined/undefined` - dùng approach `getNM` thay vì dò loop
- Khung "Hôm nay" hiển thị ngày dương + âm lịch hiện tại
- Home chỉ hiện ngày giỗ từ tháng hiện tại đến cuối năm
- Lịch âm theo tháng: tên tháng âm thay số, reset về tháng hiện tại khi mở
- Button scroll-to-top trong HDSD
- Font lịch âm tăng 5%
- Mobile: ô tìm kiếm và chọn tháng cùng 1 dòng

### V1.4.7
- **Fix bug `solarToLunar`** sai lunarYear (code cũ dùng `solarMonth < 4` làm ngưỡng - sai)
- Tab "Chuyển đổi ngày" với 2 chiều: Dương → Âm và Âm → Dương

### V1.4.6
- `min-height: 100dvh` thay `100vh` (fix Safari mobile)
- PWA manifest và apple-touch-icon inline (không cần file ngoài)
- `safeParseJSON()` chặn prototype pollution
- Sắp xếp lại buttons: Thêm + Tiện ích (hàng 1), Xuất lịch + Hướng dẫn (hàng 2)

---

## 📄 License

MIT © Lê Minh Hải
