import Mock from "mockjs";

// mock 数据模拟
Mock.mock("/api/allDiscount", {
    "dataSource|6": [
        {
            "key|+1": ["1", "2", "3", "4", "5", "6"],
            "imgPath|+1": [
                'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
                'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
                'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
                'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
                'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
            ],
            "name|+1": [
                ["11", "22", "33", "44", "55", "66"],
            ],
            "link|+1": [
                'https://1331.com',
                'https://1331.com',
                'https://1331.com',
                'https://1331.com',
                'https://1331.com',
                'https://1331.com',
            ],
        },
    ],
});
