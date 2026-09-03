# Quy Định Thiết Kế Giao Diện & Design System (UI/UX Guidelines)

Tài liệu này là quy chuẩn bắt buộc (Strict Rules) cho toàn bộ giao diện và mã nguồn của nền tảng **Skool Space / Permesh Community Hub**.

---

## 1. Triết Lý Thiết Kế (Core Philosophy)
* **Phong cách**: *Silicon Valley Luxury Minimalist* (Lấy cảm hứng từ **Linear, Vercel Geist, Raycast**).
* **Nguyên tắc cốt lõi**: **Restrained Luxury Accents** (Tiết chế màu sắc, tối đa hóa sự tinh tế). Không lạm dụng màu tím trên diện rộng; 90% diện tích là nền trung tính sạch sẽ và độ tương phản cao, 10% màu tím Violet/Indigo đóng vai trò điểm nhấn công nghệ.
* **Font chữ**: **100% Inter font** trên toàn bộ hệ thống (`font-sans` / `font-mono`).

---

## 2. Bảng Màu & Design Tokens (Color Palette)

### 2.1. Nền & Bề Mặt (Surfaces & Backgrounds)
| Môi trường | Thành phần | Mã Màu / Token | Mô tả |
| :--- | :--- | :--- | :--- |
| **Dark Mode** | Canvas Background | `#030208` (`--bg-primary`) | Deep Space Obsidian siêu sâu, không gây chói/mỏi mắt |
| **Dark Mode** | Card & Panel Surface | `#0a0718` (`--bg-surface`) | Midnight Charcoal cao cấp |
| **Dark Mode** | Hairline Border | `rgba(255, 255, 255, 0.07)` | Đường viền 1px siêu mảnh, sắc nét |
| **Dark Mode** | Hover Border Glow | `rgba(110, 86, 207, 0.38)` | Ánh sáng tím điện tử khi hover |
| **Light Mode** | Canvas Background | `#fcfcfd` | Studio White sạch sẽ |
| **Light Mode** | Card Surface | `#ffffff` | Pure White |
| **Light Mode** | Border | `#e4e5ed` | Tương phản nhẹ nhàng |

### 2.2. Màu Nhấn Công Nghệ (Electric Violet & Indigo)
* **Primary Violet (Vercel)**: `#6e56cf` (`brand.500`)
* **Primary Indigo (Linear)**: `#5e6ad2` (`brand.600`)
* **Signature Gradient**: `linear-gradient(135deg, #6e56cf 0%, #5e6ad2 100%)` (`purple-gradient-bg`)
* **Glow Shadow**: `0 0 24px -4px rgba(110, 86, 207, 0.3)` (`shadow-purple-glow`)

---

## 3. Quy Chuẩn Typography & Font Weight

> ⚠️ **CẤM TUYỆT ĐỐI**: Không sử dụng `font-black` (900 weight) vì gây cảm giác thô kệch, nặng nề. Không viết hoa toàn bộ (`UPPERCASE`) cho các tiêu đề nội dung.

* **Tiêu đề chính trang / Header (H1)**:
  `text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white`
* **Tiêu đề phân mục / Thẻ (H2)**:
  `text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100`
* **Tiêu đề con / Tên bài viết nhỏ (H3)**:
  `text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100`
* **Nội dung thân bài (Body Text)**:
  `text-xs sm:text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300`
* **Metadata & Phụ đề (Meta/Timestamps)**:
  `text-[10px] or text-[11px] font-mono text-zinc-400 dark:text-zinc-500`

---

## 4. Kích Thước & Tỷ Lệ Nút Bấm / Input (Button & Input Dimensions)

* **Nút CTA Chính (Primary Action Button)**:
  - Chiều cao & Padding: `px-4 py-2` hoặc `h-9 px-4`, bo góc `rounded-xl`.
  - Font: `text-xs font-semibold text-white`.
  - Background: `bg-gradient-to-r from-[#6e56cf] to-[#5e6ad2] shadow-purple-glow`.
* **Nút Hành Động Phụ / Nút Thao Tác (Secondary Buttons)**:
  - Chiều cao & Padding: `px-3 py-1.5` hoặc `h-8 px-3`, bo góc `rounded-xl`.
  - Font: `text-xs font-medium`.
* **Nút Gửi / Trả lời (Send / Submit Inline)**:
  - Chiều cao & Padding: `px-3.5 py-2` (`h-8`), bo góc `rounded-xl`, icon kích thước `w-3 h-3` đến `w-3.5 h-3.5`.
* **Cụm Tương Tác Đáy Bài Viết (Card Footer Actions)**:
  - Bố trí ở đáy thẻ: Nút Thả Tim (`Heart`), Bình luận (`MessageSquare`), Bookmark (`Bookmark`), và Chia sẻ (`Share2`).
  - **Không dùng background hay viền hộp**: Chỉ hiển thị biểu tượng (icon) và số đếm (number). Khi hover hoặc active, chỉ đổi màu chữ/icon và hiệu ứng phóng to nhẹ (micro-scale). Nút Thả Tim chuyển sắc hồng/đỏ `fill-rose-500 text-rose-500`.
* **Ô Nhập Liệu (Input / Textarea)**:
  - Input đơn: `rounded-xl px-3 py-2 text-xs`, nền `#110d24` (Dark), viền `border-white/10`, focus `border-[#6e56cf]`.

---

## 5. Quy Chuẩn Bố Cục & Độ Rộng (Layout & Container Rules)

* **Khung chứa thống nhất (Unified Page Container)**:
  - Mọi trang/view con đều phải nằm trọn vẹn trong container:
    `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
  - Thẻ gốc của các Component con (`FeedView`, `ClassroomView`, `ChallengesView`, `QAView`, `EventsView`, `ResourcesView`, `LeaderboardView`, `ProfileView`) luôn sử dụng `w-full` và `space-y-6`. Tuyệt đối không đặt `max-w-4xl` hay `max-w-5xl` làm thu hẹp kích thước so với tổng thể.

---

## 6. Hiển Thị Nội Dung & Markdown (Content Rendering)
* Tất cả nội dung văn bản dài do người dùng hoặc hệ thống tạo (Bài viết Feed, Lời giải Q&A, Mô tả Thử thách, Bài nộp Báo cáo, Bài giảng Khóa học) **bắt buộc phải được bọc trong component `<MarkdownRenderer content={...} />`**.

---

## 7. Quy Chuẩn Xem Chi Tiết Q&A (Q&A Modal View Standard)
* Thẻ Q&A trong danh sách giữ kích thước gọn gàng, trích dẫn ngắn (`line-clamp-2`). Bấm vào bất kỳ đâu trên thẻ sẽ mở **QADetailModal** (popup toàn màn hình với thanh cuộn độc lập và form nhập câu trả lời cố định ở đáy). Giữ nguyên vị trí cuộn của trang danh sách bên dưới khi đóng modal.

