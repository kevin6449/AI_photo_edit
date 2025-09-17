
import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/70 rounded-lg shadow-xl">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
            <p className="text-white text-lg font-semibold mt-4">正在生成您的圖片...</p>
            <p className="text-gray-400 text-sm mt-1">請稍候片刻，AI 正在為您創作。</p>
        </div>
    );
};
