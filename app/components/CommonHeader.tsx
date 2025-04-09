import React from 'react';
import { TextGenerateEffect } from './ui/TextGenerateEffect';

interface CommonHeaderProps {
    title: string;
    imgsrc: string;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({ title, imgsrc }) => {
    return (
        <header
            className="relative w-full h-fit bg-slate-900 bg-cover bg-center"
            style={{ backgroundImage: `url(/${imgsrc})` }}
        >
            <div className="bg-black bg-opacity-50 py-28">
                <TextGenerateEffect
                    words={title}
                    className="text-center text-white text-[40px] md:text-5xl lg:text-6xl"
                />
            </div>
        </header>
    );
};

export default CommonHeader;