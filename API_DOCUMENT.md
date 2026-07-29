# Pandora TravelNow — 后端 API 接口文档

> **Base URL**: `http://127.0.0.1:5000/api`  
> **通用响应格式**: 所有接口统一包裹在 `IResponse<T>` 中

---

## 通用类型

### 通用响应体 `IResponse<T>`

```json
{
  "success": true,
  "message": "操作成功",
  "data": {}
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| success | boolean | 请求是否成功 |
| message | string | 提示信息 |
| data | T | 业务数据（泛型） |

### 认证方式

登录成功后返回 `token` + `refresh_token`，前端存储在 localStorage 中。后续需鉴权的接口在请求头携带：

```
Authorization: Bearer <token>
```

---

## 一、用户模块 `/api`

### 1.1 用户注册

```
POST /api/sign
```

**请求体** `application/json`

```json
{
  "username": "string, 必填",
  "password": "string, 必填, 最少6位",
  "email":    "string, 必填, 邮箱格式",
  "phone":    "string, 必填, 11位中国手机号",
  "code":     "string, 必填, 6位短信验证码"
}
```

**TypeScript 类型**

```ts
interface ISignUp {
  username: string;
  password: string;
  email: string;
  phone: string;
  code: string;
}
```

**成功响应**

```json
{
  "success": true,
  "message": "注册成功",
  "data": {
    "userID": 1001
  }
}
```

**业务规则**

- 手机号 + 邮箱不可重复注册
- 验证码有效期 5 分钟，一个手机号每分钟限发 1 条
- 密码加密存储（bcrypt）
- 默认角色为 `user`

---

### 1.2 用户登录

```
POST /api/login
```

**请求体**

```json
{
  "phone":    "string, 必填, 11位手机号",
  "password": "string, 必填"
}
```

**TypeScript 类型**

```ts
interface ISignIn {
  phone: string;
  password: string;
}
```

**成功响应**

```json
{
  "success": true,
  "message": "登录成功",
  "data": {
    "username":      "旅行者_小明",
    "token":         "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "role":          "user",
    "phone":         "13800138000",
    "email":         "test@example.com"
  }
}
```

```ts
interface ISignInResponse {
  username: string | null;
  token: string | null;
  refresh_token: string | null;
  role?: "user" | "creator";
  phone?: string;
  email?: string;
}
```

**业务规则**

- JWT token 有效期 2 小时
- refresh_token 有效期 7 天
- 密码错误 5 次锁定账号 15 分钟

---

### 1.3 刷新 Token

```
POST /api/refresh
```

**请求体**

```json
{
  "refresh_token": "string"
}
```

**成功响应**

```json
{
  "success": true,
  "data": {
    "token":         "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

### 1.4 获取用户资料

```
GET /api/user/profile
```

**请求头**: `Authorization: Bearer <token>`

**成功响应**

```json
{
  "success": true,
  "data": {
    "id":             1001,
    "username":       "旅行者_小明",
    "avatar":         "https://api.dicebear.com/7.x/miniavs/svg?seed=xxx",
    "bio":            "这个人很懒...",
    "phone":          "13800138000",
    "email":          "test@example.com",
    "role":           "user",
    "articleCount":   5,
    "followerCount":  1280,
    "likeCount":      3560,
    "joinDate":       "2024-06-15"
  }
}
```

---

### 1.5 更新用户资料

```
PUT /api/user/profile
```

**请求头**: `Authorization: Bearer <token>`

```json
{
  "username": "string, 可选",
  "avatar":   "string, 可选",
  "bio":      "string, 可选",
  "phone":    "string, 可选",
  "email":    "string, 可选"
}
```

---

### 1.6 升级为创作者

```
POST /api/user/upgrade
```

**请求头**: `Authorization: Bearer <token>`

**成功响应**

```json
{
  "success": true,
  "message": "已升级为创作者",
  "data": { "role": "creator" }
}
```

---

### 1.7 发送短信验证码

```
POST /api/sms/send
```

```json
{
  "phone": "string",
  "scene": "register | login | reset"
}
```

**成功响应**

```json
{
  "success": true,
  "message": "验证码已发送"
}
```

---

## 二、目的地模块 `/api`

### 2.1 目的地列表

```
GET /api/destinations
```

**查询参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | int | 否 | 页码，默认 1 |
| size | int | 否 | 每页条数，默认 8 |
| region | string | 否 | 区域筛选: `china / asia / europe / americas / oceania / africa` |
| type | string | 否 | `domestic`(国内) / `abroad`(国外) |
| theme | string | 否 | 主题: `beach / city / nature / culture / food / adventure` |
| search | string | 否 | 关键词搜索（名称/国家/标签/描述） |
| sort | string | 否 | `rating`(评分) / `price-low` / `price-high` / `reviews` |

**成功响应**

```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "name": "东京",
        "country": "日本",
        "region": "asia",
        "domestic": false,
        "themes": ["city", "culture", "food"],
        "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
        "rating": 4.8,
        "price": "¥3,999起",
        "description": "传统与现代完美交融的都市...",
        "tags": ["热门", "购物", "美食"],
        "featured": true,
        "bestSeason": "春秋季（3-5月 / 9-11月）",
        "reviewCount": 12860,
        "lat": 35.6762,
        "lng": 139.6503
      }
    ],
    "total": 32,
    "page": 1,
    "size": 8
  }
}
```

**数据模型**

```ts
interface Destination {
  id: number;
  name: string;
  country: string;
  region: "asia" | "europe" | "americas" | "oceania" | "africa" | "china";
  domestic: boolean;
  themes: Array<"beach" | "city" | "nature" | "culture" | "food" | "adventure">;
  image: string;
  rating: number;
  price: string;
  description: string;
  tags: string[];
  featured: boolean;
  bestSeason: string;
  reviewCount: number;
  lat: number;
  lng: number;
}
```

---

### 2.2 目的地详情

```
GET /api/destinations/:id
```

**查询参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| include_extras | boolean | 否 | 是否返回扩展内容（景点/美食/交通/贴士），默认 true |

**成功响应**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "东京",
    "country": "日本",
    "region": "asia",
    "domestic": false,
    "themes": ["city", "culture", "food"],
    "image": "...",
    "rating": 4.8,
    "price": "¥3,999起",
    "description": "传统与现代完美交融的都市...",
    "tags": ["热门", "购物", "美食"],
    "featured": true,
    "bestSeason": "春秋季（3-5月 / 9-11月）",
    "reviewCount": 12860,
    "lat": 35.6762,
    "lng": 139.6503,
    "extras": {
      "attractions": [
        {
          "name": "浅草寺",
          "description": "东京最古老的寺庙...",
          "image": "https://images.unsplash.com/..."
        }
      ],
      "cuisine": [
        {
          "name": "寿司",
          "description": "数寄屋桥次郎 — 寿司之神的传奇",
          "image": "https://images.unsplash.com/..."
        }
      ],
      "transportation": "东京地铁系统极为发达...",
      "tips": ["大部分餐厅中午套餐比晚餐便宜40%-60%", "..."]
    },
    "gallery": [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      "..."
    ],
    "related": [
      { "id": 4, "name": "首尔", "country": "韩国", "image": "...", "rating": 4.6, "price": "¥2,499起" }
    ]
  }
}
```

**扩展内容类型**

```ts
interface DestinationExtras {
  attractions: Attraction[];
  cuisine: { name: string; description: string; image: string }[];
  transportation: string;
  tips: string[];
}

