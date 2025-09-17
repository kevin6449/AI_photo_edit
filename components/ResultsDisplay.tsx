
import React from 'react';

interface ResultsDisplayProps {
    originalImage: string | null;
    generatedImages: string[];
}

const ImageCard: React.FC<{ src: string; alt: string; title: string; isOriginal?: boolean }> = ({ src, alt, title, isOriginal = false }) => (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <h2 className="text-lg font-semibold p-3 bg-gray-700 text-center text-indigo-300">{title}</h2>
        <div className="p-2">
            <img src={src} alt={alt} className="w-full h-auto object-contain rounded-md aspect-square"/>
        </div>
        {!isOriginal && (
            <div className="p-3 bg-gray-700/50">
                <a 
                    href={src} 
                    download={`ai-portrait-${Date.now()}.png`}
                    className="w-full text-center block bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                    下載圖片
                </a>
            </div>
        )}
    </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ originalImage, generatedImages }) => {
    const hasResults = generatedImages.length > 0;
    
    if (!originalImage) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-300">歡迎使用 AI 專業人像修圖</h2>
                <p className="text-gray-400 mt-2">請在左側面板上傳一張照片並選擇您的風格，然後點擊「生成圖片」開始創作。</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-4 overflow-y-auto">
            <div className={`grid gap-6 ${hasResults ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {originalImage && (
                    <ImageCard src={originalImage} alt="原始圖片" title="原始圖片" isOriginal />
                )}
                {generatedImages.map((image, index) => (
                    <ImageCard 
                        key={index} 
                        src={image} 
                        alt={`修圖後圖片 ${index + 1}`} 
                        title={`修圖後 #${index + 1}`} 
                    />
                ))}
            </div>
        </div>
    );
};
