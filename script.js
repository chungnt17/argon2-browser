document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Ngăn chặn gửi form mặc định

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Đợi thư viện argon2 tải xong
    if (!argon2) {
        console.error("Thư viện Argon2 chưa được tải!");
        return;
    }

    let options = {
        pass: password,        // Mật khẩu nhập vào
        salt: 'random_salt',   // Salt (nên lấy từ backend trong thực tế)
        time: 2,               // Số vòng lặp
        mem: 1024,             // Dung lượng bộ nhớ (KB)
        parallelism: 1,        // Luồng xử lý song song
        type: argon2.Argon2id  // Sử dụng Argon2id
    };

    try {
        let hash = await argon2.hash(options);
        console.log("Băm thành công:", hash.encoded);

        // Hiển thị kết quả (chỉ để kiểm tra, không lưu trữ)
        document.getElementById('hashed-password').innerText = "Mật khẩu đã băm: " + hash.encoded;

    } catch (err) {
        console.error("Lỗi băm mật khẩu:", err);
    }
});