interface Attraction {
  name: string;
  description: string;
  image: string;
}
```

### 2.3 目的地图集

```
GET /api/destinations/:id/gallery
```

**成功响应**

```json
{
  "success": true,
  "data": {
    "images": [
      "https://images.unsplash.com/photo-xxx?w=800",
      "..."
    ]
  }
}
```

### 2.4 目的地评论

```
GET /api/destinations/:id/reviews
```

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | int | 否 | 默认 1 |
| size | int | 否 | 默认 10 |

---

## 三、酒店模块 `/api`

### 3.1 酒店列表

```
GET /api/hotels
```

**查询参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | int | 否 | 默认 1 |
| size | int | 否 | 默认 6 |
| city | string | 否 | 城市名 |
| search | string | 否 | 关键词搜索（名称/英文名/城市/标签/描述） |
| stars | string | 否 | 星级，逗号分隔 `3,4,5` |
| type | string | 否 | 类型，逗号分隔 `luxury,boutique,resort` |
| amenities | string | 否 | 设施，逗号分隔 `WiFi,泳池` |
| price_min | int | 否 | 最低价格 |
| price_max | int | 否 | 最高价格 |
| checkin | string | 否 | 入住日期 `YYYY-MM-DD` |
| checkout | string | 否 | 离店日期 `YYYY-MM-DD` |
| guests | int | 否 | 房客数 |
| sort | string | 否 | `recommended / price-low / price-high / rating / reviews` |

**成功响应**

```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "name": "东京京王广场大酒店",
        "nameEn": "Keio Plaza Hotel Tokyo",
        "city": "东京",
        "country": "日本",
        "image": "/hotel/xxx.jpg",
        "images": ["/hotel/xxx.jpg", "...", "..."],
        "rating": 4.8,
        "reviewCount": 3256,
        "price": 1680,
        "originalPrice": 2100,
        "stars": 5,
        "address": "2-2-1 Nishi-Shinjuku, Tokyo",
        "description": "位于新宿核心地段...",
        "amenities": ["免费WiFi", "游泳池", "健身房", "餐厅", "SPA"],
        "tags": ["商务", "观景", "新宿"],
        "type": "luxury",
        "distance": "距新宿站步行5分钟",
        "featured": true,
        "discount": 20
      }
    ],
    "total": 20,
    "page": 1,
    "size": 6
  }
}
```

**数据模型**

```ts
interface Hotel {
  id: number;
  name: string;
  nameEn: string;
  city: string;
  country: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  stars: number;
  address: string;
  description: string;
  amenities: string[];
  tags: string[];
  type: "luxury" | "boutique" | "resort" | "budget" | "business";
  distance: string;
  featured: boolean;
  discount?: number;
}
```

---

### 3.2 酒店详情

```
GET /api/hotels/:id
```

**成功响应**

```json
{
  "success": true,
  "data": {
    "...": "酒店完整信息（同上）",
    "rooms": [
      {
        "id": 1,
        "name": "标准大床房",
        "size": "28m²",
        "bed": "1张大床",
        "guests": 2,
        "price": 680,
        "originalPrice": 880,
        "breakfast": false,
        "cancel": "入住前24小时免费取消",
        "available": 5
      },
      {
        "id": 2,
        "name": "豪华双床房",
        "size": "35m²",
        "bed": "2张单人床",
        "guests": 2,
        "price": 880,
        "originalPrice": 1080,
        "breakfast": true,
        "cancel": "入住前24小时免费取消",
        "available": 3
      }
    ],
    "reviews": [
      {
        "id": 1,
        "author": { "name": "旅行达人小王", "avatar": "..." },
        "rating": 5,
        "date": "2025-12-15",
        "content": "位置太好了，出门就是地铁站...",
        "stay": "商务出行"
      }
    ]
  }
}
```

---

### 3.3 酒店预订

```
POST /api/hotels/:id/book
```

**请求头**: `Authorization: Bearer <token>`

```json
{
  "room_id":    1,
  "checkin":    "2025-03-15",
  "checkout":   "2025-03-16",
  "rooms":      1,
  "guests":     2,
  "guest_name": "张三",
  "guest_phone":"13800138000",
  "remark":     "string, 可选"
}
```

**成功响应**

```json
{
  "success": true,
  "message": "预订成功",
  "data": {
    "order_id": "ORD20250315001",
    "hotel_name": "东京京王广场大酒店",
    "room_name": "标准大床房",
    "checkin": "2025-03-15",
    "checkout": "2025-03-16",
    "total_price": 680,
    "status": "confirmed"
  }
}
```

---

## 四、攻略模块 `/api`

### 4.1 攻略列表

```
GET /api/articles
```

**查询参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | int | 否 | 默认 1 |
| size | int | 否 | 默认 6 |
| category | string | 否 | 分类: `自驾 / 美食 / 徒步 / 海岛 / 城市 / 摄影` |
| search | string | 否 | 关键词搜索（标题/摘要/标签/作者） |
| sort | string | 否 | `latest / popular / views` |
| author | string | 否 | 作者名筛选 |

**成功响应**

```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "title": "318川藏线自驾全攻略...",
        "slug": "sichuan-tibet-highway-self-drive",
        "author": {
          "name": "爱旅行的妖精",
          "avatar": "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
          "bio": "十年自驾老司机..."
        },
        "coverImage": "https://images.unsplash.com/...",
        "category": "自驾",
        "tags": ["川藏线", "自驾", "318国道"],
        "summary": "详细记录318川藏线的每一天...",
        "createdAt": "2025-11-15",
        "readTime": 12,
        "likes": 3241,
        "bookmarks": 1856,
        "views": 28650,
        "commentCount": 4,
        "featured": true
      }
    ],
    "total": 8,
    "page": 1,
    "size": 6
  }
}
```

**数据模型**

```ts
interface Article {
  id: number;
  title: string;
  slug: string;
  author: Author;
  coverImage: string;
  category: string;
  tags: string[];
  summary: string;
  content: ArticleSection[];
  createdAt: string;
  readTime: number;
  likes: number;
  bookmarks: number;
  views: number;
  commentCount: number;
  featured: boolean;
}

