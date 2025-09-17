
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 shadow-lg p-4 flex justify-between items-center border-b-2 border-indigo-500">
            <div className="header-content">
                <h1 className="text-2xl font-bold text-white">AI 專業人像修圖</h1>
                <p className="text-sm text-gray-400">上傳照片，選擇風格與裁切比例，一鍵生成專業頭像。</p>
            </div>
            <div className="header-actions text-right">
                <button id="login-button" className="bg-gray-600 text-gray-300 font-bold py-2 px-4 rounded-lg cursor-not-allowed opacity-50" disabled>
                    使用 Google 帳號登入
                </button>
                <p className="text-xs text-gray-500 mt-1">注意：本應用程式使用預設 API 金鑰進行演示。</p>
            </div>
        </header>
    );
};
