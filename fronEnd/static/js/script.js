// dropdown box
document.querySelector('.dropbtn').addEventListener('click', function () {
    const dropdown = document.querySelector('.dropdown-content');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});
document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");
    const dropbtn = document.querySelector(".dropbtn");

    dropbtn.addEventListener("click", function (e) {
        e.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
        dropdown.classList.toggle("show"); // Thêm/xóa lớp .show để hiển thị/ẩn dropdown
    });

    // Ẩn dropdown nếu click bên ngoài
    document.addEventListener("click", function () {
        dropdown.classList.remove("show");
    });
});
// của config///////////////////////////////
const filein = document.getElementById('file-input');
        const prevPageBtn = document.getElementById('prev-page');
        const nextPageBtn = document.getElementById('next-page');
        const pageInfo = document.getElementById('page-info');
        const canvasContainer = document.getElementById('canvas-container');

        let pdfDoc = null;
        let currentPage = 1;
        let totalPages = 0;

        // Lắng nghe sự kiện khi người dùng chọn file
        filein.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file && file.type === 'application/pdf') {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const typedarray = new Uint8Array(e.target.result);
                    pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
                        pdfDoc = pdf;
                        totalPages = pdf.numPages;
                        currentPage = 1;
                        showPage(currentPage);
                    }).catch(function(error) {
                        console.error('Lỗi khi tải PDF:', error);
                    });
                };
                reader.readAsArrayBuffer(file);
            } else {
                alert('Vui lòng chọn một file PDF.');
            }
        });

        // Hàm hiển thị một trang của PDF dưới dạng hình ảnh
        function showPage(pageNum) {
            pdfDoc.getPage(pageNum).then(function(page) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const scale = 1.5; // Tỉ lệ phóng đại để hiển thị rõ hơn
                const viewport = page.getViewport({ scale: scale });

                // Đặt kích thước canvas phù hợp với kích thước trang PDF
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                canvasContainer.innerHTML = ''; // Xóa các canvas cũ trước khi hiển thị trang mới
                canvasContainer.appendChild(canvas);

                // Vẽ trang PDF lên canvas
                page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function() {
                    // Cập nhật thông tin về trang
                    pageInfo.textContent = `Trang ${currentPage} / ${totalPages}`;
                });
            });
        }

        // Điều khiển chuyển trang
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });

        nextPageBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });


// của upload file//////////////////////////////
// Lấy các phần tử cần thiết
const fileInput = document.getElementById('fileInput');
const fileListContainer = document.getElementById('fileListContainer');
const fileNameText = document.getElementById('fileNameText');

// Để token trực tiếp trong mã (đảm bảo token hợp lệ)
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGYyMjgzNTdjMjdjMWVkZTliNDdiZSIsInVzZXJuYW1lIjoibmV3dXNlciIsImlhdCI6MTczMzQwMDkzOCwiZXhwIjoxNzMzNDg3MzM4fQ.FTFs3rPr7F0krqXkSDCc7KdbgkoTIiOZbT99JGhlZxc";

// Lấy danh sách các file đã tải lên
function fetchFileList() {
fetch('http://localhost:3000/file', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`, // Token trực tiếp trong mã
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error('Không thể kết nối đến server hoặc API trả về lỗi!');
    }
    return response.json();
})
.then(data => {
    console.log('Dữ liệu từ server:', data);
    if (Array.isArray(data)) {
        renderFileList(data); // Trường hợp server trả về mảng
    } else 
    // if (data.success) {
    //     renderFileList(data.files); // Trường hợp server trả về đối tượng
    // } 
    //else 
    {
        alert('Không thể lấy danh sách file! Lỗi từ API: ' + (data.message || 'Không rõ'));
    }
})
.catch(err => {
    console.error('Lỗi:', err);
    alert('Đã có lỗi xảy ra khi lấy danh sách file: ' + err.message);
});
}

function renderFileList(files) {
// fileListContainer.innerHTML = ''; // Xóa danh sách cũ

if (!files || files.length === 0) {
    fileListContainer.innerHTML = '<p>Chưa có file nào được tải lên.</p>';
    return;
}

files.forEach(file => {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
        <span>${file.filename} (${(file.size / 1024).toFixed(2)} KB)</span>
        <a href="../homePage/config.html">
            <button style="cursor: pointer;">🖨️</button>
        </a>
        <button onclick="deleteFile('${file._id}')">&#128465</button>
    `;
    fileListContainer.appendChild(fileItem);
});
}

function deleteFile(fileId) {
fetch(`http://localhost:3000/file/${fileId}`, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${token}`, // Token hợp lệ
    },
})
.then(response => {if (!response.ok) {
    throw new Error(`Lỗi khi xóa file: ${response.status}`);
}
return response.json();})
.then(data => {
    if (data.success) {
        alert('Không thể xóa file! Lỗi từ API: ' + data.message);
    } else {
        alert('Xóa file thành công!');
        fetchFileList(); // Cập nhật danh sách file
    }
})
.catch(err => {
    console.error('Lỗi:', err);
    alert('Đã có lỗi xảy ra khi xóa file: ' + err.message);
});
}

// Lắng nghe sự kiện khi người dùng chọn file
fileInput.addEventListener('change', function () {
const files = fileInput.files;

if (files.length === 0) {
    fileNameText.textContent = 'Không tệp nào được chọn';
    alert('Vui lòng chọn ít nhất một file!');
    return;
}

fileNameText.textContent = `${files.length} tệp đã chọn`;

Array.from(files).forEach(file => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);
    formData.append('size', file.size);
    formData.append('contentType', file.type);

    fetch('http://localhost:3000/file/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, // Dùng token trực tiếp trong mã
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Tải file "${file.name}" thành công!`);
            fetchFileList(); // Cập nhật danh sách file
        } else {
            alert(`Lỗi: ${data.message}`);
        }
    })
    .catch(err => console.error('Lỗi:', err));
});
});

// Tải file lên khi người dùng nhấn nút
document.getElementById('uploadButton').addEventListener('click', function () {
fileInput.click(); // Mở hộp thoại chọn file
});

// Gọi hàm để tải danh sách file ngay khi trang được tải
document.addEventListener('DOMContentLoaded', fetchFileList);