interface Author {
  name: string;
  avatar: string;
  bio: string;
}

interface ArticleSection {
  type: "paragraph" | "heading" | "image" | "tip" | "list";
  content?: string;
  src?: string;
  alt?: string;
  items?: string[];
}
```

---

### 4.2 攻略详情

```
GET /api/articles/:id
```

**成功响应**

```json
{
  "success": true,
  "data": {
    "...": "完整文章信息（同上）",
    "content": [
      { "type": "heading", "content": "前言：为什么是318？" },
      { "type": "paragraph", "content": "国道318线，东起上海..." },
      { "type": "image", "src": "https://images.unsplash.com/...", "alt": "318国道沿途风光" },
      { "type": "tip", "content": "⚠️ 高原贴士：初上高原..." },
      { "type": "list", "items": ["Day 1: ...", "Day 2: ..."] }
    ]
  }
}
```

---

### 4.3 创建攻略

```
POST /api/articles
```

**请求头**: `Authorization: Bearer <token>` (需 `creator` 角色)

```json
{
  "title":      "string, 必填",
  "category":   "string, 必填",
  "tags":       ["string"],
  "coverImage": "string",
  "summary":    "string, 必填",
  "content":    [
    { "type": "heading", "content": "..." },
    { "type": "paragraph", "content": "..." }
  ]
}
```

**成功响应**

```json
{
  "success": true,
  "message": "发布成功",
  "data": { "id": 51 }
}
```

---

### 4.4 攻略互动

```
POST /api/articles/:id/like      -- 点赞（toggle）
POST /api/articles/:id/bookmark  -- 收藏（toggle）
```

**请求头**: `Authorization: Bearer <token>`

**成功响应**

```json
{
  "success": true,
  "data": { "liked": true, "count": 3242 }
}
```

---

### 4.5 评论列表

```
GET /api/articles/:id/comments
```

**成功响应**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "articleId": 1,
      "author": {
        "name": "越野e族老李",
        "avatar": "https://api.dicebear.com/7.x/miniavs/svg?seed=10"
      },
      "content": "太详细的攻略了！收藏了...",
      "createdAt": "2025-11-16",
      "likes": 23,
      "replyTo": null,
      "replies": [
        {
          "id": 2,
          "author": { "name": "爱旅行的妖精", "avatar": "..." },
          "content": "大黄蜂是坦克300！",
          "createdAt": "2025-11-16",
          "likes": 15,
          "replyTo": "越野e族老李"
        }
      ]
    }
  ]
}
```

