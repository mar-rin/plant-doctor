import React, { useState, useRef, useEffect } from 'react';
import transparentLeaf from "../images/transparentLeaf.png"

function AccountDrawer() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerRef = useRef(null);

    const handleImageClick = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleClickOutside = (event) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target)) {
            setIsDrawerOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <img
                src={transparentLeaf}
                alt="Drawer toggle button"
                onClick={handleImageClick}
                style={{
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    width: '100px',
                    height: '100px',
                    cursor: 'pointer',
                }}
            />
            {isDrawerOpen && (
                <div
                    ref={drawerRef}
                    style={{
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        height: '100%',
                        width: '30%',
                        backgroundColor: 'white',
                        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                        padding: '20px',
                        boxSizing: 'border-box',
                    }}
                >
                    <p>This is the temporary drawer content.</p>
                </div>
            )}
        </div>
    );
}
export default AccountDrawer
