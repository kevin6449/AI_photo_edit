
import React from 'react';
import type { EditOptions, AssetItem, AssetImages } from '../types';
import { CROP_RATIOS, HAIRSTYLE_OPTIONS, HAIR_COLOR_OPTIONS, BACKGROUND_STYLE_OPTIONS, LIGHTING_STYLE_OPTIONS, OUTFIT_OPTIONS, ACCESSORY_OPTIONS, EFFECT_OPTIONS, POSE_OPTIONS } from '../constants';
import { Tooltip } from './Tooltip';
import { FileInput } from './FileInput';

interface ControlsPanelProps {
    mainImage: File | null;
    assetImages: AssetImages;
    editOptions: EditOptions;
    onMainImageChange: (file: File | null) => void;
    onAssetChange: (asset: AssetItem, file: File | null) => void;
    onOptionChange: <K extends keyof EditOptions>(key: K, value: EditOptions[K]) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const ControlWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`mb-4 bg-gray-800/50 p-3 rounded-lg border border-gray-700 ${className}`}>
        {children}
    </div>
);

const LabelWithTooltip: React.FC<{ htmlFor: string; label: string; tooltipText: string; }> = ({ htmlFor, label, tooltipText }) => (
    <div className="flex items-center mb-1">
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-300 mr-2">{label}</label>
        <Tooltip text={tooltipText} />
    </div>
);

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
    mainImage, assetImages, editOptions, onMainImageChange, onAssetChange, onOptionChange, onGenerate, isLoading
}) => {
    
    const handleAccessoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const currentAccessories = editOptions.accessories;
        if (checked) {
            onOptionChange('accessories', [...currentAccessories, value]);
        } else {
            onOptionChange('accessories', currentAccessories.filter(acc => acc !== value));
        }
    };
    
    return (
        <aside className="w-full md:w-1/3 lg:w-1/4 bg-gray-800 p-4 rounded-lg shadow-2xl overflow-y-auto max-h-[calc(100vh-100px)]">
            <div className="mb-6">
                <label htmlFor="image-upload" className="w-full text-center inline-block bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors duration-200">
                    上傳主要人像照片
                </label>
                <input type="file" id="image-upload" accept="image/*" className="hidden" onChange={(e) => onMainImageChange(e.target.files ? e.target.files[0] : null)} />
                <span className="text-gray-400 text-xs mt-2 block text-center truncate">{mainImage?.name || '尚未選擇檔案'}</span>
            </div>

            {/* Custom Assets Section */}
            <div className="mb-4 p-3 rounded-lg border border-gray-700 bg-gray-900/40">
                <h3 className="text-lg font-semibold mb-2 text-indigo-400">自訂素材 (選填)</h3>
                <p className="text-xs text-gray-400 mb-4">透過文字選單或上傳參考圖片來替換髮型、服裝或配件。</p>
                <FileInput label="上衣參考" assetKey="top" onAssetChange={onAssetChange} tooltipText="上傳上衣圖片，AI 會為您的人像穿上它。" />
                <FileInput label="下身參考" assetKey="bottom" onAssetChange={onAssetChange} tooltipText="上傳褲子或裙子圖片，AI 會為您的人像穿上它。" />
                <FileInput label="手錶參考" assetKey="watch" onAssetChange={onAssetChange} tooltipText="上傳手錶的圖片，AI 會將其合成到人像上。" />
                <FileInput label="項鍊參考" assetKey="necklace" onAssetChange={onAssetChange} tooltipText="上傳項鍊的圖片，AI 會將其合成到人像上。" />
                <FileInput label="耳環參考" assetKey="earrings" onAssetChange={onAssetChange} tooltipText="上傳耳環的圖片，AI 會將其合成到人像上。" />
                <FileInput label="眼鏡參考" assetKey="glasses" onAssetChange={onAssetChange} tooltipText="上傳眼鏡的圖片，AI 會將其合成到人像上。" />
            </div>

            <ControlWrapper>
                <LabelWithTooltip htmlFor="hairstyle-select" label="髮型風格" tooltipText="選擇一個髮型，AI會為您的人像替換。" />
                <select id="hairstyle-select" value={editOptions.hairstyle} onChange={(e) => onOptionChange('hairstyle', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500">
                    {HAIRSTYLE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </ControlWrapper>
            
            <ControlWrapper>
                 <LabelWithTooltip htmlFor="hair-color-select" label="髮色" tooltipText="選擇髮色。" />
                <select id="hair-color-select" value={editOptions.hairColor} onChange={(e) => onOptionChange('hairColor', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500">
                    {HAIR_COLOR_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </ControlWrapper>
            
             <ControlWrapper>
                <LabelWithTooltip htmlFor="background-style-select" label="背景風格" tooltipText="'商務灰' 適合專業履歷，'科技藍' 適合新創風格，'白底' 則適用於正式證件。" />
                <select id="background-style-select" value={editOptions.backgroundStyle} onChange={(e) => onOptionChange('backgroundStyle', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500">
                    {BACKGROUND_STYLE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </ControlWrapper>

            <ControlWrapper>
                <LabelWithTooltip htmlFor="lighting-select" label="光影風格" tooltipText="選擇人像的專業打光效果。不同的光影會營造出不同的氛圍與立體感。" />
                <select id="lighting-select" value={editOptions.lightingStyle} onChange={(e) => onOptionChange('lightingStyle', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500">
                    {LIGHTING_STYLE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </ControlWrapper>

            <ControlWrapper>
                <LabelWithTooltip htmlFor="outfit-select" label="服裝風格 (若未上傳圖片)" tooltipText="若您未上傳服裝圖片，可在此選擇風格。AI 會為您更換指定的服裝。" />
                <select id="outfit-select" value={editOptions.outfitStyle} onChange={(e) => onOptionChange('outfitStyle', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500">
                    {/* FIX: Use Array.isArray as a type guard to handle string and string[] types for options, and fix bug showing only first character. */}
                    {Object.entries(OUTFIT_OPTIONS).map(([group, options]) => 
                        Array.isArray(options) ? (
                            <optgroup key={group} label={group}>
                                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </optgroup>
                        ) : (
                             <option key={options} value="">{options}</option>
                        )
                    )}
                </select>
            </ControlWrapper>
            
            <ControlWrapper>
                 <LabelWithTooltip htmlFor="accessories" label="配件 (若未上傳圖片)" tooltipText="若您未上傳配件圖片，可在此勾選。AI 會搭配適合的配件。" />
                <div className="flex space-x-4">
                    {ACCESSORY_OPTIONS.map(acc => (
                        <div key={acc} className="flex items-center">
                            <input type="checkbox" id={`accessory-${acc}`} value={acc} checked={editOptions.accessories.includes(acc)} onChange={handleAccessoryChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor={`accessory-${acc}`} className="ml-2 text-sm text-gray-300">{acc}</label>
                        </div>
                    ))}
                </div>
            </ControlWrapper>

            <ControlWrapper>
                <LabelWithTooltip htmlFor="age-slider" label={`人物年齡: ${editOptions.age} 歲`} tooltipText="設定人物的大致年齡，以生成更自然的皮膚細節。" />
                <input type="range" id="age-slider" min="18" max="80" step="1" value={editOptions.age} onChange={e => onOptionChange('age', parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"/>
            </ControlWrapper>
            
            <ControlWrapper>
                <LabelWithTooltip htmlFor="effect-select" label="視覺效果" tooltipText="為您的照片套用不同的濾鏡風格。'無效果' 會保留最真實的色彩。" />
                <select id="effect-select" value={editOptions.effect} onChange={(e) => onOptionChange('effect', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500">
                    {EFFECT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </ControlWrapper>

            <ControlWrapper>
                <LabelWithTooltip htmlFor="pose-select" label="角度/構圖" tooltipText="決定您在照片中的姿勢與視角。AI會調整身體姿態與拍攝角度。" />
                <select id="pose-select" value={editOptions.pose} onChange={(e) => onOptionChange('pose', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500">
                    {POSE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </ControlWrapper>

            <ControlWrapper>
                <LabelWithTooltip htmlFor="variations-input" label="變化張數 (1-5)" tooltipText="決定要生成幾張稍微不同的版本，讓您有更多選擇。" />
                <input type="number" id="variations-input" min="1" max="5" value={editOptions.variations} onChange={e => onOptionChange('variations', parseInt(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white"/>
            </ControlWrapper>
            
            <ControlWrapper>
                 <LabelWithTooltip htmlFor="quality-slider" label={`圖片品質 (最短邊): ${editOptions.quality}px`} tooltipText="設定生成圖片的解析度。較高的像素值代表更高品質。" />
                <input type="range" id="quality-slider" min="1600" max="4000" step="100" value={editOptions.quality} onChange={e => onOptionChange('quality', parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"/>
            </ControlWrapper>
            
             <ControlWrapper>
                <LabelWithTooltip htmlFor="crop-select" label="精準比例" tooltipText="選擇最終輸出的裁切比例，例如正方形的社群頭像或長方形的護照照片。" />
                <select id="crop-select" value={editOptions.crop} onChange={(e) => onOptionChange('crop', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500">
                    {Object.entries(CROP_RATIOS).map(([key, value]) => (
                        <option key={key} value={key}>{value.details}</option>
                    ))}
                </select>
            </ControlWrapper>
            
            <button
                onClick={onGenerate}
                disabled={!mainImage || isLoading}
                className="w-full mt-6 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        生成中...
                    </>
                ) : '生成圖片'}
            </button>
        </aside>
    );
};