**数据模型**

```ts
interface Comment {
  id: number;
  articleId: number;
  author: Author;
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
  replyTo?: string;
}
```

---

### 4.6 发表评论

```
POST /api/articles/:id/comments
```

**请求头**: `Authorization: Bearer <token>`

```json
{
  "content": "string, 必填",
  "replyTo": "string, 可选, 被回复者用户名"
}
```

**成功响应**

```json
{
  "success": true,
  "data": {
    "id": 100,
    "content": "...",
    "createdAt": "2025-07-16"
  }
}
```

---

### 4.7 点赞评论

```
POST /api/comments/:id/like
```

**请求头**: `Authorization: Bearer <token>`

---

## 五、机票模块 `/api`

### 5.1 机票搜索

```
GET /api/flights
```

**查询参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| from | string | 是 | 出发城市 |
| to | string | 是 | 到达城市 |
| date | string | 否 | 出发日期 `YYYY-MM-DD` |
| return_date | string | 否 | 返程日期（往返时） |
| trip_type | string | 否 | `oneway / round / multi` |
| passengers | int | 否 | 乘客数，默认 1 |
| stops | string | 否 | `0`(直飞) / `1`(1停) |
| airline | string | 否 | 航司代码，逗号分隔 |
| price_min | int | 否 | 最低价格 |
| price_max | int | 否 | 最高价格 |
| departure_time | string | 否 | `morning / day / night` |
| sort | string | 否 | `recommended / price-low / price-high / duration / depart-early / depart-late` |

