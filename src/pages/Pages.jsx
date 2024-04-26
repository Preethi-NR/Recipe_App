// Pages.jsx
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './Home';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';

const Pages = () => {
    const location = useLocation();
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        setIsExiting(true);
        const timeout = setTimeout(() => setIsExiting(false), 500); // Adjust duration as needed
        return () => clearTimeout(timeout);
    }, [location.key]);

    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.key}>
                <Route path="/" element={<Home />} />
                <Route path="/cuisine/:type" element={<Cuisine />} />
                <Route path="/searched/:search" element={<Searched />} />
                <Route path="/recipe/:name" element={<Recipe />} />
      
            </Routes>
            {isExiting && (
                <motion.div
                    key="exit-animation"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }} // Adjust duration as needed
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'white' }}
                />
            )}
        </AnimatePresence>
    );
}

export default Pages;
