document.addEventListener('DOMContentLoaded', () => {
    // 1. ระบบ Smooth Scroll สำหรับเมนูด้านบน
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. สร้าง Modal สำหรับคลิกดูรูปภาพ Portfolio ขนาดใหญ่
    // สร้างโครงสร้าง HTML ของ Modal แทรกเข้าไปใน body อัตโนมัติ
    const modalHTML = `
        <div id="imageModal" class="portfolio-modal">
            <span class="modal-close">&times;</span>
            <img class="modal-content" id="modalImage">
            <div id="modalCaption"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    const closeBtn = document.getElementsByClassName('modal-close')[0];

    // เลือกรูปภาพทั้งหมดในส่วน Gallery
    const galleryImages = document.querySelectorAll('.gallery-card img');

    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            // ดึงข้อความจากป้ายกำกับใต้รูปมาแสดง
            const caption = this.closest('.gallery-card').querySelector('.gallery-caption');
            captionText.innerHTML = caption ? caption.innerHTML : '';
        });
    });

    // ปุ่มปิด Modal (กากบาท)
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // คลิกพื้นที่ว่างรอบรูปเพื่อปิด Modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // กดปุ่ม ESC บนคีย์บอร์ดเพื่อปิด Modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
});