**成功响应**

```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "airline": "中国国航",
        "airlineCode": "CA",
        "flightNo": "CA925",
        "departCity": "北京",
        "departCode": "PKX",
        "arriveCity": "东京",
        "arriveCode": "NRT",
        "departTime": "07:30",
        "arriveTime": "11:40",
        "duration": "3h10m",
        "durationMin": 190,
        "stops": 0,
        "stopCity": null,
        "price": 1880,
        "originalPrice": 2400,
        "aircraft": "Boeing 787-9",
        "tags": ["直飞", "含餐"],
        "priceLevel": "deal"
      }
    ],
    "total": 15
  }
}
```

**数据模型**

```ts
interface Flight {
  id: number;
  airline: string;
  airlineCode: string;
  flightNo: string;
  departCity: string;
  departCode: string;
  arriveCity: string;
  arriveCode: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  durationMin: number;
  stops: number;
  stopCity?: string;
  price: number;
  originalPrice?: number;
  aircraft: string;
  tags: string[];
  priceLevel: "deal" | "normal" | "high";
}
```

---

### 5.2 机票预订

```
POST /api/flights/:id/book
```

**请求头**: `Authorization: Bearer <token>`

```json
{
  "passengers": [
    {
      "name": "张三",
      "idType": "身份证",
      "idNumber": "110101199001011234"
    }
  ],
  "contact_phone": "13800138000",
  "contact_email": "test@example.com"
}
```

**成功响应**

```json
{
  "success": true,
  "message": "预订成功",
  "data": {
    "order_id": "FLT20250315001",
    "flightNo": "CA925",
    "total_price": 1880,
    "status": "confirmed"
  }
}
```

