// Mock order database
const orders = {
    "ORD12345": {
        "id": "ORD12345",
        "customer_id": "cust123",
        "date": "2023-05-15",
        "status": "delivered",
        "status_ar": "تم التسليم",
        "items": ["SKU001", "SKU003"],
        "total": 79.78,
        "currency": "SAR",
        "tracking_id": "TRK789456",
        "delivery_date": "2023-05-18",
        "payment_method": "mada",
        "payment_method_ar": "مدى"
    },
    "ORD67890": {
        "id": "ORD67890",
        "customer_id": "cust123",
        "date": "2023-06-02",
        "status": "processing",
        "status_ar": "قيد المعالجة",
        "items": ["SKU010", "SKU012"],
        "total": 314.98,
        "currency": "SAR",
        "tracking_id": "TRK654321",
        "estimated_delivery": "2023-06-07",
        "payment_method": "stcPay",
        "payment_method_ar": "إس تي سي باي"
    }
};

module.exports = orders;