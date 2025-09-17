
import type { CropRatios } from './types';

export const HAIRSTYLE_OPTIONS = [
    '保持原樣', '短髮 (Short Hair)', '中長髮 (Medium Hair)', '長髮 (Long Hair)', 
    '鮑伯頭 (Bob Cut)', '油頭 (Slick Back)', '捲髮 (Curly Hair)', '馬尾 (Ponytail)'
];

export const HAIR_COLOR_OPTIONS = [
    '保持原樣', '黑色 (Black)', '深棕色 (Dark Brown)', '淺棕色 (Light Brown)', 
    '金色 (Blonde)', '紅色 (Red)', '灰色 (Gray/Silver)'
];

export const BACKGROUND_STYLE_OPTIONS = [
    '白底證件（標準純白，適合正式用途）',
    '商務灰（淺灰中性，柔光專業）',
    '科技藍漸層（深→淺藍，科技光暈）',
    '品牌色（單色乾淨牆，強調識別）'
];

export const LIGHTING_STYLE_OPTIONS = [
    '專業攝影棚光線 (預設)', '林布蘭光 (Rembrandt Lighting)', '蝴蝶光 (Butterfly Lighting)',
    '側光 (Split Lighting)', '環形光 (Loop Lighting)', '柔光箱效果 (Softbox Effect)',
    '戲劇性強光 (Dramatic High-Contrast)', '自然窗光 (Natural Window Light)'
];

export const OUTFIT_OPTIONS = {
    '': '保留原圖服裝',
    '商務正裝 (Business Formal)': [
        '深色西裝外套＋白襯衫與領帶', '深色西裝外套＋淺藍襯衫（無領帶）',
        '女士專業套裝(裙裝或褲裝)', '絲質襯衫／雪紡上衣'
    ],
    '商務休閒 (Business Casual)': [
        '灰色休閒西裝外套＋素色T恤', '黑色高領毛衣（賈伯斯風格）',
        '開襟羊毛衫＋襯衫', '牛津布扣領襯衫（常春藤風格）', '深色 Polo 衫'
    ],
    '創意與科技 (Creative & Tech)': [
        '立領襯衫（現代簡潔）', '牛仔襯衫（率性個人）',
        '高品質素色連帽衫（科技新創）', '亨利領長袖衫'
    ],
    '專業制服 (Professional Uniform)': [
        '醫師袍／實驗袍'
    ]
};

export const ACCESSORY_OPTIONS = ['耳環', '項鍊', '手錶'];

export const EFFECT_OPTIONS = ['無效果', '復古風格 (Vintage)', '黑白 (Black and White)', '深褐色 (Sepia)'];

export const POSE_OPTIONS = [
    '正面視角（胸上半身）', '左側 45° 半側臉', '右側 45° 半側臉', '側面（90°）',
    '高角度俯拍（胸上半身）', '坐姿側拍（椅子）', '辦公情境半身'
];

export const CROP_RATIOS: CropRatios = {
    passport: { ratio: 35 / 45, details: '護照照 (35mm x 45mm)' },
    taiwan_id: { ratio: 1, details: '台灣身分證／健保卡 (1:1)' },
    us_visa: { ratio: 1, details: '美國簽證／USCIS (2x2 inch)' },
    resume: { ratio: 4 / 5, details: '商務履歷照 (4:5)' },
    avatar: { ratio: 1, details: '社群頭像 (1:1)' },
    cover: { ratio: 16 / 9, details: '封面照 (16:9)' },
};