---

### 5.3 城市机场查询

```
GET /api/flights/airports
```

**查询参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| search | string | 否 | 城市名搜索 |

**成功响应**

```json
{
  "success": true,
  "data": [
    { "city": "北京", "code": "PKX", "name": "北京大兴" },
    { "city": "东京", "code": "NRT", "name": "东京成田" }
  ]
}
```

---

## 六、轮播图 `/api`

### 6.1 获取轮播图

```
GET /api/swiper
```

**成功响应**

```json
{
  "success": true,
  "data": [
    {
      "title": "探索京都的千年古韵",
      "cover_img": "kyoto_temple"
    },
    {
      "title": "巴厘岛：天堂之岛",
      "cover_img": "bali_beach"
    }
  ]
}
```

```ts
interface ISwiper {
  title: string;
  cover_img: string; // 图片文件名（不含路径前缀）
}
```

> 前端拼装完整 URL：`https://tra-1374873320.cos.ap-nanjing.myqcloud.com/swiper/{cover_img}.jpg`

---

## 七、用户订单 `/api`

### 7.1 订单列表

```
GET /api/orders
```

**请求头**: `Authorization: Bearer <token>`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 否 | `hotel / flight / all` |
| status | string | 否 | `pending / confirmed / completed / cancelled` |

---

### 7.2 订单详情

```
GET /api/orders/:id
```

**请求头**: `Authorization: Bearer <token>`

---

## 附录

### A. HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 201 | 创建成功 |
| 400 | 参数校验失败 |
| 401 | 未登录 / token 过期 |
| 403 | 权限不足（如非创作者发布文章） |
| 404 | 资源不存在 |
| 409 | 冲突（如重复注册） |
| 429 | 请求过于频繁 |
| 500 | 服务器内部错误 |

### B. 错误响应格式

```json
{
  "success": false,
  "message": "手机号已注册",
  "data": null
}
```

### C. 数据库表建议

```
users              — 用户表
  id, username, password_hash, phone, email, avatar, bio, role, created_at

destinations       — 目的地表
  id, name, country, region, domestic, image, rating, price, description,
  tags(JSON), featured, best_season, review_count, lat, lng

destination_extras — 目的地扩展表
  id, destination_id, attractions(JSON), cuisine(JSON),
  transportation, tips(JSON)

hotels             — 酒店表
  id, name, name_en, city, country, image, images(JSON), rating,
  review_count, price, original_price, stars, address, description,
  amenities(JSON), tags(JSON), type, distance, featured, discount

hotel_rooms        — 房型表
  id, hotel_id, name, size, bed, guests, price, original_price,
  breakfast, cancel_policy, available_count

articles           — 攻略文章表
  id, title, slug, author_id, cover_image, category, tags(JSON),
  summary, content(JSON), read_time, likes, bookmarks, views,
  comment_count, featured, created_at

comments           — 评论表
  id, article_id, user_id, content, likes, reply_to, created_at

flights            — 航班表
  id, airline, airline_code, flight_no, depart_city, depart_code,
  arrive_city, arrive_code, depart_time, arrive_time, duration,
  duration_min, stops, stop_city, price, original_price,
  aircraft, tags(JSON), price_level

orders             — 订单表
  id, user_id, type(hotel/flight), item_id, status,
  total_price, created_at

swipers            — 轮播图表
  id, title, cover_img, sort_order, created_at
```

### D. 验证码/短信服务

建议接入阿里云短信或腾讯云短信，用于：
- 注册验证码 `POST /api/sms/send { phone, scene: "register" }`
- 登录验证码 `POST /api/sms/send { phone, scene: "login" }`

### E. 图片存储

建议使用腾讯云 COS 或阿里云 OSS。前端轮播图当前从 COS 读取：

```
https://tra-1374873320.cos.ap-nanjing.myqcloud.com/swiper/{cover_img}.jpg
```
