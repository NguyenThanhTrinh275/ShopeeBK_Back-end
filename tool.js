const fetch = require("node-fetch"); // Nếu Node.js <18, cài: npm install node-fetch

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Q2YTc3MjAzYTk4ODFmNGE3ZTUyN2MiLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDIxMjgwMzMsImV4cCI6MTc0MjEzMTYzM30.DzCQP8vfpnanOaD5Kkf2EZ6Y9Lkb1uX_Qwfljlomw9U'
async function fetchProductsAndSave() {
    try {
        // 1️⃣ Fetch dữ liệu từ API bên ngoài
        const response = await fetch("https://fakestoreapi.com/products");
        let data = await response.json();

        // 2️⃣ Thêm thuộc tính mới vào từng phần tử trong data
        data = data.map(item => ({
            ...item,
            price : item.price * 1000,
        }));
        console.log(JSON.stringify(data));
        
        // 3️⃣ Gửi dữ liệu đã chỉnh sửa đến API của bạn để lưu vào DB
        const saveResponse = await fetch("http://localhost:3000/api/product/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" , 
                "Authorization": `Bearer ${accessToken}`
             },
            body: JSON.stringify(data),
        });

        // const result = await saveResponse.json();
        // console.log("✅ Dữ liệu đã lưu:", result);
    } catch (error) {
        console.error("❌ Lỗi:", error);
    }
}

// Gọi function
fetchProductsAndSave();